import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronDown, Calendar as CalendarIcon, Clock, Users, CheckCircle, XCircle, AlertTriangle, MoreHorizontal, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
const resourcesData = [{
  id: '1',
  name: '3D Printer',
  type: 'Equipment',
  location: 'Makerspace',
  availability: 'Available',
  description: 'High-precision 3D printer for prototyping',
  bookings: [{
    id: 'b1',
    date: '2023-07-15',
    time: '2:00 PM - 4:00 PM',
    user: 'Team RoboHelp',
    status: 'Approved',
    project: 'Smart City Solutions'
  }, {
    id: 'b2',
    date: '2023-07-16',
    time: '10:00 AM - 12:00 PM',
    user: 'Sarah Chen',
    status: 'Pending',
    project: 'AI for Sustainable Agriculture'
  }]
}, {
  id: '2',
  name: 'VR Lab',
  type: 'Room',
  location: 'Tech Building, Room 204',
  availability: 'Booked',
  description: 'Virtual reality equipment and development space',
  bookings: [{
    id: 'b3',
    date: '2023-07-11',
    time: '1:00 PM - 5:00 PM',
    user: 'David Park',
    status: 'Approved',
    project: 'Quantum Computing Applications'
  }]
}, {
  id: '3',
  name: 'Electronics Lab',
  type: 'Room',
  location: 'Engineering Building, Room 105',
  availability: 'Available',
  description: 'Workspace with electronic components and testing equipment',
  bookings: [{
    id: 'b4',
    date: '2023-07-14',
    time: '9:00 AM - 11:00 AM',
    user: 'Team RoboHelp',
    status: 'Approved',
    project: 'Smart City Solutions'
  }]
}, {
  id: '4',
  name: 'Meeting Room A',
  type: 'Room',
  location: 'Innovation Hub',
  availability: 'Available',
  description: 'Conference room with projector and whiteboard',
  bookings: [{
    id: 'b5',
    date: '2023-07-12',
    time: '3:00 PM - 4:00 PM',
    user: 'Prof. Maria Garcia',
    status: 'Approved',
    project: 'Smart City Solutions'
  }]
}, {
  id: '5',
  name: 'Laser Cutter',
  type: 'Equipment',
  location: 'Makerspace',
  availability: 'Maintenance',
  description: 'Precision laser cutter for various materials',
  bookings: []
}];
const bookingRequestsData = [{
  id: 'r1',
  resource: '3D Printer',
  requester: 'Sarah Chen',
  role: 'Student',
  project: 'AI for Sustainable Agriculture',
  date: '2023-07-16',
  time: '10:00 AM - 12:00 PM',
  status: 'Pending',
  requestedAt: '2023-07-10 09:45 AM'
}, {
  id: 'r2',
  resource: 'Electronics Lab',
  requester: 'Alex Kumar',
  role: 'Student',
  project: 'Smart City Solutions',
  date: '2023-07-18',
  time: '2:00 PM - 5:00 PM',
  status: 'Pending',
  requestedAt: '2023-07-10 11:30 AM'
}, {
  id: 'r3',
  resource: 'VR Lab',
  requester: 'Dr. James Wilson',
  role: 'Mentor',
  project: 'Quantum Computing Applications',
  date: '2023-07-20',
  time: '1:00 PM - 3:00 PM',
  status: 'Pending',
  requestedAt: '2023-07-09 04:15 PM'
}];
const getAvailabilityColor = status => {
  switch (status) {
    case 'Available':
      return 'bg-green-100 text-green-800';
    case 'Booked':
      return 'bg-blue-100 text-blue-800';
    case 'Maintenance':
      return 'bg-yellow-100 text-yellow-800';
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
const getRoleColor = role => {
  switch (role) {
    case 'Student':
      return 'bg-blue-100 text-blue-800';
    case 'Mentor':
      return 'bg-purple-100 text-purple-800';
    case 'Corporate Partner':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
const Resources = () => {
  const [activeTab, setActiveTab] = useState('resources');
  const [searchTerm, setSearchTerm] = useState('');
  const [resourceTypeFilter, setResourceTypeFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const filteredResources = resourcesData.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) || resource.location.toLowerCase().includes(searchTerm.toLowerCase()) || resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = resourceTypeFilter === 'All' || resource.type === resourceTypeFilter;
    return matchesSearch && matchesType;
  });
  const resourceTypes = [...new Set(resourcesData.map(resource => resource.type))];
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Resources & Bookings
          </h2>
          <p className="text-gray-500 mt-1">
            Manage equipment, rooms, and booking requests
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <Plus size={18} className="mr-2" />
          New Booking
        </button>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button className={`py-3 px-6 font-medium text-sm ₹{activeTab === 'resources' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('resources')}>
          Resources
        </button>
        <button className={`py-3 px-6 font-medium text-sm ₹{activeTab === 'bookings' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('bookings')}>
          Booking Requests
        </button>
        <button className={`py-3 px-6 font-medium text-sm ₹{activeTab === 'schedule' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('schedule')}>
          Schedule
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Search and filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder={activeTab === 'resources' ? 'Search resources...' : 'Search bookings...'} className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md px-3 py-2" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={18} className="mr-2" />
                Filters
                <ChevronDown size={16} className="ml-2" />
              </button>
              {activeTab === 'resources' && <div>
                  <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={resourceTypeFilter} onChange={e => setResourceTypeFilter(e.target.value)}>
                    <option value="All">All Types</option>
                    {resourceTypes.map((type, index) => <option key={index} value={type}>
                        {type}
                      </option>)}
                  </select>
                </div>}
            </div>
          </div>
          {showFilters && <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeTab === 'resources' && <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <select className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">All Locations</option>
                      <option value="Makerspace">Makerspace</option>
                      <option value="Innovation Hub">Innovation Hub</option>
                      <option value="Tech Building">Tech Building</option>
                      <option value="Engineering Building">
                        Engineering Building
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Availability
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input type="checkbox" id="available" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                        <label htmlFor="available" className="ml-2 text-sm text-gray-700">
                          Available
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="booked" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                        <label htmlFor="booked" className="ml-2 text-sm text-gray-700">
                          Booked
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="maintenance" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                        <label htmlFor="maintenance" className="ml-2 text-sm text-gray-700">
                          Maintenance
                        </label>
                      </div>
                    </div>
                  </div>
                </>}
              {activeTab === 'bookings' && <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input type="checkbox" id="pending" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                        <label htmlFor="pending" className="ml-2 text-sm text-gray-700">
                          Pending
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="approved" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                        <label htmlFor="approved" className="ml-2 text-sm text-gray-700">
                          Approved
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="rejected" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                        <label htmlFor="rejected" className="ml-2 text-sm text-gray-700">
                          Rejected
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Requester Role
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input type="checkbox" id="student" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                        <label htmlFor="student" className="ml-2 text-sm text-gray-700">
                          Student
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="mentor" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                        <label htmlFor="mentor" className="ml-2 text-sm text-gray-700">
                          Mentor
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="partner" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                        <label htmlFor="partner" className="ml-2 text-sm text-gray-700">
                          Partner
                        </label>
                      </div>
                    </div>
                  </div>
                </>}
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
            </div>}
        </div>
        {activeTab === 'resources' ? <div>
            {/* Resources list */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resource
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Availability
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Booking
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredResources.map(resource => <tr key={resource.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          <Link to={`/resources/₹{resource.id}`} className="hover:text-blue-600">
                            {resource.name}
                          </Link>
                        </div>
                        <div className="text-sm text-gray-500">
                          {resource.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resource.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resource.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{getAvailabilityColor(resource.availability)}`}>
                          {resource.availability}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {resource.bookings.length > 0 ? <div className="text-sm text-gray-500">
                            <div className="font-medium">
                              {new Date(resource.bookings[0].date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                            </div>
                            <div>{resource.bookings[0].time}</div>
                          </div> : <span className="text-sm text-gray-500">
                            No upcoming bookings
                          </span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link to={`/resources/₹{resource.id}`} className="text-blue-600 hover:text-blue-900">
                            <FileText size={18} />
                          </Link>
                          <button className="text-blue-600 hover:text-blue-900">
                            <CalendarIcon size={18} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div> : activeTab === 'bookings' ? <div>
            {/* Booking requests */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resource
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requester
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requested At
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookingRequestsData.map(request => <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {request.resource}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {request.requester}
                          </div>
                          <span className={`ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{getRoleColor(request.role)}`}>
                            {request.role}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                          {request.project}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(request.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{getBookingStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.requestedAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-green-600 hover:text-green-900">
                            <CheckCircle size={18} />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <XCircle size={18} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div> : <div className="p-4">
            {/* Schedule view */}
            <div className="text-center p-8">
              <CalendarIcon size={48} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">
                Resource Schedule
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                View and manage all resource bookings in calendar view
              </p>
              <p className="text-sm text-gray-500 mt-4">
                This feature is coming soon!
              </p>
            </div>
          </div>}
      </div>
    </div>;
};
export default Resources;