import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Edit, Trash2, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, XCircle, Link, FileText, Info, Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
const resourceData = {
  id: '1',
  name: '3D Printer',
  type: 'Equipment',
  location: 'Makerspace',
  availability: 'Available',
  description: 'High-precision 3D printer for prototyping. Supports PLA, ABS, and PETG filaments with up to 100-micron resolution. Maximum build volume: 250mm x 210mm x 210mm.',
  bookings: [{
    id: 'b1',
    date: '2023-07-15',
    time: '2:00 PM - 4:00 PM',
    user: {
      id: '1',
      name: 'Team RoboHelp',
      project: 'Smart City Solutions'
    },
    status: 'Approved'
  }, {
    id: 'b2',
    date: '2023-07-16',
    time: '10:00 AM - 12:00 PM',
    user: {
      id: '2',
      name: 'Sarah Chen',
      project: 'AI for Sustainable Agriculture'
    },
    status: 'Pending'
  }],
  specifications: [{
    name: 'Brand',
    value: 'MakerPro'
  }, {
    name: 'Model',
    value: 'MP-X500'
  }, {
    name: 'Build Volume',
    value: '250mm x 210mm x 210mm'
  }, {
    name: 'Layer Resolution',
    value: '0.1mm - 0.4mm'
  }, {
    name: 'Filament Type',
    value: 'PLA, ABS, PETG'
  }, {
    name: 'Connectivity',
    value: 'USB, Wi-Fi'
  }],
  maintenanceHistory: [{
    date: '2023-06-15',
    type: 'Regular Service',
    notes: 'Cleaned print bed and nozzle, calibrated XYZ axes'
  }, {
    date: '2023-04-02',
    type: 'Repair',
    notes: 'Replaced extruder motor'
  }, {
    date: '2023-01-10',
    type: 'Regular Service',
    notes: 'Firmware update, general maintenance'
  }],
  usage: {
    thisMonth: 24,
    lastMonth: 18,
    topUsers: [{
      name: 'Team RoboHelp',
      hours: 8
    }, {
      name: 'Sarah Chen',
      hours: 6
    }, {
      name: 'David Park',
      hours: 4
    }]
  },
  documents: [{
    id: '1',
    name: 'User Manual.pdf',
    type: 'PDF',
    size: '3.2 MB'
  }, {
    id: '2',
    name: 'Maintenance Guide.pdf',
    type: 'PDF',
    size: '1.8 MB'
  }, {
    id: '3',
    name: 'Usage Policy.docx',
    type: 'Word',
    size: '542 KB'
  }]
};
const getAvailabilityColor = status => {
  switch (status) {
    case 'Available':
      return 'bg-green-100 text-green-800';
    case 'Booked':
      return 'bg-blue-100 text-blue-800';
    case 'Maintenance':
      return 'bg-yellow-100 text-yellow-800';
    case 'Out of Order':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
const getBookingStatusColor = status => {
  switch (status) {
    case 'Approved':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
const ResourceDetails = () => {
  const {
    id
  } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookings, setShowBookings] = useState(true);
  const [showSpecifications, setShowSpecifications] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Function to get dates for the calendar
  const getDatesForCalendar = () => {
    const dates = [];
    const today = new Date();
    // Get current week dates
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Check if there are bookings for this date
      const hasBookings = resourceData.bookings.some(booking => new Date(booking.date).toDateString() === date.toDateString());
      dates.push({
        date,
        day: date.getDate(),
        dayName: date.toLocaleDateString('en-US', {
          weekday: 'short'
        }),
        hasBookings
      });
    }
    return dates;
  };
  // Get bookings for the selected date
  const getBookingsForDate = date => {
    return resourceData.bookings.filter(booking => new Date(booking.date).toDateString() === date.toDateString());
  };
  const calendarDates = getDatesForCalendar();
  const selectedDateBookings = getBookingsForDate(selectedDate);
  return <div className="space-y-6">
      {/* Resource header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {resourceData.name}
            </h2>
            <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ₹{getAvailabilityColor(resourceData.availability)}`}>
              {resourceData.availability}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center mt-2 text-sm text-gray-500">
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span>{resourceData.location}</span>
            </div>
            <span className="hidden sm:inline mx-2">•</span>
            <div className="flex items-center mt-1 sm:mt-0">
              <FileText size={16} className="mr-1" />
              <span>{resourceData.type}</span>
            </div>
          </div>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-3">
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            <div size={16} className="mr-2" />
            Maintenance
          </button>
          <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            <Calendar size={16} className="mr-2" />
            Book Now
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('overview')}>
          Overview
        </button>
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'bookings' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('bookings')}>
          Bookings
        </button>
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'maintenance' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('maintenance')}>
          Maintenance
        </button>
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'documents' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('documents')}>
          Documents
        </button>
      </div>
      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === 'overview' && <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-700">{resourceData.description}</p>
                </div>
                {/* Specifications */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Specifications
                    </h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowSpecifications(!showSpecifications)}>
                      {showSpecifications ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  {showSpecifications && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resourceData.specifications.map((spec, index) => <div key={index} className="flex justify-between bg-gray-50 p-3 rounded-md">
                          <span className="text-sm text-gray-500">
                            {spec.name}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {spec.value}
                          </span>
                        </div>)}
                    </div>}
                </div>
                {/* Bookings */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Upcoming Bookings
                    </h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowBookings(!showBookings)}>
                      {showBookings ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  {showBookings && <div className="space-y-3">
                      {resourceData.bookings.map(booking => <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(booking.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}{' '}
                              • {booking.time}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                              <Users size={12} className="mr-1" />
                              <span className="text-blue-600 hover:underline cursor-pointer">
                                {booking.user.name}
                              </span>
                              <span className="mx-1">•</span>
                              <span className="text-blue-600 hover:underline cursor-pointer">
                                {booking.user.project}
                              </span>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ₹{getBookingStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>)}
                      <button className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                        <Calendar size={16} className="mr-2" />
                        View All Bookings
                      </button>
                    </div>}
                </div>
              </div>
              {/* Right column */}
              <div className="space-y-6">
                {/* Availability */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Availability
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">
                        Current Status
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ₹{getAvailabilityColor(resourceData.availability)}`}>
                        {resourceData.availability}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">
                        Next Available
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        Today, 4:00 PM
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">
                        Booking Duration
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        2 hours (max)
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center">
                    <Calendar size={16} className="mr-2" />
                    Book Now
                  </button>
                </div>
                {/* Usage Statistics */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Usage Statistics
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">This Month</span>
                        <span className="font-medium text-gray-900">
                          {resourceData.usage.thisMonth} hours
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{
                      width: `₹{resourceData.usage.thisMonth / 40 * 100}%`
                    }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Last Month</span>
                        <span className="font-medium text-gray-900">
                          {resourceData.usage.lastMonth} hours
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-gray-500 h-1.5 rounded-full" style={{
                      width: `₹{resourceData.usage.lastMonth / 40 * 100}%`
                    }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Top Users
                    </h4>
                    <div className="space-y-2">
                      {resourceData.usage.topUsers.map((user, index) => <div key={index} className="flex justify-between text-sm">
                          <span className="text-blue-600 hover:underline cursor-pointer">
                            {user.name}
                          </span>
                          <span className="text-gray-500">
                            {user.hours} hours
                          </span>
                        </div>)}
                    </div>
                  </div>
                </div>
                {/* Quick Links */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Quick Links
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <FileText size={16} className="mr-2" />
                      User Manual
                    </button>
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <div size={16} className="mr-2" />
                      Report an Issue
                    </button>
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <Info size={16} className="mr-2" />
                      Usage Policy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        {activeTab === 'bookings' && <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Calendar
                  </h3>
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    <Plus size={16} className="mr-2" />
                    New Booking
                  </button>
                </div>
                {/* Date selector */}
                <div className="flex overflow-x-auto mb-4 border border-gray-200 rounded-lg">
                  {calendarDates.map((dateObj, index) => <button key={index} className={`flex-1 py-3 px-4 flex flex-col items-center min-w-[80px] ₹{selectedDate.toDateString() === dateObj.date.toDateString() ? 'bg-blue-50 border-b-2 border-blue-600' : 'hover:bg-gray-50'} ₹{dateObj.hasBookings ? 'font-semibold' : ''}`} onClick={() => setSelectedDate(dateObj.date)}>
                      <div className="text-xs text-gray-500">
                        {dateObj.dayName}
                      </div>
                      <div className={`text-lg ₹{selectedDate.toDateString() === dateObj.date.toDateString() ? 'text-blue-600' : 'text-gray-800'}`}>
                        {dateObj.day}
                      </div>
                      {dateObj.hasBookings && <div className="w-1 h-1 bg-blue-600 rounded-full mt-1"></div>}
                    </button>)}
                </div>
                {/* Time slots */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <h4 className="font-medium text-gray-700">
                      {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                    </h4>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {/* Morning slots */}
                    <div className="p-4">
                      <h5 className="text-sm font-medium text-gray-500 mb-3">
                        Morning
                      </h5>
                      <div className="grid grid-cols-4 gap-2">
                        {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'].map((time, index) => {
                      const isBooked = selectedDateBookings.some(booking => booking.time.includes(time));
                      return <button key={index} className={`py-2 px-3 rounded-md text-sm ₹{isBooked ? 'bg-red-50 text-red-700 cursor-not-allowed' : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700'}`} disabled={isBooked}>
                                {time}
                                {isBooked && <span className="block text-xs">Booked</span>}
                              </button>;
                    })}
                      </div>
                    </div>
                    {/* Afternoon slots */}
                    <div className="p-4">
                      <h5 className="text-sm font-medium text-gray-500 mb-3">
                        Afternoon
                      </h5>
                      <div className="grid grid-cols-4 gap-2">
                        {['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'].map((time, index) => {
                      const isBooked = selectedDateBookings.some(booking => booking.time.includes(time));
                      return <button key={index} className={`py-2 px-3 rounded-md text-sm ₹{isBooked ? 'bg-red-50 text-red-700 cursor-not-allowed' : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700'}`} disabled={isBooked}>
                                {time}
                                {isBooked && <span className="block text-xs">Booked</span>}
                              </button>;
                    })}
                      </div>
                    </div>
                    {/* Evening slots */}
                    <div className="p-4">
                      <h5 className="text-sm font-medium text-gray-500 mb-3">
                        Evening
                      </h5>
                      <div className="grid grid-cols-4 gap-2">
                        {['4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'].map((time, index) => {
                      const isBooked = selectedDateBookings.some(booking => booking.time.includes(time));
                      return <button key={index} className={`py-2 px-3 rounded-md text-sm ₹{isBooked ? 'bg-red-50 text-red-700 cursor-not-allowed' : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700'}`} disabled={isBooked}>
                                {time}
                                {isBooked && <span className="block text-xs">Booked</span>}
                              </button>;
                    })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Booking Requests
                  </h3>
                  <div className="space-y-4">
                    {resourceData.bookings.filter(b => b.status === 'Pending').map(booking => <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {new Date(booking.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}{' '}
                                • {booking.time}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Requested by{' '}
                                <span className="text-blue-600 hover:underline cursor-pointer">
                                  {booking.user.name}
                                </span>
                              </div>
                            </div>
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <button className="flex-1 px-3 py-1 bg-green-100 text-green-600 rounded-md text-sm flex items-center justify-center">
                              <CheckCircle size={14} className="mr-1" /> Approve
                            </button>
                            <button className="flex-1 px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm flex items-center justify-center">
                              <XCircle size={14} className="mr-1" /> Decline
                            </button>
                          </div>
                        </div>)}
                    {resourceData.bookings.filter(b => b.status === 'Pending').length === 0 && <div className="text-center py-4">
                        <CheckCircle size={32} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          No pending booking requests
                        </p>
                      </div>}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Upcoming Bookings
                  </h3>
                  <div className="space-y-3">
                    {resourceData.bookings.filter(b => b.status === 'Approved').map(booking => <div key={booking.id} className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-md">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(booking.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}{' '}
                              • {booking.time}
                            </div>
                            <div className="text-xs text-blue-600 hover:underline cursor-pointer">
                              {booking.user.name}
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit size={16} />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>)}
                    {resourceData.bookings.filter(b => b.status === 'Approved').length === 0 && <div className="text-center py-4">
                        <Calendar size={32} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          No upcoming bookings
                        </p>
                      </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>}
        {activeTab === 'maintenance' && <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Maintenance History
                  </h3>
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    <div size={16} className="mr-2" />
                    Schedule Maintenance
                  </button>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Notes
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {resourceData.maintenanceHistory.map((record, index) => <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(record.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{record.type === 'Regular Service' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {record.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {record.notes}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">
                              View Details
                            </button>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Report an Issue
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="mb-4">
                      <label htmlFor="issue-type" className="block text-sm font-medium text-gray-700 mb-1">
                        Issue Type
                      </label>
                      <select id="issue-type" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>Hardware Problem</option>
                        <option>Software Problem</option>
                        <option>Calibration Issue</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="issue-description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea id="issue-description" rows={4} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Describe the issue in detail..."></textarea>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center">
                        <input id="urgent" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="urgent" className="ml-2 block text-sm text-gray-700">
                          Mark as urgent
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Submit Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Maintenance Schedule
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">
                        Next Scheduled
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        August 15, 2023
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">
                        Maintenance Type
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        Regular Service
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">
                        Last Maintenance
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        June 15, 2023
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex">
                    <AlertTriangle size={18} className="text-yellow-600 flex-shrink-0" />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-yellow-800">
                        Maintenance Due Soon
                      </div>
                      <div className="text-xs text-yellow-700 mt-1">
                        Regular service is due in 35 days
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Maintenance Contacts
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="text-sm font-medium text-gray-900">
                        MakerPro Support
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Primary Contact
                      </div>
                      <div className="mt-2 flex items-center text-sm text-blue-600 hover:underline cursor-pointer">
                        <Mail size={14} className="mr-1" />
                        support@makerpro.com
                      </div>
                      <div className="mt-1 flex items-center text-sm text-blue-600 hover:underline cursor-pointer">
                        <Phone size={14} className="mr-1" />
                        (555) 123-4567
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="text-sm font-medium text-gray-900">
                        Tech Department
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Internal Support
                      </div>
                      <div className="mt-2 flex items-center text-sm text-blue-600 hover:underline cursor-pointer">
                        <Mail size={14} className="mr-1" />
                        tech@innovationhub.org
                      </div>
                      <div className="mt-1 flex items-center text-sm text-blue-600 hover:underline cursor-pointer">
                        <Phone size={14} className="mr-1" />
                        Ext. 4523
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        {activeTab === 'documents' && <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Resource Documents
                  </h3>
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    <Plus size={16} className="mr-2" />
                    Upload Document
                  </button>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase">
                    <div className="col-span-6">Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {resourceData.documents.map(doc => <div key={doc.id} className="grid grid-cols-12 px-4 py-3 hover:bg-gray-50">
                        <div className="col-span-6 flex items-center">
                          <div className="p-1 bg-blue-100 rounded">
                            <FileText size={16} className="text-blue-600" />
                          </div>
                          <div className="ml-3 text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                            {doc.name}
                          </div>
                        </div>
                        <div className="col-span-2 text-sm text-gray-500 flex items-center">
                          {doc.type}
                        </div>
                        <div className="col-span-2 text-sm text-gray-500 flex items-center">
                          {doc.size}
                        </div>
                        <div className="col-span-2 flex items-center justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Download size={16} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Link size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>)}
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Usage Guidelines
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Preparation
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                          <li>
                            Ensure your 3D model is properly formatted as .STL
                            or .OBJ file
                          </li>
                          <li>
                            Check that your design meets the size constraints
                            (max 250mm x 210mm x 210mm)
                          </li>
                          <li>
                            Bring your own filament or purchase from the
                            Makerspace
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          During Use
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                          <li>
                            Do not leave the printer unattended during operation
                          </li>
                          <li>
                            Keep the area around the printer clear and clean
                          </li>
                          <li>Report any issues immediately to staff</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          After Use
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                          <li>Remove your print and any supports or rafts</li>
                          <li>Clean the print bed</li>
                          <li>Return the printer to its default state</li>
                          <li>Log your usage in the system</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Training Resources
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="text-sm font-medium text-gray-900">
                        Basic 3D Printing Workshop
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Next session: July 20, 2023
                      </div>
                      <button className="mt-2 w-full px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
                        Register
                      </button>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="text-sm font-medium text-gray-900">
                        Advanced Techniques
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Video tutorial (45 min)
                      </div>
                      <button className="mt-2 w-full px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
                        Watch Video
                      </button>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="text-sm font-medium text-gray-900">
                        Troubleshooting Guide
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Common issues and solutions
                      </div>
                      <button className="mt-2 w-full px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Resource Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      3D Printing
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Prototyping
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Hardware
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Makerspace
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Manufacturing
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Design
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Related Resources
                    </h4>
                    <div className="space-y-2">
                      <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                        Laser Cutter
                      </div>
                      <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                        CAD Workstation
                      </div>
                      <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                        Electronics Lab
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};
export default ResourceDetails;