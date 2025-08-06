import React, { useState, Component } from 'react';
import { ArrowLeft, Calendar, Clock, DollarSign, Download, Edit, FileText, Link as LinkIcon, MoreHorizontal, Paperclip, Plus, Tag, Users, CheckCircle, XCircle, AlertTriangle, MessageSquare } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
// Mock data for a funding application
const fundingData = {
  id: '1',
  project: 'AI for Sustainable Agriculture',
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
  requestedAmount: 3500,
  approvedAmount: 2000,
  status: 'Approved',
  dateSubmitted: '2023-06-15',
  dateReviewed: '2023-06-20',
  description: 'Funding for AI-powered sensors and data analysis tools for sustainable farming practices. The project aims to reduce water usage and pesticide application while increasing crop yields through machine learning algorithms that analyze soil conditions and plant health.',
  category: 'Research',
  timeline: {
    startDate: '2023-07-01',
    endDate: '2023-12-31',
    milestones: [{
      id: '1',
      title: 'Initial Equipment Purchase',
      date: '2023-07-15',
      amount: 1200,
      status: 'completed'
    }, {
      id: '2',
      title: 'Software Development',
      date: '2023-09-01',
      amount: 500,
      status: 'pending'
    }, {
      id: '3',
      title: 'Field Testing',
      date: '2023-10-15',
      amount: 300,
      status: 'pending'
    }]
  },
  budget: {
    categories: [{
      name: 'Equipment',
      amount: 1500,
      spent: 1200
    }, {
      name: 'Software',
      amount: 500,
      spent: 0
    }, {
      name: 'Travel',
      amount: 300,
      spent: 0
    }, {
      name: 'Materials',
      amount: 700,
      spent: 0
    }]
  },
  documents: [{
    id: '1',
    name: 'Funding Application.pdf',
    type: 'PDF',
    size: '1.2 MB',
    uploadDate: '2023-06-15'
  }, {
    id: '2',
    name: 'Budget Breakdown.xlsx',
    type: 'Excel',
    size: '945 KB',
    uploadDate: '2023-06-15'
  }, {
    id: '3',
    name: 'Project Timeline.pdf',
    type: 'PDF',
    size: '825 KB',
    uploadDate: '2023-06-15'
  }],
  updates: [{
    id: '1',
    author: 'Sarah Chen',
    date: '2023-07-05',
    content: 'Equipment has been purchased and we are beginning setup of the sensor network. Initial testing looks promising.',
    comments: [{
      id: '1',
      author: 'Funding Committee',
      date: '2023-07-06',
      content: 'Great progress! Please submit receipts for the equipment purchases.'
    }]
  }, {
    id: '2',
    author: 'Mike Johnson',
    date: '2023-06-25',
    content: 'Thank you for approving our funding request. We will be placing orders for equipment next week.',
    comments: []
  }],
  reviewNotes: 'Approved with reduced budget. Focus on core sensor technology first.'
};

// const getStatusColor = status => {
//   switch (status) {
//     case 'Draft':
//       return 'bg-gray-100 text-gray-800';
//     case 'Submitted':
//       return 'bg-blue-100 text-blue-800';
//     case 'Reviewed':
//       return 'bg-yellow-100 text-yellow-800';
//     case 'Approved':
//       return 'bg-green-100 text-green-800';
//     case 'Declined':
//       return 'bg-red-100 text-red-800';
//     default:
//       return 'bg-gray-100 text-gray-800';
//   }
// };
// const getMilestoneStatusColor = status => {
//   switch (status) {
//     case 'completed':
//       return 'bg-green-100 text-green-800';
//     case 'in-progress':
//       return 'bg-yellow-100 text-yellow-800';
//     case 'pending':
//       return 'bg-blue-100 text-blue-800';
//     default:
//       return 'bg-gray-100 text-gray-800';
//   }
// };

