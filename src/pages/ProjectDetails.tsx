import React, { useState, Component } from 'react';
import { Calendar, Users, FileText, DollarSign, Clock, Tag, MessageSquare, Paperclip, Link, Edit, ChevronDown, ChevronRight, Plus, Check, X, Activity, Trash2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
const projectData = {
  id: '1',
  title: 'AI for Sustainable Agriculture',
  status: 'In Progress',
  description: 'Developing AI-powered sensors and data analysis tools to optimize water usage, reduce pesticide application, and increase crop yields in sustainable farming practices.',
  team: [{
    id: '1',
    name: 'Sarah Chen',
    role: 'Team Lead',
    image: 'https://randomuser.me/api/portraits/women/12.jpg'
  }, {
    id: '2',
    name: 'Mike Johnson',
    role: 'Research Assistant',
    image: 'https://randomuser.me/api/portraits/men/45.jpg'
  }],
  mentor: {
    id: '3',
    name: 'Dr. James Wilson',
    role: 'Faculty Mentor',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  timeline: {
    startDate: '2023-05-15',
    endDate: '2023-12-15',
    milestones: [{
      id: '1',
      title: 'Research Phase',
      date: '2023-06-30',
      status: 'completed'
    }, {
      id: '2',
      title: 'Prototype Development',
      date: '2023-09-15',
      status: 'in-progress'
    }, {
      id: '3',
      title: 'Testing Phase',
      date: '2023-10-30',
      status: 'upcoming'
    }, {
      id: '4',
      title: 'Final Implementation',
      date: '2023-12-15',
      status: 'upcoming'
    }]
  },
  funding: {
    requested: 3500,
    approved: 2000,
    spent: 1200,
    remaining: 800,
    applications: [{
      id: '1',
      date: '2023-06-15',
      amount: 3500,
      status: 'approved',
      notes: 'Approved with reduced budget'
    }]
  },
  resources: [{
    id: '1',
    name: 'Electronics Lab',
    type: 'Room',
    bookings: [{
      date: '2023-07-14',
      time: '9:00 AM - 11:00 AM'
    }]
  }, {
    id: '2',
    name: '3D Printer',
    type: 'Equipment',
    bookings: [{
      date: '2023-07-15',
      time: '2:00 PM - 4:00 PM'
    }]
  }],
  documents: [{
    id: '1',
    name: 'Project Proposal.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadDate: '2023-05-15'
  }, {
    id: '2',
    name: 'Research Findings.docx',
    type: 'Word',
    size: '1.8 MB',
    uploadDate: '2023-06-25'
  }, {
    id: '3',
    name: 'Budget Breakdown.xlsx',
    type: 'Excel',
    size: '945 KB',
    uploadDate: '2023-06-15'
  }],
  updates: [{
    id: '1',
    author: 'Sarah Chen',
    date: '2023-07-08',
    content: "We've completed the initial sensor calibration and collected baseline data from the test field. Results look promising, with the sensors accurately detecting soil moisture levels within 2% margin of error.",
    comments: [{
      id: '1',
      author: 'Dr. James Wilson',
      date: '2023-07-08',
      content: 'Great progress! Have you analyzed the power consumption yet?'
    }, {
      id: '2',
      author: 'Sarah Chen',
      date: '2023-07-09',
      content: 'Yes, the sensors are averaging 0.8W, which is within our target range.'
    }]
  }, {
    id: '2',
    author: 'Mike Johnson',
    date: '2023-06-20',
    content: 'Completed the literature review and identified three key algorithms that we can adapt for our soil analysis model. Will begin implementation next week.',
    comments: []
  }],
  tags: ['Agriculture', 'AI', 'Sustainability', 'IoT']
};
const ProjectDetails = () => {
  const {
    id
  } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewUpdate, setShowNewUpdate] = useState(false);
  const [newUpdateContent, setNewUpdateContent] = useState('');
  const [expandedMilestones, setExpandedMilestones] = useState(true);
  const handlePostUpdate = () => {
    if (newUpdateContent.trim()) {
      // In a real app, this would post the update to the database
      console.log('Posting update:', newUpdateContent);
      setNewUpdateContent('');
      setShowNewUpdate(false);
    }
  };
  const toggleMilestones = () => {
    setExpandedMilestones(!expandedMilestones);
  };
  const getStatusColor = status => {
    switch (status) {
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Prototype':
        return 'bg-purple-100 text-purple-800';
      case 'Idea':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getMilestoneStatusColor = status => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getMilestoneIcon = status => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} />;
      case 'in-progress':
        return <Clock size={16} />;
      case 'upcoming':
        return <Circle size={16} />;
      default:
        return <Circle size={16} />;
    }
  };
  return <div className="space-y-6">
      {/* Project header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {projectData.title}
            </h2>
            <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ₹{getStatusColor(projectData.status)}`}>
              {projectData.status}
            </span>
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Calendar size={16} className="mr-1" />
            <span>
              Started{' '}
              {new Date(projectData.timeline.startDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
            </span>
            <span className="mx-2">•</span>
            <Clock size={16} className="mr-1" />
            <span>
              {Math.round((new Date(projectData.timeline.endDate) - new Date()) / (1000 * 60 * 60 * 24))}{' '}
              days remaining
            </span>
          </div>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-3">
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            <Edit size={16} className="mr-2" />
            Edit Project
          </button>
          <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            Add Update
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('overview')}>
          Overview
        </button>
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'updates' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('updates')}>
          Updates & Discussion
        </button>
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'documents' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('documents')}>
          Documents
        </button>
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'funding' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('funding')}>
          Funding
        </button>
        <button className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'resources' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('resources')}>
          Resources
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
                    Project Description
                  </h3>
                  <p className="text-gray-700">{projectData.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {projectData.tags.map((tag, index) => <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center">
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>)}
                  </div>
                </div>
                {/* Milestones */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Milestones
                    </h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={toggleMilestones}>
                      {expandedMilestones ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                  </div>
                  {expandedMilestones && <div className="space-y-4">
                      {projectData.timeline.milestones.map(milestone => <div key={milestone.id} className="flex items-start">
                          <div className={`p-1 rounded-full ₹{getMilestoneStatusColor(milestone.status)}`}>
                            {getMilestoneIcon(milestone.status)}
                          </div>
                          <div className="ml-3">
                            <div className="flex items-center">
                              <h4 className="text-sm font-medium text-gray-900">
                                {milestone.title}
                              </h4>
                              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ₹{getMilestoneStatusColor(milestone.status)}`}>
                                {milestone.status.replace('-', ' ')}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Due:{' '}
                              {new Date(milestone.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                            </div>
                          </div>
                        </div>)}
                      <button className="text-blue-600 text-sm hover:text-blue-800 flex items-center mt-2">
                        <Plus size={16} className="mr-1" />
                        Add Milestone
                      </button>
                    </div>}
                </div>
                {/* Latest update */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Latest Update
                    </h3>
                    <button className="text-blue-600 text-sm hover:text-blue-800" onClick={() => setActiveTab('updates')}>
                      View all updates
                    </button>
                  </div>
                  {projectData.updates.length > 0 && <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img src="https://randomuser.me/api/portraits/women/12.jpg" alt={projectData.updates[0].author} className="w-8 h-8 rounded-full object-cover" />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {projectData.updates[0].author}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(projectData.updates[0].date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-700">
                        {projectData.updates[0].content}
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <MessageSquare size={16} className="mr-1" />
                          {projectData.updates[0].comments.length} comments
                        </div>
                        <button className="text-blue-600 text-sm hover:text-blue-800">
                          Read more
                        </button>
                      </div>
                    </div>}
                </div>
              </div>
              {/* Right column */}
              <div className="space-y-6">
                {/* Team */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Team
                  </h3>
                  <div className="space-y-3">
                    {projectData.team.map(member => <div key={member.id} className="flex items-center">
                        <img src={member.image} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {member.role}
                          </div>
                        </div>
                      </div>)}
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex items-center">
                        <img src={projectData.mentor.image} alt={projectData.mentor.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {projectData.mentor.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {projectData.mentor.role}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <Plus size={16} className="mr-2" />
                      Add Team Member
                    </button>
                  </div>
                </div>
                {/* Funding */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Funding
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Requested:</span>
                      <span className="text-sm font-medium text-gray-900">
                        ₹{projectData.funding.requested.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Approved:</span>
                      <span className="text-sm font-medium text-gray-900">
                        ₹{projectData.funding.approved.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Spent:</span>
                      <span className="text-sm font-medium text-gray-900">
                        ₹{projectData.funding.spent.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Remaining:</span>
                      <span className="text-sm font-medium text-green-600">
                        ₹{projectData.funding.remaining.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="text-xs text-gray-500 mb-1">
                        Budget utilization
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{
                      width: `₹{projectData.funding.spent / projectData.funding.approved * 100}%`
                    }}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        {Math.round(projectData.funding.spent / projectData.funding.approved * 100)}
                        % used
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-3 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center" onClick={() => setActiveTab('funding')}>
                    <DollarSign size={16} className="mr-2" />
                    View Funding Details
                  </button>
                </div>
                {/* Resources */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Resources
                  </h3>
                  <div className="space-y-3">
                    {projectData.resources.map(resource => <div key={resource.id} className="flex justify-between items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {resource.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {resource.type}
                          </div>
                        </div>
                        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {resource.bookings[0].date}
                        </div>
                      </div>)}
                    <button className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center" onClick={() => setActiveTab('resources')}>
                      <Plus size={16} className="mr-2" />
                      Book Resources
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        {activeTab === 'updates' && <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Updates feed */}
              <div className="lg:w-2/3 space-y-6">
                {/* New update form */}
                {showNewUpdate ? <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Current user" className="w-8 h-8 rounded-full object-cover" />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          Post an update
                        </div>
                      </div>
                    </div>
                    <textarea className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={4} placeholder="Share project progress, challenges, or achievements..." value={newUpdateContent} onChange={e => setNewUpdateContent(e.target.value)}></textarea>
                    <div className="flex justify-between mt-3">
                      <button className="flex items-center text-gray-500 hover:text-gray-700">
                        <Paperclip size={16} className="mr-1" />
                        Attach files
                      </button>
                      <div>
                        <button className="px-3 py-1 text-gray-500 hover:text-gray-700" onClick={() => setShowNewUpdate(false)}>
                          Cancel
                        </button>
                        <button className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handlePostUpdate}>
                          Post Update
                        </button>
                      </div>
                    </div>
                  </div> : <button className="w-full border border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:text-gray-700 hover:border-gray-400" onClick={() => setShowNewUpdate(true)}>
                    <div className="flex items-center justify-center">
                      <Plus size={18} className="mr-2" />
                      Post a new update
                    </div>
                  </button>}
                {/* Updates list */}
                <div className="space-y-6">
                  {projectData.updates.map(update => <div key={update.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img src="https://randomuser.me/api/portraits/women/12.jpg" alt={update.author} className="w-8 h-8 rounded-full object-cover" />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {update.author}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(update.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                      <div className="mt-3 text-sm text-gray-700">
                        {update.content}
                      </div>
                      {/* Comments */}
                      <div className="mt-4 border-t border-gray-100 pt-3">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <MessageSquare size={16} className="mr-1" />
                          {update.comments.length} comments
                        </div>
                        <div className="space-y-3">
                          {update.comments.map(comment => <div key={comment.id} className="flex">
                              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt={comment.author} className="w-6 h-6 rounded-full object-cover" />
                              <div className="ml-2 flex-1">
                                <div className="bg-gray-50 rounded-lg p-2">
                                  <div className="flex justify-between items-center">
                                    <div className="text-xs font-medium text-gray-900">
                                      {comment.author}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {new Date(comment.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-700 mt-1">
                                    {comment.content}
                                  </div>
                                </div>
                              </div>
                            </div>)}
                          {/* Comment form */}
                          <div className="flex">
                            <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Current user" className="w-6 h-6 rounded-full object-cover" />
                            <div className="ml-2 flex-1">
                              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Add a comment..." />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
              {/* Sidebar */}
              <div className="lg:w-1/3 space-y-6">
                {/* Activity log */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Activity Log
                  </h3>
                  <div className="space-y-3">
                    <div className="flex">
                      <div className="flex-shrink-0 p-1 bg-blue-100 rounded-full">
                        <FileText size={14} className="text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm text-gray-900">
                          Sarah uploaded "Research Findings.docx"
                        </div>
                        <div className="text-xs text-gray-500">2 days ago</div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0 p-1 bg-green-100 rounded-full">
                        <Check size={14} className="text-green-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm text-gray-900">
                          Research Phase milestone completed
                        </div>
                        <div className="text-xs text-gray-500">1 week ago</div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0 p-1 bg-purple-100 rounded-full">
                        <Users size={14} className="text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm text-gray-900">
                          Dr. James Wilson joined as mentor
                        </div>
                        <div className="text-xs text-gray-500">2 weeks ago</div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0 p-1 bg-yellow-100 rounded-full">
                        <DollarSign size={14} className="text-yellow-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm text-gray-900">
                          Funding application approved (₹2,000)
                        </div>
                        <div className="text-xs text-gray-500">3 weeks ago</div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-3 text-sm text-blue-600 hover:text-blue-800">
                    View all activity
                  </button>
                </div>
                {/* Upcoming */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Upcoming
                  </h3>
                  <div className="space-y-3">
                    <div className="flex">
                      <div className="flex-shrink-0 p-1 bg-blue-100 rounded-full">
                        <Calendar size={14} className="text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm text-gray-900">
                          Team Meeting
                        </div>
                        <div className="text-xs text-gray-500">
                          Tomorrow, 2:00 PM
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0 p-1 bg-yellow-100 rounded-full">
                        <Clock size={14} className="text-yellow-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm text-gray-900">
                          Prototype Development Deadline
                        </div>
                        <div className="text-xs text-gray-500">
                          September 15, 2023
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0 p-1 bg-green-100 rounded-full">
                        <Users size={14} className="text-green-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm text-gray-900">
                          Progress Presentation
                        </div>
                        <div className="text-xs text-gray-500">
                          September 20, 2023
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        {activeTab === 'documents' && <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-3/4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Project Documents
                  </h3>
                  <div className="flex items-center">
                    <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                      <Link size={16} className="mr-2" />
                      Get Shareable Link
                    </button>
                    <button className="ml-2 flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                      <Plus size={16} className="mr-2" />
                      Upload Document
                    </button>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase">
                    <div className="col-span-6">Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-2">Date</div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {projectData.documents.map(doc => <div key={doc.id} className="grid grid-cols-12 px-4 py-3 hover:bg-gray-50">
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
                        <div className="col-span-2 text-sm text-gray-500 flex items-center justify-between">
                          <span>
                            {new Date(doc.uploadDate).toLocaleDateString('en-US', {
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
              </div>
              <div className="lg:w-1/4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Document Storage
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Used</span>
                      <span className="text-gray-900 font-medium">5.2 MB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{
                    width: '26%'
                  }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>5.2 MB used</span>
                      <span>20 MB total</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        {activeTab === 'funding' && <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Funding Details
                  </h3>
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    <Plus size={16} className="mr-2" />
                    New Funding Request
                  </button>
                </div>
                {/* Funding summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-500">Requested</div>
                    <div className="text-xl font-bold text-gray-900 mt-1">
                      ₹{projectData.funding.requested.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-500">Approved</div>
                    <div className="text-xl font-bold text-gray-900 mt-1">
                      ₹{projectData.funding.approved.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-500">Spent</div>
                    <div className="text-xl font-bold text-gray-900 mt-1">
                      ₹{projectData.funding.spent.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-500">Remaining</div>
                    <div className="text-xl font-bold text-green-600 mt-1">
                      ₹{projectData.funding.remaining.toLocaleString()}
                    </div>
                  </div>
                </div>
                {/* Budget progress */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                  <h4 className="text-base font-medium text-gray-900 mb-3">
                    Budget Utilization
                  </h4>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-blue-600 h-4 rounded-full" style={{
                  width: `₹{projectData.funding.spent / projectData.funding.approved * 100}%`
                }}></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">
                        ₹{projectData.funding.spent.toLocaleString()}
                      </span>{' '}
                      spent
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">
                        {Math.round(projectData.funding.spent / projectData.funding.approved * 100)}
                        %
                      </span>{' '}
                      of budget
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">
                        ₹{projectData.funding.remaining.toLocaleString()}
                      </span>{' '}
                      remaining
                    </div>
                  </div>
                </div>
                {/* Funding applications */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                    <h4 className="text-base font-medium text-gray-900">
                      Funding Applications
                    </h4>
                  </div>
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Notes
                            </th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {projectData.funding.applications.map(app => <tr key={app.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm text-gray-900">
                                {new Date(app.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                                ₹{app.amount.toLocaleString()}
                              </td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ₹{app.status === 'approved' ? 'bg-green-100 text-green-800' : app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : app.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {app.notes}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                  View Details
                                </button>
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Expenses Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">Equipment</span>
                        <span className="text-gray-900 font-medium">₹750</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{
                      width: '62.5%'
                    }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">Materials</span>
                        <span className="text-gray-900 font-medium">₹320</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-purple-600 h-1.5 rounded-full" style={{
                      width: '26.7%'
                    }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">Software</span>
                        <span className="text-gray-900 font-medium">₹130</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-green-600 h-1.5 rounded-full" style={{
                      width: '10.8%'
                    }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Recent Transactions
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Sensor Components
                        </div>
                        <div className="text-xs text-gray-500">
                          July 5, 2023
                        </div>
                      </div>
                      <div className="text-sm text-red-600 font-medium">
                        -₹420
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Data Analysis Software
                        </div>
                        <div className="text-xs text-gray-500">
                          June 28, 2023
                        </div>
                      </div>
                      <div className="text-sm text-red-600 font-medium">
                        -₹130
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Circuit Boards
                        </div>
                        <div className="text-xs text-gray-500">
                          June 22, 2023
                        </div>
                      </div>
                      <div className="text-sm text-red-600 font-medium">
                        -₹250
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Initial Funding
                        </div>
                        <div className="text-xs text-gray-500">
                          June 20, 2023
                        </div>
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        +₹2,000
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-3 text-sm text-blue-600 hover:text-blue-800">
                    View all transactions
                  </button>
                </div>
              </div>
            </div>
          </div>}
        {activeTab === 'resources' && <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Project Resources
                  </h3>
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    <Plus size={16} className="mr-2" />
                    Book Resource
                  </button>
                </div>
                {/* Current bookings */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
                  <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                    <h4 className="text-base font-medium text-gray-900">
                      Current Bookings
                    </h4>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {projectData.resources.map(resource => <div key={resource.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-md ₹{resource.type === 'Room' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                              {resource.type === 'Room' ? <Users size={18} /> : <Laptop size={18} />}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {resource.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {resource.type}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {resource.bookings.map((booking, index) => <div key={index}>
                                <span className="font-medium">
                                  {booking.date}
                                </span>{' '}
                                • {booking.time}
                              </div>)}
                          </div>
                          <div className="flex space-x-2">
                            <button className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
                              Modify
                            </button>
                            <button className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>
                {/* Available resources */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h4 className="text-base font-medium text-gray-900">
                      Available Resources
                    </h4>
                    <div className="flex items-center">
                      <input type="date" className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Resource
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Location
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Availability
                            </th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <div className="p-1.5 bg-blue-100 rounded-md text-blue-600">
                                  <Users size={16} />
                                </div>
                                <div className="ml-2">
                                  <div className="text-sm font-medium text-gray-900">
                                    Meeting Room A
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              Room
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              Innovation Hub
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Available
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Book Now
                              </button>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <div className="p-1.5 bg-purple-100 rounded-md text-purple-600">
                                  <Laptop size={16} />
                                </div>
                                <div className="ml-2">
                                  <div className="text-sm font-medium text-gray-900">
                                    Laser Cutter
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              Equipment
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              Makerspace
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Maintenance
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button className="text-gray-400 cursor-not-allowed text-sm font-medium">
                                Unavailable
                              </button>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <div className="p-1.5 bg-blue-100 rounded-md text-blue-600">
                                  <Users size={16} />
                                </div>
                                <div className="ml-2">
                                  <div className="text-sm font-medium text-gray-900">
                                    Electronics Lab
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              Room
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              Engineering Building
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Available
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Book Now
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Resource Calendar
                  </h3>
                  <div className="text-center p-4 border border-dashed border-gray-300 rounded-lg">
                    <CalendarIcon size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Resource calendar view is coming soon
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Resource Usage
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">Electronics Lab</span>
                        <span className="text-gray-900 font-medium">
                          4 hours
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{
                      width: '40%'
                    }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">3D Printer</span>
                        <span className="text-gray-900 font-medium">
                          2 hours
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-purple-600 h-1.5 rounded-full" style={{
                      width: '20%'
                    }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">Meeting Room</span>
                        <span className="text-gray-900 font-medium">
                          1 hour
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-green-600 h-1.5 rounded-full" style={{
                      width: '10%'
                    }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      This project has used{' '}
                      <span className="font-medium">7 hours</span> of resource
                      time this month.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};
export default ProjectDetails;