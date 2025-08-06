import { useState } from 'react';
import { Search, Filter, Plus, ChevronDown, MoreHorizontal, DollarSign, FileText, CheckCircle, XCircle, Clock, AlertTriangle, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';
const fundingData = [{
  id: '1',
  project: 'AI for Sustainable Agriculture',
  team: ['Sarah Chen', 'Mike Johnson'],
  requestedAmount: 3500,
  approvedAmount: 2000,
  status: 'Approved',
  dateSubmitted: '2023-06-15',
  dateReviewed: '2023-06-20',
  description: 'Funding for AI-powered sensors and data analysis tools for sustainable farming practices.',
  category: 'Research'
}, {
  id: '2',
  project: 'Smart City Solutions',
  team: ['Alex Kumar', 'Lisa Wong'],
  requestedAmount: 5000,
  approvedAmount: 5000,
  status: 'Approved',
  dateSubmitted: '2023-06-10',
  dateReviewed: '2023-06-18',
  description: 'Development of IoT devices for urban infrastructure monitoring and optimization.',
  category: 'Development'
}, {
  id: '3',
  project: 'Biodegradable Plastics',
  team: ['Tom Harris', 'Emma Lewis'],
  requestedAmount: 2200,
  approvedAmount: 1200,
  status: 'Approved',
  dateSubmitted: '2023-06-25',
  dateReviewed: '2023-07-02',
  description: 'Research and development of new biodegradable plastic alternatives from plant waste.',
  category: 'Research'
}, {
  id: '4',
  project: 'Quantum Computing Applications',
  team: ['David Park', 'Sophia Miller'],
  requestedAmount: 7000,
  approvedAmount: null,
  status: 'Submitted',
  dateSubmitted: '2023-07-05',
  dateReviewed: null,
  description: 'Exploration of practical applications for quantum computing in data security and analysis.',
  category: 'Research'
}, {
  id: '5',
  project: 'AR Learning Platform',
  team: ['Ethan Brown', 'Olivia Davis'],
  requestedAmount: 4200,
  approvedAmount: 3000,
  status: 'Approved',
  dateSubmitted: '2023-06-12',
  dateReviewed: '2023-06-19',
  description: 'Development of an augmented reality platform for interactive STEM education.',
  category: 'Development'
}, {
  id: '6',
  project: 'Clean Energy Storage',
  team: ['Raj Patel', 'Maya Johnson'],
  requestedAmount: 6500,
  approvedAmount: null,
  status: 'Reviewed',
  dateSubmitted: '2023-06-28',
  dateReviewed: '2023-07-08',
  description: 'Research into advanced battery technologies for renewable energy storage.',
  category: 'Research'
}, {
  id: '7',
  project: 'Mental Health App',
  team: ['Jasmine Lee', 'Tyler Wilson'],
  requestedAmount: 3800,
  approvedAmount: null,
  status: 'Submitted',
  dateSubmitted: '2023-07-07',
  dateReviewed: null,
  description: 'Development of a mobile app for mental health monitoring and support using AI.',
  category: 'Development'
}, {
  id: '8',
  project: 'Drone Delivery System',
  team: ['Carlos Rodriguez', 'Aisha Patel'],
  requestedAmount: 5500,
  approvedAmount: null,
  status: 'Declined',
  dateSubmitted: '2023-06-08',
  dateReviewed: '2023-06-20',
  description: 'Development of an automated drone delivery system for campus package delivery.',
  category: 'Development'
}];
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Draft':
      return 'bg-gray-100 text-gray-800';
    case 'Submitted':
      return 'bg-blue-100 text-blue-800';
    case 'Reviewed':
      return 'bg-yellow-100 text-yellow-800';
    case 'Approved':
      return 'bg-green-100 text-green-800';
    case 'Declined':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
const Funding = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState('table');
  const filteredFunding = fundingData.filter(application => {
    const matchesSearch = application.project.toLowerCase().includes(searchTerm.toLowerCase()) || application.team.some(member => member.toLowerCase().includes(searchTerm.toLowerCase())) || application.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || application.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const totalRequested = filteredFunding.reduce((sum, app) => sum + app.requestedAmount, 0);
  const totalApproved = filteredFunding.reduce((sum, app) => sum + (app.approvedAmount || 0), 0);
  const statusCounts = {
    Draft: filteredFunding.filter(app => app.status === 'Draft').length,
    Submitted: filteredFunding.filter(app => app.status === 'Submitted').length,
    Reviewed: filteredFunding.filter(app => app.status === 'Reviewed').length,
    Approved: filteredFunding.filter(app => app.status === 'Approved').length,
    Declined: filteredFunding.filter(app => app.status === 'Declined').length
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Funding & Grants</h2>
          <p className="text-gray-500 mt-1">
            Manage funding applications and grant disbursements
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <Plus size={18} className="mr-2" />
          New Application
        </button>
      </div>
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Budget</h3>
            <div className="p-2 bg-green-100 rounded-md">
              <IndianRupee size={18} className="text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-gray-800">₹75,000</div>
            <div className="text-sm text-gray-500">Annual allocation</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">
              Total Requested
            </h3>
            <div className="p-2 bg-blue-100 rounded-md">
              <FileText size={18} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-gray-800">
              ₹{totalRequested.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              Across {filteredFunding.length} applications
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">
              Total Approved
            </h3>
            <div className="p-2 bg-green-100 rounded-md">
              <CheckCircle size={18} className="text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-gray-800">
              ₹{totalApproved.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              {statusCounts.Approved} approved applications
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">
              Remaining Budget
            </h3>
            <div className="p-2 bg-yellow-100 rounded-md">
              <AlertTriangle size={18} className="text-yellow-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-gray-800">
              ₹{(75000 - totalApproved).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              {Math.round((75000 - totalApproved) / 75000 * 100)}% remaining
            </div>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{
            width: `₹{Math.round(totalApproved / 75000 * 100)}%`
          }}></div>
          </div>
        </div>
      </div>
      {/* View toggle */}
      <div className="flex border border-gray-200 rounded-md overflow-hidden">
        <button className={`px-4 py-2 font-medium text-sm flex items-center ₹{activeView === 'table' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`} onClick={() => setActiveView('table')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Table
        </button>
        <button className={`px-4 py-2 font-medium text-sm flex items-center ₹{activeView === 'kanban' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`} onClick={() => setActiveView('kanban')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
          Kanban
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Search and filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search applications..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md px-3 py-2" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={18} className="mr-2" />
                Filters
                <ChevronDown size={16} className="ml-2" />
              </button>
              <div>
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="All">All Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>
            </div>
          </div>
          {showFilters && <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Categories</option>
                  <option value="Research">Research</option>
                  <option value="Development">Development</option>
                  <option value="Event">Event</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>
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
                  Amount Range
                </label>
                <div className="flex items-center space-x-2">
                  <span>₹</span>
                  <input type="number" placeholder="Min" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  <span>to</span>
                  <span>₹</span>
                  <input type="number" placeholder="Max" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
            </div>}
        </div>
        {activeView === 'table' ? <div>
            {/* Funding applications table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requested
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Approved
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFunding.map(application => <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          <Link to={`/funding/₹{application.id}`} className="hover:text-blue-600">
                            {application.project}
                          </Link>
                        </div>
                        <div className="text-xs text-gray-500">
                          {application.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {application.team.join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ₹{application.requestedAmount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {application.approvedAmount !== null ? `₹${application.approvedAmount.toLocaleString()}` : '—'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(application.dateSubmitted).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link to={`/funding/₹{application.id}`} className="text-blue-600 hover:text-blue-900">
                            <FileText size={18} />
                          </Link>
                          {application.status === 'Submitted' || application.status === 'Reviewed' ? <>
                              <button className="text-green-600 hover:text-green-900">
                                <CheckCircle size={18} />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <XCircle size={18} />
                              </button>
                            </> : null}
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
            {/* Kanban board */}
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {['Draft', 'Submitted', 'Reviewed', 'Approved', 'Declined'].map(status => {
            const statusApplications = filteredFunding.filter(app => app.status === status);
            return <div key={status} className="flex-shrink-0 w-72">
                      <div className={`p-3 rounded-t-md ₹{getStatusColor(status)}`}>
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{status}</h3>
                          <span className="bg-white bg-opacity-30 text-xs font-semibold px-2 py-1 rounded-full">
                            {statusApplications.length}
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-b-md p-2 h-[calc(100vh-380px)] overflow-y-auto">
                        {statusApplications.map(app => <div key={app.id} className="bg-white p-3 rounded-md shadow-sm mb-2 cursor-move">
                            <Link to={`/funding/₹{app.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">
                              {app.project}
                            </Link>
                            <div className="flex items-center justify-between mt-2">
                              <div className="text-xs text-gray-500">
                                {app.team[0]}
                                {app.team.length > 1 ? ` +₹{app.team.length - 1}` : ''}
                              </div>
                              <div className="text-xs font-medium">
                                ₹{app.requestedAmount.toLocaleString()}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock size={12} className="mr-1" />
                                {new Date(app.dateSubmitted).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                              </div>
                              <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {app.category}
                              </div>
                            </div>
                          </div>)}
                        {statusApplications.length === 0 && <div className="text-center py-8 text-gray-500 text-sm">
                            No applications
                          </div>}
                      </div>
                    </div>;
          })}
            </div>
          </div>}
      </div>
    </div>;
};
export default Funding;