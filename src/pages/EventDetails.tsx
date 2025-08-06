import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Edit, Link, Trash2, Check, X, ChevronDown, ChevronUp, Download, MessageSquare, UserPlus, Mail, AlertTriangle, Laptop, FileText, MoreHorizontal, Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
const eventData = {
  id: '1',
  title: 'AI Workshop',
  date: '2023-07-11',
  time: '10:00 AM - 12:00 PM',
  location: 'Tech Lab 101',
  capacity: 30,
  registrations: 24,
  description: 'Introduction to machine learning and AI concepts for beginners. This workshop will cover the fundamentals of AI, including supervised and unsupervised learning, neural networks, and practical applications. Participants will get hands-on experience with simple ML models.',
  organizer: 'Dr. James Wilson',
  type: 'Workshop',
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
  useParams();
  const [activeTab, setActiveTab] = useState('details');
  const [showAttendees, setShowAttendees] = useState(true);
  const [showResources, setShowResources] = useState(true);
  const [showAgenda, setShowAgenda] = useState(true);
  return <div className="space-y-6">
      {/* Event header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {eventData.title}
            </h2>
            <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${getEventTypeColor(eventData.type)}`}>
              {eventData.type}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center mt-2 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>
                {new Date(eventData.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
              </span>
            </div>
            <span className="hidden sm:inline mx-2">•</span>
            <div className="flex items-center mt-1 sm:mt-0">
              <Clock size={16} className="mr-1" />
              <span>{eventData.time}</span>
            </div>
            <span className="hidden sm:inline mx-2">•</span>
            <div className="flex items-center mt-1 sm:mt-0">
              <MapPin size={16} className="mr-1" />
              <span>{eventData.location}</span>
            </div>
          </div>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-3">
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            <Link size={16} className="mr-2" />
            Share
          </button>
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            <Edit size={16} className="mr-2" />
            Edit Event
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ${activeTab === 'details' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('details')}>
          Event Details
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
                  <p className="text-gray-700">{eventData.description}</p>
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
                      Attendees
                    </h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowAttendees(!showAttendees)}>
                      {showAttendees ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  {showAttendees && <div className="space-y-3">
                      {eventData.attendees.slice(0, 3).map(attendee => <div key={attendee.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                              {attendee.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {attendee.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {attendee.project}
                              </div>
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(attendee.status)}`}>
                            {attendee.status}
                          </span>
                        </div>)}
                      {eventData.attendees.length > 3 && <button className="w-full text-sm text-blue-600 hover:text-blue-800 mt-2" onClick={() => setActiveTab('attendees')}>
                          View all {eventData.attendees.length} attendees
                        </button>}
                      <button className="w-full mt-3 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                        <UserPlus size={16} className="mr-2" />
                        Add Attendee
                      </button>
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
                    Attendees ({eventData.attendees.length})
                  </h3>
                  <div className="flex items-center">
                    <div className="relative mr-2">
                      <input type="text" placeholder="Search attendees..." className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                      <UserPlus size={16} className="mr-2" />
                      Add Attendee
                    </button>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
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
                          Project
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {eventData.attendees.map(attendee => <tr key={attendee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                                {attendee.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {attendee.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {attendee.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                              {attendee.project}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(attendee.status)}`}>
                              {attendee.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Mail size={16} />
                              </button>
                              {attendee.status === 'pending' ? <>
                                  <button className="text-green-600 hover:text-green-900">
                                    <Check size={16} />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <X size={16} />
                                  </button>
                                </> : <button className="text-red-600 hover:text-red-900">
                                  <Trash2 size={16} />
                                </button>}
                            </div>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
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
                          {eventData.registrations}/{eventData.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{
                      width: `${eventData.registrations / eventData.capacity * 100}%`
                    }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{eventData.registrations} registered</span>
                        <span>
                          {eventData.capacity - eventData.registrations} spots
                          left
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-500">Confirmed</div>
                        <div className="text-xl font-bold text-green-600 mt-1">
                          {eventData.attendees.filter(a => a.status === 'confirmed').length}
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-500">Pending</div>
                        <div className="text-xl font-bold text-yellow-600 mt-1">
                          {eventData.attendees.filter(a => a.status === 'pending').length}
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
                    Event Materials
                  </h3>
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    <Plus size={16} className="mr-2" />
                    Upload Material
                  </button>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase">
                    <div className="col-span-6">Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-2">Date</div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {eventData.materials.map(material => <div key={material.id} className="grid grid-cols-12 px-4 py-3 hover:bg-gray-50">
                        <div className="col-span-6 flex items-center">
                          <div className="p-1 bg-blue-100 rounded">
                            <FileText size={16} className="text-blue-600" />
                          </div>
                          <div className="ml-3 text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                            {material.name}
                          </div>
                        </div>
                        <div className="col-span-2 text-sm text-gray-500 flex items-center">
                          {material.type}
                        </div>
                        <div className="col-span-2 text-sm text-gray-500 flex items-center">
                          {material.size}
                        </div>
                        <div className="col-span-2 text-sm text-gray-500 flex items-center justify-between">
                          <span>
                            {new Date(material.uploadDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </div>)}
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Additional Information
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertTriangle size={18} className="text-yellow-600 mt-0.5" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">
                          Workshop Prerequisites
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Participants should bring their own laptops with
                          Python installed. Basic programming knowledge is
                          recommended but not required.
                        </p>
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
      <style>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #fff;
        }
        .toggle-label {
          transition: background-color 0.2s ease;
        }
      `}</style>
    </div>;
};
export default EventDetails;