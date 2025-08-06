import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Search, Filter, Plus, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Users, MapPin, Clock, Edit, Trash2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

const eventsData = [{
  id: '1',
  title: 'AI Workshop',
  date: '2023-07-11',
  time: '10:00 AM - 12:00 PM',
  location: 'Tech Lab 101',
  capacity: 30,
  registrations: 24,
  description: 'Introduction to machine learning and AI concepts for beginners.',
  organizer: 'Dr. James Wilson',
  type: 'Workshop'
}, {
  id: '2',
  title: 'Innovation Pitch Day',
  date: '2023-07-15',
  time: '2:00 PM - 5:00 PM',
  location: 'Main Auditorium',
  capacity: 100,
  registrations: 65,
  description: 'Teams present their project ideas to mentors and potential investors.',
  organizer: 'Innovation Hub Team',
  type: 'Presentation'
}, {
  id: '3',
  title: 'Entrepreneurship Seminar',
  date: '2023-07-18',
  time: '3:00 PM - 4:30 PM',
  location: 'Business Building, Room 305',
  capacity: 50,
  registrations: 42,
  description: 'Learn about turning your innovation into a viable business.',
  organizer: 'Prof. Maria Garcia',
  type: 'Seminar'
}, {
  id: '4',
  title: 'Hackathon: Sustainable Solutions',
  date: '2023-07-22',
  time: '9:00 AM - 9:00 PM',
  location: 'Innovation Hub',
  capacity: 60,
  registrations: 48,
  description: '12-hour hackathon focused on creating sustainable technology solutions.',
  organizer: 'Sustainability Club & Innovation Hub',
  type: 'Hackathon'
}, {
  id: '5',
  title: 'Networking Mixer',
  date: '2023-07-25',
  time: '5:00 PM - 7:00 PM',
  location: 'Student Center',
  capacity: 80,
  registrations: 35,
  description: 'Connect with industry professionals, mentors, and fellow innovators.',
  organizer: 'Career Services',
  type: 'Networking'
}];

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

// 1) Shape of one row in the Google Sheet
interface GSheetEvent {
  Timestamp: string;                // e.g. "7/28/2025 14:28:40"
  eventName: string;               // "Name of the Event"
  title: string;                   // "Title of the Event"
  description: string;             // "Description of the Event"
  date: string;                    // "Date of the event" (YYYY-MM-DD)
  startTime: string;               // "Starting Time of the Event"
  endTime: string;                 // "Ending Time of the Event"
  location: string;                // "Location of the Event"
  flyer: string;                   // link or filename
}

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1Ou7LQrelAKw2qZ8xyNrLUOApEeYSd2mKPrR5Fl1smD4/export?format=xlsx';

const parseSheet = (wb: XLSX.WorkBook): GSheetEvent[] => {
  const ws  = wb.Sheets[wb.SheetNames[0]];
  const raw = XLSX.utils.sheet_to_json<Record<string, any>>(ws, { defval: '' });
  return raw.map(row => {
    const dateObj  = excelSerialToDate(Number(row['Date of the event']));
    const startObj = excelSerialToDate(Number(row['Starting Time of the Event']));
    const endObj   = excelSerialToDate(Number(row['Ending Time of the Event']));
    return {
      Timestamp:   row['Timestamp'],
      eventName:   row['Name of the Event'],
      title:       row['Title of the Event'],
      description: row['Description of the Event'],
      date:        dateObj.toISOString().split('T')[0],
      startTime:   startObj.toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit', hour12:true }),
      endTime:     endObj.toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit', hour12:true }),
      location:    row['Location of the Event'],
      flyer:       row['Flyer']
    };
  });
};