const FundingDetails = () => {
  const {
    id
  } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewUpdate, setShowNewUpdate] = useState(false);
  const [newUpdateContent, setNewUpdateContent] = useState('');
  const handlePostUpdate = () => {
    if (newUpdateContent.trim()) {
      // In a real app, this would post the update to the database
      console.log('Posting update:', newUpdateContent);
      setNewUpdateContent('');
      setShowNewUpdate(false);
    }
  };
  return (
    <div className="space-y-6">
      {/* Funding header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <div className="flex items-center">
            <Link
              to="/funding"
              className="mr-3 p-1 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft size={20} className="text-gray-500" />
            </Link>
            <h2 className="text-2xl font-bold text-gray-800">
              {fundingData.project}
            </h2>
            <span
              className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ₹{getStatusColor(fundingData.status)}`}
            >
              {fundingData.status}
            </span>
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Calendar size={16} className="mr-1" />
            <span>
              Submitted{" "}
              {new Date(fundingData.dateSubmitted).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="mx-2">•</span>
            <Tag size={16} className="mr-1" />
            <span>{fundingData.category}</span>
          </div>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-3">
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            <Edit size={16} className="mr-2" />
            Edit Application
          </button>
          <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            <Download size={16} className="mr-2" />
            Download Report
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button
          className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'budget' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab("budget")}
        >
          Budget & Timeline
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'updates' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab("updates")}
        >
          Updates
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm whitespace-nowrap ₹{activeTab === 'documents' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab("documents")}
        >
          Documents
        </button>
      </div>
      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === "overview" && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Project Description
                  </h3>
                  <p className="text-gray-700">{fundingData.description}</p>
                </div>
                {/* Team */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Project Team
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fundingData.team.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center p-3 bg-gray-50 rounded-md"
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {member.role}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Review Notes */}
                {fundingData.reviewNotes && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex">
                      <AlertTriangle
                        size={20}
                        className="text-yellow-600 flex-shrink-0"
                      />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Review Notes
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          {fundingData.reviewNotes}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Latest update */}
                {fundingData.updates.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        Latest Update
                      </h3>
                      <button
                        className="text-blue-600 text-sm hover:text-blue-800"
                        onClick={() => setActiveTab("updates")}
                      >
                        View all updates
                      </button>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src="https://randomuser.me/api/portraits/women/12.jpg"
                            alt={fundingData.updates[0].author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {fundingData.updates[0].author}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(
                                fundingData.updates[0].date
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-700">
                        {fundingData.updates[0].content}
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <MessageSquare size={16} className="mr-1" />
                          {fundingData.updates[0].comments.length} comments
                        </div>
                        <button
                          className="text-blue-600 text-sm hover:text-blue-800"
                          onClick={() => setActiveTab("updates")}
                        >
                          Read more
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Right column */}
              <div className="space-y-6">
                {/* Funding Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Funding Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Requested:</span>
                      <span className="text-sm font-medium text-gray-900">
                        ₹{fundingData.requestedAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Approved:</span>
                      <span className="text-sm font-medium text-gray-900">
                        ₹{fundingData.approvedAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Spent:</span>
                      <span className="text-sm font-medium text-gray-900">
                        ₹
                        {fundingData.budget.categories
                          .reduce(
                            (total, category) => total + category.spent,
                            0
                          )
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Remaining:</span>
                      <span className="text-sm font-medium text-green-600">
                        ₹
                        {(
                          fundingData.approvedAmount -
                          fundingData.budget.categories.reduce(
                            (total, category) => total + category.spent,
                            0
                          )
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `₹{fundingData.budget.categories.reduce((total, category) => total + category.spent, 0) / fundingData.approvedAmount * 100}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>
                          {Math.round(
                            (fundingData.budget.categories.reduce(
                              (total, category) => total + category.spent,
                              0
                            ) /
                              fundingData.approvedAmount) *
                              100
                          )}
                          % used
                        </span>
                        <span>
                          ₹
                          {(
                            fundingData.approvedAmount -
                            fundingData.budget.categories.reduce(
                              (total, category) => total + category.spent,
                              0
                            )
                          ).toLocaleString()}{" "}
                          remaining
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Timeline */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Timeline
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Start Date:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(
                          fundingData.timeline.startDate
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">End Date:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(
                          fundingData.timeline.endDate
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="pt-3 mt-2 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Upcoming Milestones
                      </h4>
                      {fundingData.timeline.milestones
                        .filter((m) => m.status !== "completed")
                        .slice(0, 2)
                        .map((milestone) => (
                          <div key={milestone.id} className="mb-2">
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-900">
                                {milestone.title}
                              </div>
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full ₹{getMilestoneStatusColor(milestone.status)}`}
                              >
                                ₹{milestone.amount.toLocaleString()}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Due:{" "}
                              {new Date(milestone.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </div>
                          </div>
                        ))}
                      <button
                        className="text-sm text-blue-600 hover:text-blue-800 mt-1"
                        onClick={() => setActiveTab("budget")}
                      >
                        View all milestones
                      </button>
                    </div>
                  </div>
                </div>
                {/* Documents */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Documents
                  </h3>
                  <div className="space-y-2">
                    {fundingData.documents.slice(0, 2).map((doc) => (
                      <div
                        key={doc.id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <div className="p-1.5 bg-blue-100 rounded-md text-blue-600">
                            <FileText size={14} />
                          </div>
                          <div className="ml-2 text-sm text-blue-600 hover:underline cursor-pointer">
                            {doc.name}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{doc.size}</div>
                      </div>
                    ))}
                    {fundingData.documents.length > 2 && (
                      <button
                        className="text-sm text-blue-600 hover:text-blue-800 mt-1"
                        onClick={() => setActiveTab("documents")}
                      >
                        View all documents
                      </button>
                    )}
                  </div>
                </div>
                {/* Actions */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Actions
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <Plus size={16} className="mr-2" />
                      Add Expense
                    </button>
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <MessageSquare size={16} className="mr-2" />
                      Contact Committee
                    </button>
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-red-600 hover:bg-gray-50 flex items-center justify-center">
                      <AlertTriangle size={16} className="mr-2" />
                      Report Issue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "budget" && (
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Budget Breakdown
                  </h3>
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    <Plus size={16} className="mr-2" />
                    Add Expense
                  </button>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Allocated
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Spent
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Remaining
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Progress
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {fundingData.budget.categories.map((category, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {category.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{category.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{category.spent.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹
                            {(
                              category.amount - category.spent
                            ).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `₹{category.spent / category.amount * 100}%`,
                                }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Funding Milestones
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Milestone
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Due Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Amount
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {fundingData.timeline.milestones.map((milestone) => (
                          <tr key={milestone.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {milestone.title}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(milestone.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                              ₹{milestone.amount.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{getMilestoneStatusColor(milestone.status)}`}
                              >
                                {milestone.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900">
                                Update Status
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Budget Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Total Requested:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        ₹{fundingData.requestedAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Total Approved:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        ₹{fundingData.approvedAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Total Spent:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        ₹
                        {fundingData.budget.categories
                          .reduce(
                            (total, category) => total + category.spent,
                            0
                          )
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Total Remaining:
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        ₹
                        {(
                          fundingData.approvedAmount -
                          fundingData.budget.categories.reduce(
                            (total, category) => total + category.spent,
                            0
                          )
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `₹{fundingData.budget.categories.reduce((total, category) => total + category.spent, 0) / fundingData.approvedAmount * 100}%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        {Math.round(
                          (fundingData.budget.categories.reduce(
                            (total, category) => total + category.spent,
                            0
                          ) /
                            fundingData.approvedAmount) *
                            100
                        )}
                        % of budget used
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Recent Expenses
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
                        -₹850
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Microcontrollers
                        </div>
                        <div className="text-xs text-gray-500">
                          July 3, 2023
                        </div>
                      </div>
                      <div className="text-sm text-red-600 font-medium">
                        -₹350
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
          </div>
        )}
        {activeTab === "updates" && (
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Updates feed */}
              <div className="lg:w-2/3 space-y-6">
                {/* New update form */}
                {showNewUpdate ? (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <img
                        src="https://randomuser.me/api/portraits/women/12.jpg"
                        alt="Current user"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          Post a funding update
                        </div>
                      </div>
                    </div>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                      placeholder="Share updates on how the funding is being used..."
                      value={newUpdateContent}
                      onChange={(e) => setNewUpdateContent(e.target.value)}
                    ></textarea>
                    <div className="flex justify-between mt-3">
                      <button className="flex items-center text-gray-500 hover:text-gray-700">
                        <Paperclip size={16} className="mr-1" />
                        Attach files
                      </button>
                      <div>
                        <button
                          className="px-3 py-1 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowNewUpdate(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          onClick={handlePostUpdate}
                        >
                          Post Update
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    className="w-full border border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:text-gray-700 hover:border-gray-400"
                    onClick={() => setShowNewUpdate(true)}
                  >
                    <div className="flex items-center justify-center">
                      <Plus size={18} className="mr-2" />
                      Post a new update
                    </div>
                  </button>
                )}
                {/* Updates list */}
                <div className="space-y-6">
                  {fundingData.updates.map((update) => (
                    <div
                      key={update.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src="https://randomuser.me/api/portraits/women/12.jpg"
                            alt={update.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {update.author}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(update.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
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
                          {update.comments.map((comment) => (
                            <div key={comment.id} className="flex">
                              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                                FC
                              </div>
                              <div className="ml-2 flex-1">
                                <div className="bg-gray-50 rounded-lg p-2">
                                  <div className="flex justify-between items-center">
                                    <div className="text-xs font-medium text-gray-900">
                                      {comment.author}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {new Date(
                                        comment.date
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-700 mt-1">
                                    {comment.content}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {/* Comment form */}
                          <div className="flex">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                              SC
                            </div>
                            <div className="ml-2 flex-1">
                              <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Add a comment..."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Sidebar */}
              <div className="lg:w-1/3 space-y-6">
                {/* Funding status */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Funding Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ₹{getStatusColor(fundingData.status)}`}
                      >
                        {fundingData.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Submitted:</span>
                      <span className="text-sm text-gray-900">
                        {new Date(fundingData.dateSubmitted).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Reviewed:</span>
                      <span className="text-sm text-gray-900">
                        {fundingData.dateReviewed
                          ? new Date(
                              fundingData.dateReviewed
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Pending"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Category:</span>
                      <span className="text-sm text-gray-900">
                        {fundingData.category}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Quick actions */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Actions
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <Download size={16} className="mr-2" />
                      Export Updates
                    </button>
                    <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <LinkIcon size={16} className="mr-2" />
                      Share Updates
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "documents" && (
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Funding Documents
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
                    <div className="col-span-2">Date</div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {fundingData.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="grid grid-cols-12 px-4 py-3 hover:bg-gray-50"
                      >
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
                            {new Date(doc.uploadDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Required Documentation
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="p-1 bg-green-100 rounded-md text-green-600 mt-1">
                          <CheckCircle size={16} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            Funding Application
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Complete application form with project details and
                            requested amount
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-1 bg-green-100 rounded-md text-green-600 mt-1">
                          <CheckCircle size={16} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            Budget Breakdown
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Detailed breakdown of how funds will be used
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-1 bg-green-100 rounded-md text-green-600 mt-1">
                          <CheckCircle size={16} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            Project Timeline
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Schedule of project milestones and expected
                            completion dates
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-1 bg-yellow-100 rounded-md text-yellow-600 mt-1">
                          <AlertTriangle size={16} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            Progress Reports
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Regular updates on project progress and fund
                            utilization
                            <div className="mt-1">
                              <button className="text-blue-600 text-xs hover:underline">
                                Submit report
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-1 bg-red-100 rounded-md text-red-600 mt-1">
                          <XCircle size={16} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            Final Report
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Comprehensive report on project outcomes and
                            financial summary
                            <div className="mt-1">
                              <button className="text-blue-600 text-xs hover:underline">
                                Submit report
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Document Storage
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Used</span>
                      <span className="text-gray-900 font-medium">3.0 MB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: "15%",
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>3.0 MB used</span>
                      <span>20 MB total</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Document Templates
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="p-1.5 bg-blue-100 rounded-md text-blue-600">
                          <FileText size={14} />
                        </div>
                        <div className="ml-2 text-sm text-blue-600 hover:underline cursor-pointer">
                          Expense Report Template
                        </div>
                      </div>
                      <button className="text-xs text-blue-600 hover:underline">
                        Download
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="p-1.5 bg-blue-100 rounded-md text-blue-600">
                          <FileText size={14} />
                        </div>
                        <div className="ml-2 text-sm text-blue-600 hover:underline cursor-pointer">
                          Progress Report Template
                        </div>
                      </div>
                      <button className="text-xs text-blue-600 hover:underline">
                        Download
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="p-1.5 bg-blue-100 rounded-md text-blue-600">
                          <FileText size={14} />
                        </div>
                        <div className="ml-2 text-sm text-blue-600 hover:underline cursor-pointer">
                          Final Report Template
                        </div>
                      </div>
                      <button className="text-xs text-blue-600 hover:underline">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FundingDetails;