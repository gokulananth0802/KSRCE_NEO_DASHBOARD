import React, { useState } from 'react';
import { User, Mail, Phone, FileText, Calendar, Tag, Edit, MessageSquare, UserPlus, UserMinus, ChevronDown, ChevronUp, BookOpen, Briefcase, Award, MapPin, Link, Linkedin, Twitter, Clock, Activity } from 'lucide-react';
import { useParams } from 'react-router-dom';
const personData = {
  id: '1',
  name: 'Sarah Chen',
  email: 'schen@university.edu',
  phone: '(123) 456-7890',
  role: 'Student',
  department: 'Computer Science',
  joinDate: '2022-09-01',
  bio: 'Computer Science student specializing in AI and machine learning. Passionate about using technology to solve environmental challenges and create sustainable solutions.',
  projects: [{
    id: '1',
    name: 'AI for Sustainable Agriculture',
    role: 'Team Lead',
    status: 'In Progress'
  }],
  skills: ['Machine Learning', 'Python', 'Data Analysis', 'TensorFlow', 'Sustainability'],
  education: [{
    degree: 'B.S. Computer Science',
    institution: 'University Tech',
    year: '2020-2024'
  }],
  events: [{
    id: '1',
    name: 'AI Workshop',
    date: '2023-07-11',
    status: 'Confirmed'
  }, {
    id: '2',
    name: 'Innovation Pitch Day',
    date: '2023-07-15',
    status: 'Registered'
  }],
  resources: [{
    id: '1',
    name: '3D Printer',
    date: '2023-07-15',
    time: '2:00 PM - 4:00 PM',
    status: 'Pending'
  }],
  mentors: [{
    id: '3',
    name: 'Dr. James Wilson',
    department: 'Electrical Engineering'
  }],
  socials: {
    github: 'sarahchen',
    linkedin: 'sarah-chen',
    twitter: 'sarahchen_tech'
  },
  activity: [{
    type: 'project',
    action: 'submitted',
    target: 'Project Proposal',
    date: '2023-07-08'
  }, {
    type: 'resource',
    action: 'booked',
    target: '3D Printer',
    date: '2023-07-07'
  }, {
    type: 'event',
    action: 'registered',
    target: 'AI Workshop',
    date: '2023-07-05'
  }, {
    type: 'project',
    action: 'updated',
    target: 'AI for Sustainable Agriculture',
    date: '2023-07-01'
  }]
};
const getStatusColor = status => {
  switch (status) {
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Idea':
      return 'bg-blue-100 text-blue-800';
    case 'Prototype':
      return 'bg-purple-100 text-purple-800';
    case 'Confirmed':
      return 'bg-green-100 text-green-800';
    case 'Registered':
      return 'bg-blue-100 text-blue-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
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
const getActivityIcon = type => {
  switch (type) {
    case 'project':
      return <FileText size={16} />;
    case 'resource':
      return <BookOpen size={16} />;
    case 'event':
      return <Calendar size={16} />;
    default:
      return <Activity size={16} />;
  }
};
const getActivityColor = type => {
  switch (type) {
    case 'project':
      return 'bg-blue-100 text-blue-600';
    case 'resource':
      return 'bg-purple-100 text-purple-600';
    case 'event':
      return 'bg-amber-100 text-amber-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};
const PersonDetails = () => {
  const {
    id
  } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showProjects, setShowProjects] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [showResources, setShowResources] = useState(true);
  return <div className="space-y-6">
      {/* Person header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start">
            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
              {personData.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {personData.name}
                </h2>
                <div className="flex items-center mt-1">
                  <span className={`px-2 py-1 text-xs rounded-full ₹{getRoleColor(personData.role)}`}>
                    {personData.role}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    {personData.department}
                  </span>
                </div>
              </div>
              <div className="flex mt-4 md:mt-0 space-x-3">
                <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                  <MessageSquare size={16} className="mr-2" />
                  Message
                </button>
                <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Mail size={16} className="text-gray-500 mr-2" />
                <a href={`mailto:₹{personData.email}`} className="text-sm text-blue-600 hover:underline">
                  {personData.email}
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">
                  {personData.phone}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Joined{' '}
                  {new Date(personData.joinDate).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
                </span>
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              {personData.socials.github && <a href={`https://github.com/₹{personData.socials.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
                  <div size={18} />
                </a>}
              {personData.socials.linkedin && <a href={`https://linkedin.com/in/₹{personData.socials.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
                  <Linkedin size={18} />
                </a>}
              {personData.socials.twitter && <a href={`https://twitter.com/₹{personData.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
                  <Twitter size={18} />
                </a>}
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('overview')}>
          Overview
        </button>
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'projects' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('projects')}>
          Projects
        </button>
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'events' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('events')}>
          Events & Resources
        </button>
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'activity' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('activity')}>
          Activity
        </button>
      </div>
      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === 'overview' && <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    About
                  </h3>
                  <p className="text-gray-700">{personData.bio}</p>
                </div>
                {/* Projects */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Projects
                    </h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowProjects(!showProjects)}>
                      {showProjects ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  {showProjects && <div className="space-y-3">
                      {personData.projects.map(project => <div key={project.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <div>
                            <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                              {project.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              Role: {project.role}
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ₹{getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>)}
                      {personData.projects.length === 0 && <div className="text-sm text-gray-500 italic">
                          No projects yet
                        </div>}
                      <button className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                        <FileText size={16} className="mr-2" />
                        View All Projects
                      </button>
                    </div>}
                </div>
                {/* Events */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Upcoming Events
                    </h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowEvents(!showEvents)}>
                      {showEvents ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  {showEvents && <div className="space-y-3">
                      {personData.events.map(event => <div key={event.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <div>
                            <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                              {event.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ₹{getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>)}
                      {personData.events.length === 0 && <div className="text-sm text-gray-500 italic">
                          No upcoming events
                        </div>}
                      <button className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                        <Calendar size={16} className="mr-2" />
                        View All Events
                      </button>
                    </div>}
                </div>
                {/* Resources */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Resource Bookings
                    </h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowResources(!showResources)}>
                      {showResources ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  {showResources && <div className="space-y-3">
                      {personData.resources.map(resource => <div key={resource.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <div>
                            <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                              {resource.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(resource.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}{' '}
                              • {resource.time}
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ₹{getStatusColor(resource.status)}`}>
                            {resource.status}
                          </span>
                        </div>)}
                      {personData.resources.length === 0 && <div className="text-sm text-gray-500 italic">
                          No resource bookings
                        </div>}
                      <button className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                        <BookOpen size={16} className="mr-2" />
                        View All Bookings
                      </button>
                    </div>}
                </div>
              </div>
              {/* Right column */}
              <div className="space-y-6">
                {/* Skills */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {personData.skills.map((skill, index) => <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center">
                        <Tag size={12} className="mr-1" />
                        {skill}
                      </span>)}
                  </div>
                </div>
                {/* Education */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Education
                  </h3>
                  <div className="space-y-3">
                    {personData.education.map((edu, index) => <div key={index} className="flex items-start">
                        <div className="p-1 bg-blue-100 rounded-md text-blue-600">
                          <Award size={16} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {edu.degree}
                          </div>
                          <div className="text-xs text-gray-500">
                            {edu.institution}, {edu.year}
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>
                {/* Mentors */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Mentors
                  </h3>
                  <div className="space-y-3">
                    {personData.mentors.map(mentor => <div key={mentor.id} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-medium">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {mentor.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {mentor.department}
                          </div>
                        </div>
                      </div>)}
                    {personData.mentors.length === 0 && <div className="text-sm text-gray-500 italic">
                        No mentors assigned
                      </div>}
                    <button className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <UserPlus size={16} className="mr-2" />
                      Assign Mentor
                    </button>
                  </div>
                </div>
                {/* Actions */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Actions
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <UserPlus size={16} className="mr-2" />
                      Add to Project
                    </button>
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <Calendar size={16} className="mr-2" />
                      Schedule Meeting
                    </button>
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-red-600 hover:bg-gray-50 flex items-center justify-center">
                      <UserMinus size={16} className="mr-2" />
                      Remove from Hub
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        {activeTab === 'projects' && <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Projects</h3>
              <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                <UserPlus size={16} className="mr-2" />
                Add to Project
              </button>
            </div>
            {personData.projects.length > 0 ? <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {personData.projects.map(project => <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                            {project.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs z-30">
                              SC
                            </div>
                            <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs z-20">
                              MJ
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            View Project
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Remove
                          </button>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div> : <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No Projects Yet
                </h3>
                <p className="text-gray-500 mb-4">
                  This person is not currently assigned to any projects
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Add to a Project
                </button>
              </div>}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Project History
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-500 text-center">
                  No past projects found
                </div>
              </div>
            </div>
          </div>}
        {activeTab === 'events' && <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Events</h3>
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    <Calendar size={16} className="mr-2" />
                    Register for Event
                  </button>
                </div>
                {personData.events.length > 0 ? <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Event Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
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
                        {personData.events.map(event => <tr key={event.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                                {event.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{getStatusColor(event.status)}`}>
                                {event.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">
                                View Event
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                Cancel
                              </button>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div> : <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                    <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No Upcoming Events
                    </h3>
                    <p className="text-gray-500 mb-4">
                      This person is not registered for any upcoming events
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Register for an Event
                    </button>
                  </div>}
              </div>
              <div className="lg:w-1/2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Resource Bookings
                  </h3>
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    <BookOpen size={16} className="mr-2" />
                    Book Resource
                  </button>
                </div>
                {personData.resources.length > 0 ? <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resource
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date & Time
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
                        {personData.resources.map(resource => <tr key={resource.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                                {resource.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(resource.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}{' '}
                              • {resource.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{getStatusColor(resource.status)}`}>
                                {resource.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">
                                View Details
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                Cancel
                              </button>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div> : <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                    <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No Resource Bookings
                    </h3>
                    <p className="text-gray-500 mb-4">
                      This person has not booked any resources
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Book a Resource
                    </button>
                  </div>}
              </div>
            </div>
          </div>}
        {activeTab === 'activity' && <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Activity
              </h3>
              <div className="flex items-center">
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>All Activity</option>
                  <option>Projects</option>
                  <option>Events</option>
                  <option>Resources</option>
                </select>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {personData.activity.map((item, index) => <div key={index} className="p-4 hover:bg-gray-50">
                    <div className="flex">
                      <div className={`p-2 rounded-md ₹{getActivityColor(item.type)}`}>
                        {getActivityIcon(item.type)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm text-gray-900">
                          <span className="font-medium">{personData.name}</span>{' '}
                          {item.action}{' '}
                          <span className="font-medium">{item.target}</span>
                        </div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock size={12} className="mr-1" />
                          {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800">
                Load More Activity
              </button>
            </div>
          </div>}
      </div>
    </div>;
};
export default PersonDetails;