const Events = () => {
  const [activeView, setActiveView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
const [events, setEvents]   = useState<GSheetEvent[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  (async () => {
    try {
      const res = await fetch(SHEET_URL);
      const buf = await res.arrayBuffer();
      const wb  = XLSX.read(buf, { type: 'array' });
      setEvents(parseSheet(wb));
    } catch (err) {
      console.error('Error fetching sheet:', err);
    } finally {
      setLoading(false);
    }
  })();
}, []);



// Show spinner while loading
if (loading) {
  return (
    <div className="p-10 flex justify-center">
      <RefreshCw className="animate-spin h-8 w-8 text-blue-600" />
    </div>
  );
}

// instead of eventsData, now use:
const filteredEvents = events.filter(e => {
  const term = searchTerm.toLowerCase();
  return (
    e.eventName.toLowerCase().includes(term) ||
    e.title.toLowerCase().includes(term) ||
    e.description.toLowerCase().includes(term) ||
    e.location.toLowerCase().includes(term)
  );
});

  const eventTypes = [...new Set(eventsData.map(event => event.type))];
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  const getMonthName = () => {
    return currentMonth.toLocaleString('default', {
      month: 'long',
      year: 'numeric'
    });
  };
  // Generate days for calendar view
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({
        day: null,
        events: []
      });
    }
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `₹{year}-₹{String(month + 1).padStart(2, '0')}-₹{String(day).padStart(2, '0')}`;
      const dayEvents = eventsData.filter(event => event.date === date);
      days.push({
        day,
        date,
        events: dayEvents
      });
    }
    return days;
  };
  const days = getDaysInMonth();
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Events & Workshops
          </h2>
          <p className="text-gray-500 mt-1">
            Schedule and manage all Innovation Hub events
          </p>
        </div>
        <a
          href="https://forms.gle/DR6YAStUTSArQ9wv9"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Schedule Event
        </a>
      </div>
      {/* View toggle */}
      <div className="flex border border-gray-200 rounded-md overflow-hidden">
        <button className={`px-4 py-2 font-medium text-sm flex items-center ₹{activeView === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`} onClick={() => setActiveView('list')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          List
        </button>
        <button className={`px-4 py-2 font-medium text-sm flex items-center ₹{activeView === 'calendar' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`} onClick={() => setActiveView('calendar')}>
          <CalendarIcon size={18} className="mr-1" />
          Calendar
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Search and filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search events..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md px-3 py-2" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={18} className="mr-2" />
                Filters
                <ChevronDown size={16} className="ml-2" />
              </button>
              <div>
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={eventTypeFilter} onChange={e => setEventTypeFilter(e.target.value)}>
                  <option value="All">All Types</option>
                  {eventTypes.map((type, index) => <option key={index} value={type}>
                      {type}
                    </option>)}
                </select>
              </div>
            </div>
          </div>
          {showFilters && <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <div className="flex items-center space-x-2">
                  <input type="date" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  <span>to</span>
                  <input type="date" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Locations</option>
                  <option value="Tech Lab 101">Tech Lab 101</option>
                  <option value="Main Auditorium">Main Auditorium</option>
                  <option value="Innovation Hub">Innovation Hub</option>
                  <option value="Student Center">Student Center</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Status
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input type="radio" id="all" name="registrationStatus" className="text-blue-600 focus:ring-blue-500" defaultChecked />
                    <label htmlFor="all" className="ml-2 text-sm text-gray-700">
                      All
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="openReg" name="registrationStatus" className="text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="openReg" className="ml-2 text-sm text-gray-700">
                      Open Registration
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="full" name="registrationStatus" className="text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="full" className="ml-2 text-sm text-gray-700">
                      Full
                    </label>
                  </div>
                </div>
              </div>
            </div>}
        </div>
        {activeView === 'list' ? <div>
            {/* Events list */}
            <div className="divide-y divide-gray-200">
              {filteredEvents.map(event => <div key={event.Timestamp} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{getEventTypeColor(event.type)}`}>
                          {event.eventName}
                        </span>
                        <h3 className="ml-2 text-lg font-medium text-gray-900">
                          <Link to={`/events/₹{event.id}`} className="hover:text-blue-600">
                            {event.title}
                          </Link>
                        </h3>
                      </div>
                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon size={16} className="mr-1 text-gray-400" />
                          {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                        </div>
                        <span className="hidden sm:inline mx-2">•</span>
                        <div className="flex items-center mt-1 sm:mt-0">
                          <Clock size={16} className="mr-1 text-gray-400" />
                          {event.startTime} - {event.endTime}
                        </div>
                        <span className="hidden sm:inline mx-2">•</span>
                        <div className="flex items-center mt-1 sm:mt-0">
                          <MapPin size={16} className="mr-1 text-gray-400" />
                          {event.location}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                      <div className="flex items-center">
                        <Users size={16} className="mr-1 text-gray-400" />
                        <span className="text-sm text-gray-500">
                        </span>
                      </div>
                      <div className="mt-2 flex space-x-2">
                        <Link to={`/events/₹{event.id}`} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
                          View Details
                        </Link>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div> : <div className="p-4">
            {/* Calendar month navigation */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {getMonthName()}
              </h3>
              <div className="flex space-x-2">
                <button className="p-1 rounded-full hover:bg-gray-100" onClick={prevMonth}>
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100" onClick={nextMonth}>
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => <div key={index} className="text-center py-2 text-sm font-medium text-gray-500">
                    {day}
                  </div>)}
              {/* Calendar days */}
              {days.map((day, index) => <div key={index} className={`border border-gray-200 min-h-[100px] ₹{day.day ? 'bg-white' : 'bg-gray-50'}`}>
                  {day.day && <div className="p-1">
                      <div className="text-right text-sm text-gray-500 p-1">
                        {day.day}
                      </div>
                      <div className="space-y-1">
                        {day.events.map((event, eventIndex) => <Link key={eventIndex} to={`/events/₹{event.id}`} className={`block px-2 py-1 text-xs truncate rounded ₹{getEventTypeColor(event.type)} hover:opacity-80`}>
                            {event.title}
                          </Link>)}
                      </div>
                    </div>}
                </div>)}
            </div>
          </div>}
      </div>
    </div>;
};
export default Events;