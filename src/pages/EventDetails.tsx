import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Edit, Link, Trash2, Check, X, ChevronDown, ChevronUp, Download, MessageSquare, UserPlus, Mail, AlertTriangle, Laptop, FileText, MoreHorizontal, Plus, ExternalLink } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

// Event interface for Google Sheets data (from Events page)
interface GSheetEvent {
  Timestamp: number;
  eventName: string;                // "Event Name"
  title: string;                    // "Title of the Event"
  description: string;              // "Description of the Event"
  date: string;                     // "Date of the event" (formatted)
  startTime: string;                // "Starting Time of the Event" (formatted)
  endTime: string;                  // "Ending Time of the Event" (formatted)
  organizer: string;                // "Organizer of the Event"
  location: string;                 // "Location of the Event"
  flyer: string;                    // link or filename
  id: string;                       // Generated ID
  type: string;                     // Derived from eventName
  capacity: number;                 // Default capacity
  registrations: number;            // Will be calculated from attendees
}

// Attendee interface for Google Sheets data
interface AttendeeEntry {
  Timestamp: string;
  'Full Name': string;
  'Email ID': string;
  'Mobile Number': string;
  Designation: string;
  'College Name ( if startup or other enter nil )': string;
  'Department & Year ( if startup or other enter nil )': string;
  'Roll Number / Register Number ( if startup or other enter nil )': string;
  'Startup / Company Name ( if student enter nil )': string;
  'Your Role in the Startup ( if student enter nil )': string;
  'Brief Description of Your Startup ( if student enter nil )': string;
  'Do you have DPIIT Registration?': string;
  'Which events would you like to participate in? (max 3 event)': string;
  'Why do you want to attend this event?': string;
  'I hereby confirm that the above information is true, and I am willing to participate in the workshop conducted by KSRCE NEO.': string;
}
const initialEventData = {
  id: '1',
  title: 'AI Workshop',
  date: '2023-07-11',
  time: '10:00 AM - 12:00 PM',
  startTime: '10:00 AM',
  endTime: '12:00 PM',
  location: 'Tech Lab 101',
  capacity: 30,
  registrations: 24,
  description: 'Introduction to machine learning and AI concepts for beginners. This workshop will cover the fundamentals of AI, including supervised and unsupervised learning, neural networks, and practical applications. Participants will get hands-on experience with simple ML models.',
  organizer: 'Dr. James Wilson',
  type: 'Workshop',
  eventName: 'Workshop',
  flyer: '',
  attendees: [{
    id: '1',
    name: 'Sarah Chen',
    email: 'schen@university.edu',
    status: 'confirmed',
    project: 'AI for Sustainable Agriculture'
  }, {
    id: '2',
    name: 'Alex Kumar',
    email: 'akumar@university.edu',
    status: 'confirmed',
    project: 'Smart City Solutions'
  }, {
    id: '3',
    name: 'Lisa Wong',
    email: 'lwong@university.edu',
    status: 'confirmed',
    project: 'Smart City Solutions'
  }, {
    id: '4',
    name: 'Mike Johnson',
    email: 'mjohnson@university.edu',
    status: 'pending',
    project: 'AI for Sustainable Agriculture'
  }, {
    id: '5',
    name: 'David Park',
    email: 'dpark@university.edu',
    status: 'confirmed',
    project: 'Quantum Computing Applications'
  }],
  resources: [{
    id: '1',
    name: 'Tech Lab 101',
    type: 'Room',
    status: 'confirmed'
  }, {
    id: '2',
    name: 'Projector',
    type: 'Equipment',
    status: 'confirmed'
  }, {
    id: '3',
    name: 'Laptops',
    type: 'Equipment',
    status: 'confirmed',
    quantity: 10
  }],
  materials: [{
    id: '1',
    name: 'Workshop Slides.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadDate: '2023-07-05'
  }, {
    id: '2',
    name: 'AI Exercises.zip',
    type: 'ZIP',
    size: '5.8 MB',
    uploadDate: '2023-07-05'
  }],
  agenda: [{
    time: '10:00 AM',
    title: 'Introduction to AI Concepts',
    duration: '30 mins'
  }, {
    time: '10:30 AM',
    title: 'Neural Networks Overview',
    duration: '30 mins'
  }, {
    time: '11:00 AM',
    title: 'Hands-on Exercise',
    duration: '45 mins'
  }, {
    time: '11:45 AM',
    title: 'Q&A and Wrap-up',
    duration: '15 mins'
  }]
};
const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'Workshop':
      return 'bg-blue-100 text-blue-800';
    case 'Presentation':
      return 'bg-green-100 text-green-800';
    case 'Seminar':
      return 'bg-purple-100 text-purple-800';
    case 'Hackathon':
      return 'bg-red-100 text-red-800';
    case 'Networking':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
const EventDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const eventTimestamp = searchParams.get('timestamp');

  useEffect(() => {
    if (eventTimestamp) {
      console.log("id:",id);
      console.log('Received event timestamp:', eventTimestamp);
    }
  }, [eventTimestamp]);

  const [activeTab, setActiveTab] = useState('details');
  const [showAttendees, setShowAttendees] = useState(true);
  const [showResources, setShowResources] = useState(true);
  const [showAgenda, setShowAgenda] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [eventData, setEventData] = useState(initialEventData);
  const [eventLoading, setEventLoading] = useState(true);
  const [attendeesData, setAttendeesData] = useState<AttendeeEntry[]>([]);
  const [attendeesLoading, setAttendeesLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch event data from Google Sheets
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setEventLoading(true);
        const EVENTS_URL = 'https://docs.google.com/spreadsheets/d/1Ou7LQrelAKw2qZ8xyNrLUOApEeYSd2mKPrR5Fl1smD4/export?format=xlsx';

        const response = await fetch(EVENTS_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch events data');
        }

        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData = XLSX.utils.sheet_to_json(worksheet, { defval: null }) as any[];

        // Parse the events data (similar to Events.tsx)
        const events: GSheetEvent[] = rawData.map((row, index) => {
          const excelSerialToDate = (serial: number): Date => {
            const utcDays = Math.floor(serial) - 25569;
            const utcValue = utcDays * 86400;
            const dateInfo = new Date(utcValue * 1000);
            const fractional = serial - Math.floor(serial);
            const totalSeconds = Math.round(fractional * 86400);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            dateInfo.setHours(hours, minutes, seconds);
            return dateInfo;
          };

          const dateObj = excelSerialToDate(Number(row['Date of the event']));
          console.log("event date",dateObj);
          const startObj = excelSerialToDate(Number(row['Starting Time of the Event']));
          const endObj = excelSerialToDate(Number(row['Ending Time of the Event']));

          return {
            Timestamp: row.Timestamp || Date.now(),
            eventName: row['Event Name'] || '',
            title: row['Title of the Event'] || '',
            description: row['Description of the Event'] || '',
            date: dateObj.toISOString().split('T')[0],
            startTime: startObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
            endTime: endObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
            organizer: row['Organizer of the Event'] || '',
            location: row['Location of the Event'] || '',
            flyer: row['Flyer'] || '',
            id: (index + 1).toString(),
            type: row['Event Name'] || 'Workshop',
            capacity: 50, // Default capacity
            registrations: 0 // Will be updated from attendees
          };
        });

        // Find the specific event by ID
        const currentEvent = events.find(event => event.id === id);
        if (currentEvent) {
          // Update eventData with the fetched event
          setEventData(prev => ({
            ...prev,
            title: currentEvent.title,
            description: currentEvent.description,
            date: currentEvent.date,
            time: `${currentEvent.startTime} - ${currentEvent.endTime}`,
            startTime: currentEvent.startTime,
            endTime: currentEvent.endTime,
            location: currentEvent.location,
            organizer: currentEvent.organizer,
            type: currentEvent.type || currentEvent.eventName,
            eventName: currentEvent.eventName,
            capacity: currentEvent.capacity || 50,
            registrations: currentEvent.registrations || 0,
            flyer: currentEvent.flyer
          }));
        }
      } catch (error) {
        console.error('❌ Error fetching event data:', error);
      } finally {
        setEventLoading(false);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);

  // Fetch attendees data from Google Sheets
  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        setAttendeesLoading(true);
        const ATTENDEES_URL = 'https://docs.google.com/spreadsheets/d/1r4VWHwg-YoHXiVd8vc2Dy3E3NuuFhSOvMO-GZ7-GbGk/export?format=xlsx';

        const response = await fetch(ATTENDEES_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch attendees data');
        }

        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet, { defval: null }) as AttendeeEntry[];

        setAttendeesData(data);
      } catch (error) {
        console.error('❌ Error fetching attendees:', error);
      } finally {
        setAttendeesLoading(false);
      }
    };

    fetchAttendees();
  }, []);

  // Update event registrations count when attendees data changes
  useEffect(() => {
    if (!attendeesLoading && attendeesData.length > 0) {
      const eventSpecificCount = attendeesData.filter(isAttendeeRegisteredForThisEvent).length;
      setEventData(prev => ({
        ...prev,
        registrations: eventSpecificCount
      }));
    }
  }, [attendeesData, attendeesLoading]);

  // Helper functions for attendee data
  const getAttendeeAffiliation = (attendee: AttendeeEntry): string => {
    if (attendee.Designation.toLowerCase() === 'student') {
      return attendee['College Name ( if startup or other enter nil )'] || 'Unknown College';
    } else {
      return attendee['Startup / Company Name ( if student enter nil )'] || 'Unknown Company';
    }
  };

  const getAttendeeInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Create normalizedEvent first (moved up before its usage)
  const normalizedEvent = React.useMemo(() => {
    const raw = eventData;
    let e: any = {};

    if (Array.isArray(raw)) {
      e = raw.length ? raw[0] : {};
    } else if (raw && typeof raw === 'object') {
      e = raw;
    }

    // If date is missing but Timestamp exists and looks like an Excel serial
    if (!e.date && e.Timestamp != null) {
      const days = Number(e.Timestamp);
      if (!Number.isNaN(days)) {
        const excelEpoch = new Date(Date.UTC(1899, 11, 30));
        const millis = Math.round(days * 24 * 60 * 60 * 1000);
        const d = new Date(excelEpoch.getTime() + millis);
        e.date = d.toISOString().slice(0, 10);
      }
    }

    const result = {
      eventName: e.eventName || e.type || 'Workshop',
      title: e.title || 'Event Title',
      date: e.date || null,
      startTime: e.startTime || null,
      endTime: e.endTime || null,
      time: e.time || null,
      location: e.location || null,
      organizer: e.organizer || 'KSRCE NEO',
      capacity: e.capacity || null,
      description: typeof e.description === 'string' ? e.description : '',
      flyer: e.flyer || '',
      id: e.id || null
    };
    return result;
  }, [eventData]);

  // Filter attendees who selected this specific event
  const isAttendeeRegisteredForThisEvent = (attendee: AttendeeEntry): boolean => {
    const selectedEvents = attendee['Which events would you like to participate in? (max 3 event)'] || '';
    const selectedEventsLower = selectedEvents.toLowerCase();

    // Get the current event type from eventData (this comes from Google Sheets)
    const currentEventType = normalizedEvent.eventName.toLowerCase(); // e.g., "workshop", "seminar", "hackathon"
    const currentEventTitle = normalizedEvent.title.toLowerCase();

    // console.log('Filtering for event type:', currentEventType);
    // console.log('Event title:', currentEventTitle);
    // console.log('Sample attendee selection:', selectedEvents);

    // Primary matching: Check if the event type is mentioned in their selections
    // This handles cases like "Workshop, Seminar" where they list event types
    if (selectedEventsLower.includes(currentEventType)) {
      return true;
    }

    // Secondary matching: Check event title keywords
    const titleKeywords = currentEventTitle.split(' ').filter((word: string) => word.length > 2);
    for (const keyword of titleKeywords) {
      if (selectedEventsLower.includes(keyword)) {
        return true;
      }
    }

    // Tertiary matching: Check for related keywords based on event type
    const eventTypeKeywords: { [key: string]: string[] } = {
      'workshop': ['workshop', 'hands-on', 'training', 'practical'],
      'seminar': ['seminar', 'talk', 'presentation', 'lecture'],
      'hackathon': ['hackathon', 'hack', 'coding', 'competition'],
      'networking': ['networking', 'meetup', 'social', 'connect'],
      'presentation': ['presentation', 'pitch', 'demo', 'showcase']
    };

    const relatedKeywords = eventTypeKeywords[currentEventType] || [];
    for (const keyword of relatedKeywords) {
      if (selectedEventsLower.includes(keyword)) {
        return true;
      }
    }

    // Fallback: If no specific matching, check for general tech/innovation keywords
    const generalKeywords = ['ai', 'artificial intelligence', 'machine learning', 'ml', 'tech', 'technology', 'innovation'];
    if (currentEventTitle.includes('ai') || currentEventTitle.includes('tech') || currentEventTitle.includes('innovation')) {
      for (const keyword of generalKeywords) {
        if (selectedEventsLower.includes(keyword)) {
          return true;
        }
      }
    }

    return false;
  };

  // Filter attendees for this specific event
  const eventSpecificAttendees = attendeesData.filter(isAttendeeRegisteredForThisEvent);

  // Filter attendees based on search term (from event-specific attendees)
  const filteredAttendees = eventSpecificAttendees.filter(attendee =>
    attendee['Full Name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee['Email ID'].toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.Designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getAttendeeAffiliation(attendee).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Edit form state - will be initialized after normalizedEvent is defined
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: 50,
    organizer: 'KSRCE NEO',
    type: 'Workshop',
    agenda: [...eventData.agenda],
    resources: [...eventData.resources]
  });

  // Helper functions for edit form
  const addAgendaItem = () => {
    setEditForm(prev => ({
      ...prev,
      agenda: [...prev.agenda, { time: '', title: '', duration: '' }]
    }));
  };

  const removeAgendaItem = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      agenda: prev.agenda.filter((_, i) => i !== index)
    }));
  };

  const updateAgendaItem = (index: number, field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      agenda: prev.agenda.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addResource = () => {
    setEditForm(prev => ({
      ...prev,
      resources: [...prev.resources, {
        id: Date.now().toString(),
        name: '',
        type: 'Equipment',
        status: 'pending',
        quantity: undefined
      }]
    }));
  };

  const removeResource = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  const updateResource = (index: number, field: string, value: string | number | undefined) => {
    setEditForm(prev => ({
      ...prev,
      resources: prev.resources.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const openEditModal = () => {
    // Reset form with current normalizedEvent
    setEditForm({
      title: normalizedEvent.title,
      description: normalizedEvent.description,
      date: normalizedEvent.date || '',
      time: normalizedEvent.time || '',
      location: normalizedEvent.location || '',
      capacity: normalizedEvent.capacity || 50,
      organizer: normalizedEvent.organizer,
      type: normalizedEvent.eventName,
      agenda: [...eventData.agenda],
      resources: [...eventData.resources]
    });
    setShowEditModal(true);
  };

  const handleSave = () => {
    // Update eventData with editForm values and current registration count
    setEventData(prev => ({
      ...prev,
      title: editForm.title,
      description: editForm.description,
      date: editForm.date,
      time: editForm.time,
      location: editForm.location,
      capacity: editForm.capacity,
      organizer: editForm.organizer,
      type: editForm.type,
      agenda: [...editForm.agenda],
      resources: [...editForm.resources],
      registrations: eventSpecificAttendees.length // Update with actual count
    }));

    // Here you would typically save to backend
    // console.log('Saving event:', editForm);
    setShowEditModal(false);
  };

  // Update editForm when normalizedEvent changes
  useEffect(() => {
    setEditForm(prev => ({
      ...prev,
      title: normalizedEvent.title,
      description: normalizedEvent.description,
      date: normalizedEvent.date || '',
      time: normalizedEvent.time || '',
      location: normalizedEvent.location || '',
      capacity: normalizedEvent.capacity || 50,
      organizer: normalizedEvent.organizer,
      type: normalizedEvent.eventName,
    }));
  }, [normalizedEvent]);

  // Show loading state while fetching event data
  if (eventLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-500">Loading event details...</p>
        </div>
      </div>
    );
  }

  const dateDisplay = normalizedEvent.date
    ? new Date(normalizedEvent.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Date TBD'

  const timeDisplay = normalizedEvent.startTime && normalizedEvent.endTime
    ? `${normalizedEvent.startTime} - ${normalizedEvent.endTime}`
    : normalizedEvent.time || 'Time TBD'
  return (
    <div className="space-y-6">
      {/* Event header - Inspired by Events page card layout */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center">
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEventTypeColor(normalizedEvent.eventName)}`}>
                {normalizedEvent.eventName}
              </span>
              <h2 className="ml-3 text-2xl font-bold text-gray-900">
                {normalizedEvent.title}
              </h2>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1 text-gray-400" />
                {dateDisplay}
              </div>

              <span className="hidden sm:inline mx-2">•</span>

              <div className="flex items-center mt-1 sm:mt-0">
                <Clock size={16} className="mr-1 text-gray-400" />
                {timeDisplay}
              </div>

              <span className="hidden sm:inline mx-2">•</span>

              <div className="flex items-center mt-1 sm:mt-0">
                <MapPin size={16} className="mr-1 text-gray-400" />
                {normalizedEvent.location || 'Location TBD'}
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Organizer:</span> {normalizedEvent.organizer}
              </div>

              {normalizedEvent.capacity && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Capacity:</span> {normalizedEvent.capacity} participants
                </div>
              )}
            </div>

            {normalizedEvent.description && normalizedEvent.description.trim() && (
              <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                {normalizedEvent.description}
              </p>
            )}
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end min-w-[200px]">
            <div className="w-full mb-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Users size={16} className="mr-1 text-gray-400" />
                  <span className="text-sm text-gray-500">Registration</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {attendeesLoading ? '...' : eventSpecificAttendees.length} / {normalizedEvent.capacity || 50}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: attendeesLoading ? '0%' : `${Math.min((eventSpecificAttendees.length / (normalizedEvent.capacity || 50)) * 100, 100)}%`
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{attendeesLoading ? '...' : eventSpecificAttendees.length} registered</span>
                <span>{attendeesLoading ? '...' : Math.max((normalizedEvent.capacity || 50) - eventSpecificAttendees.length, 0)} spots left</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                <Link size={16} className="mr-2" />
                Share
              </button>
              <button
                onClick={openEditModal}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                <Edit size={16} className="mr-2" />
                Edit Event
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ${activeTab === 'details' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('details')}>
          Events
        </button>
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ${activeTab === 'attendees' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('attendees')}>
          Attendees
        </button>
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ${activeTab === 'materials' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('materials')}>
          Materials
        </button>
      </div>
      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === 'details' && <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Event Description
                  </h3>
                  <p className="text-gray-700">
                    {eventData.description && eventData.description.trim()
                      ? eventData.description
                      : 'Event description will be updated soon. Stay tuned for more details about this exciting event!'
                    }
                  </p>
                </div>
                {/* Agenda */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Agenda
                    </h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowAgenda(!showAgenda)}>
                      {showAgenda ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  {showAgenda && <div className="space-y-4">
                      {eventData.agenda.map((item, index) => <div key={index} className="flex">
                          <div className="w-24 flex-shrink-0 text-sm text-gray-500">
                            {item.time}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">
                              {item.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.duration}
                            </div>
                          </div>
                        </div>)}
                    </div>}
                </div>
                {/* Resources */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Resources
                    </h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowResources(!showResources)}>
                      {showResources ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  {showResources && <div className="space-y-3">
                      {eventData.resources.map(resource => <div key={resource.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <div className="flex items-center">
                            <div className={`p-1.5 rounded-md ${resource.type === 'Room' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                              {resource.type === 'Room' ? <Users size={16} /> : <Laptop size={16} />}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {resource.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {resource.type}
                                {resource.quantity ? ` (${resource.quantity})` : ''}
                              </div>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(resource.status)}`}>
                            {resource.status}
                          </span>
                        </div>)}
                    </div>}
                </div>
              </div>
              {/* Right column */}
              <div className="space-y-6">
                {/* Event details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Event Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">Organizer</div>
                      <div className="text-sm font-medium text-gray-900">
                        {eventData.organizer}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">Capacity</div>
                      <div className="text-sm font-medium text-gray-900">
                        {eventData.capacity} attendees
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">Registrations</div>
                      <div className="text-sm font-medium text-gray-900">
                        {eventData.registrations} / {eventData.capacity}
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="text-xs text-gray-500 mb-1">
                        Registration status
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{
                      width: `${eventData.registrations / eventData.capacity * 100}%`
                    }}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        {Math.round(eventData.registrations / eventData.capacity * 100)}
                        % full
                      </div>
                    </div>
                  </div>
                </div>
                {/* Attendees preview */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-medium text-gray-900">
                      Attendees ({attendeesLoading ? '...' : eventSpecificAttendees.length})
                    </h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowAttendees(!showAttendees)}>
                      {showAttendees ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  {showAttendees && <div className="space-y-3">
                      {attendeesLoading ? (
                        <div className="text-center py-4">
                          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                          <p className="text-sm text-gray-500 mt-2">Loading attendees...</p>
                        </div>
                      ) : (
                        <>
                          {eventSpecificAttendees.slice(0, 3).map((attendee, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                                  {getAttendeeInitials(attendee['Full Name'])}
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">
                                    {attendee['Full Name']}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {getAttendeeAffiliation(attendee)}
                                  </div>
                                </div>
                              </div>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                                {attendee.Designation}
                              </span>
                            </div>
                          ))}
                          {eventSpecificAttendees.length > 3 && (
                            <button
                              className="w-full text-sm text-blue-600 hover:text-blue-800 mt-2"
                              onClick={() => setActiveTab('attendees')}
                            >
                              View all {eventSpecificAttendees.length} attendees
                            </button>
                          )}
                          <a
                            href="https://forms.gle/zFXgYnWD1qN37goe6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full mt-3 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                          >
                            <UserPlus size={16} className="mr-2" />
                            Add Attendee
                            <ExternalLink size={14} className="ml-2" />
                          </a>
                        </>
                      )}
                    </div>}
                </div>
                {/* Quick actions */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Actions
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <Calendar size={16} className="mr-2" />
                      Add to Calendar
                    </button>
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <Mail size={16} className="mr-2" />
                      Email Attendees
                    </button>
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <MessageSquare size={16} className="mr-2" />
                      Send Reminder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        {activeTab === 'attendees' && <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Attendees ({attendeesLoading ? '...' : eventSpecificAttendees.length})
                  </h3>
                  <div className="flex items-center">
                    <div className="relative mr-2">
                      <input
                        type="text"
                        placeholder="Search attendees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <a
                      href="https://forms.gle/zFXgYnWD1qN37goe6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    >
                      <UserPlus size={16} className="mr-2" />
                      Add Attendee
                      <ExternalLink size={14} className="ml-2" />
                    </a>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {attendeesLoading ? (
                    <div className="p-8 text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <p className="mt-2 text-gray-500">Loading attendees...</p>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Designation
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Affiliation
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mobile
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAttendees.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                              {searchTerm ? 'No attendees found matching your search.' : 'No attendees registered yet.'}
                            </td>
                          </tr>
                        ) : (
                          filteredAttendees.map((attendee, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                                    {getAttendeeInitials(attendee['Full Name'])}
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">
                                      {attendee['Full Name']}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {attendee['Department & Year ( if startup or other enter nil )'] &&
                                       attendee['Department & Year ( if startup or other enter nil )'] !== 'nil' &&
                                       attendee['Department & Year ( if startup or other enter nil )']}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {attendee['Email ID']}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  attendee.Designation.toLowerCase() === 'student'
                                    ? 'bg-blue-100 text-blue-800'
                                    : attendee.Designation.toLowerCase() === 'faculty'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-purple-100 text-purple-800'
                                }`}>
                                  {attendee.Designation}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {getAttendeeAffiliation(attendee)}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {attendee['Mobile Number']}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-2">
                                  <a
                                    href={`mailto:${attendee['Email ID']}`}
                                    className="text-blue-600 hover:text-blue-900"
                                    title="Send Email"
                                  >
                                    <Mail size={16} />
                                  </a>
                                  <a
                                    href={`tel:${attendee['Mobile Number']}`}
                                    className="text-green-600 hover:text-green-900"
                                    title="Call"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              <div className="lg:w-1/3">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Attendance Overview
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">
                          Registration Status
                        </span>
                        <span className="text-gray-900">
                          {attendeesLoading ? '...' : eventSpecificAttendees.length}/{eventData.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{
                      width: attendeesLoading ? '0%' : `${(eventSpecificAttendees.length / eventData.capacity) * 100}%`
                    }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{attendeesLoading ? '...' : eventSpecificAttendees.length} registered</span>
                        <span>
                          {attendeesLoading ? '...' : eventData.capacity - eventSpecificAttendees.length} spots left
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-500">Students</div>
                        <div className="text-xl font-bold text-blue-600 mt-1">
                          {attendeesLoading ? '...' : eventSpecificAttendees.filter(a => a.Designation.toLowerCase() === 'student').length}
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-500">Faculty</div>
                        <div className="text-xl font-bold text-green-600 mt-1">
                          {attendeesLoading ? '...' : eventSpecificAttendees.filter(a => a.Designation.toLowerCase() === 'faculty').length}
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-500">Industry</div>
                        <div className="text-xl font-bold text-purple-600 mt-1">
                          {attendeesLoading ? '...' : eventSpecificAttendees.filter(a =>
                            a.Designation.toLowerCase().includes('startup') ||
                            a.Designation.toLowerCase().includes('company')
                          ).length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Actions
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <Mail size={16} className="mr-2" />
                      Email All Attendees
                    </button>
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <Download size={16} className="mr-2" />
                      Export Attendee List
                    </button>
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <UserPlus size={16} className="mr-2" />
                      Invite More People
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        {activeTab === 'materials' && <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Event Materials ({eventData.materials.length})
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                      <Download size={16} className="mr-2" />
                      Download All
                    </button>
                    <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                      <Plus size={16} className="mr-2" />
                      Upload Material
                    </button>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-1">Actions</div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {eventData.materials.length === 0 ? (
                      <div className="px-4 py-8 text-center text-gray-500">
                        <FileText size={48} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-sm">No materials uploaded yet</p>
                        <p className="text-xs text-gray-400 mt-1">Upload presentation slides, handouts, or other resources</p>
                      </div>
                    ) : (
                      eventData.materials.map(material => {
                        const getFileIcon = (type: string) => {
                          switch (type.toLowerCase()) {
                            case 'pdf':
                              return <div className="p-1 bg-red-100 rounded"><FileText size={16} className="text-red-600" /></div>;
                            case 'ppt':
                            case 'pptx':
                              return <div className="p-1 bg-orange-100 rounded"><FileText size={16} className="text-orange-600" /></div>;
                            case 'doc':
                            case 'docx':
                              return <div className="p-1 bg-blue-100 rounded"><FileText size={16} className="text-blue-600" /></div>;
                            case 'zip':
                              return <div className="p-1 bg-purple-100 rounded"><FileText size={16} className="text-purple-600" /></div>;
                            default:
                              return <div className="p-1 bg-gray-100 rounded"><FileText size={16} className="text-gray-600" /></div>;
                          }
                        };

                        return (
                          <div key={material.id} className="grid grid-cols-12 px-4 py-3 hover:bg-gray-50">
                            <div className="col-span-5 flex items-center">
                              {getFileIcon(material.type)}
                              <div className="ml-3">
                                <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                                  {material.name}
                                </div>
                                <div className="text-xs text-gray-400">
                                  Click to preview or download
                                </div>
                              </div>
                            </div>
                            <div className="col-span-2 text-sm text-gray-500 flex items-center">
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                                {material.type.toUpperCase()}
                              </span>
                            </div>
                            <div className="col-span-2 text-sm text-gray-500 flex items-center">
                              {material.size}
                            </div>
                            <div className="col-span-2 text-sm text-gray-500 flex items-center">
                              <div>
                                <div>
                                  {new Date(material.uploadDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {new Date(material.uploadDate).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-span-1 flex items-center justify-center">
                              <div className="flex items-center space-x-1">
                                <button
                                  className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                  title="Download"
                                >
                                  <Download size={14} />
                                </button>
                                <button
                                  className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-50"
                                  title="More options"
                                >
                                  <MoreHorizontal size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Additional Information
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertTriangle size={18} className="text-yellow-600 mt-0.5" />
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">
                            Workshop Prerequisites
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Participants should bring their own laptops with Python installed.
                            Basic programming knowledge is recommended but not required.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Laptop size={18} className="text-blue-600 mt-0.5" />
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">
                            Technical Requirements
                          </h4>
                          <ul className="mt-1 text-sm text-gray-500 space-y-1">
                            <li>• Laptop with minimum 4GB RAM</li>
                            <li>• Python 3.8+ installed</li>
                            <li>• Stable internet connection</li>
                            <li>• Code editor (VS Code recommended)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Users size={18} className="text-green-600 mt-0.5" />
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">
                            What You'll Learn
                          </h4>
                          <ul className="mt-1 text-sm text-gray-500 space-y-1">
                            <li>• Fundamentals of Machine Learning</li>
                            <li>• Neural Networks and Deep Learning</li>
                            <li>• Hands-on coding with Python</li>
                            <li>• Real-world AI applications</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Material Access
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">Public access</div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="public-access" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked={false} />
                        <label htmlFor="public-access" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">
                        Attendees only
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="attendees-only" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked={true} />
                        <label htmlFor="attendees-only" className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-600 cursor-pointer"></label>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">
                        Password protected
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="password-protected" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked={false} />
                        <label htmlFor="password-protected" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                      <Link size={16} className="mr-2" />
                      Generate shareable link
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Actions
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <Download size={16} className="mr-2" />
                      Download All Materials
                    </button>
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <Mail size={16} className="mr-2" />
                      Email Materials to Attendees
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>

      {/* Edit Event Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Event</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Event Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type
                  </label>
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Presentation">Presentation</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Networking">Networking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="text"
                    value={editForm.time}
                    onChange={(e) => setEditForm(prev => ({ ...prev, time: e.target.value }))}
                    placeholder="e.g., 10:00 AM - 12:00 PM"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={editForm.capacity}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = value === '' ? 0 : parseInt(value);
                      setEditForm(prev => ({ ...prev, capacity: numValue }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organizer
                  </label>
                  <input
                    type="text"
                    value={editForm.organizer}
                    onChange={(e) => setEditForm(prev => ({ ...prev, organizer: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Agenda Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Agenda</h3>
                  <button
                    onClick={addAgendaItem}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Item
                  </button>
                </div>

                <div className="space-y-3">
                  {editForm.agenda.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) => updateAgendaItem(index, 'time', e.target.value)}
                        placeholder="Time"
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateAgendaItem(index, 'title', e.target.value)}
                        placeholder="Title"
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={item.duration}
                        onChange={(e) => updateAgendaItem(index, 'duration', e.target.value)}
                        placeholder="Duration"
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => removeAgendaItem(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Resources</h3>
                  <button
                    onClick={addResource}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Resource
                  </button>
                </div>

                <div className="space-y-3">
                  {editForm.resources.map((resource, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                      <input
                        type="text"
                        value={resource.name}
                        onChange={(e) => updateResource(index, 'name', e.target.value)}
                        placeholder="Resource name"
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <select
                        value={resource.type}
                        onChange={(e) => updateResource(index, 'type', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Room">Room</option>
                        <option value="Equipment">Equipment</option>
                      </select>
                      <input
                        type="number"
                        value={resource.quantity || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numValue = value === '' ? undefined : parseInt(value);
                          updateResource(index, 'quantity', numValue);
                        }}
                        placeholder="Qty"
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <select
                        value={resource.status}
                        onChange={(e) => updateResource(index, 'status', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => removeResource(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #fff;
        }
        .toggle-label {
          transition: background-color 0.2s ease;
        }
      `}</style>
    </div>
  );
};
export default EventDetails;