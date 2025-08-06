import { useState } from 'react';
import { Download, Calendar, Filter, ChevronDown, BarChart2, LineChart, PieChart, TrendingUp, Users, FileText, DollarSign, BookOpen } from 'lucide-react';
import { BarChart, Bar, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
const projectStatusData = [{
  name: 'Idea',
  value: 9,
  color: '#3B82F6'
}, {
  name: 'In Progress',
  value: 12,
  color: '#FFCA28'
}, {
  name: 'Prototype',
  value: 8,
  color: '#9C27B0'
}, {
  name: 'Completed',
  value: 4,
  color: '#22C55E'
}];
const monthlyProjectsData = [{
  name: 'Jan',
  count: 4
}, {
  name: 'Feb',
  count: 6
}, {
  name: 'Mar',
  count: 8
}, {
  name: 'Apr',
  count: 10
}, {
  name: 'May',
  count: 7
}, {
  name: 'Jun',
  count: 12
}];
const resourceUtilizationData = [{
  name: '3D Printer',
  utilization: 75
}, {
  name: 'VR Lab',
  utilization: 60
}, {
  name: 'Electronics Lab',
  utilization: 85
}, {
  name: 'Meeting Room',
  utilization: 50
}, {
  name: 'Workshop',
  utilization: 70
}];
const mentorshipData = [{
  name: 'Dr. James Wilson',
  projects: 4,
  students: 12,
  rating: 4.8
}, {
  name: 'Prof. Maria Garcia',
  projects: 3,
  students: 9,
  rating: 4.6
}, {
  name: 'Dr. Robert Chen',
  projects: 2,
  students: 6,
  rating: 4.9
}, {
  name: 'Prof. Helen Martinez',
  projects: 3,
  students: 8,
  rating: 4.7
}, {
  name: 'Dr. Michael Brown',
  projects: 2,
  students: 5,
  rating: 4.5
}];
const fundingCategoryData = [{
  name: 'Research',
  value: 25000,
  color: '#3B82F6'
}, {
  name: 'Development',
  value: 18000,
  color: '#22C55E'
}, {
  name: 'Events',
  value: 12000,
  color: '#9C27B0'
}, {
  name: 'Equipment',
  value: 7000,
  color: '#FFCA28'
}];
const eventAttendanceData = [{
  name: 'AI Workshop',
  attendance: 24,
  capacity: 30
}, {
  name: 'Pitch Day',
  attendance: 65,
  capacity: 100
}, {
  name: 'Entrepreneurship',
  attendance: 42,
  capacity: 50
}, {
  name: 'Hackathon',
  attendance: 48,
  capacity: 60
}, {
  name: 'Networking',
  attendance: 35,
  capacity: 80
}];
const Analytics = () => {
  const [dateRange, setDateRange] = useState('last6months');
  const [showFilters, setShowFilters] = useState(false);
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Analytics & Reports
          </h2>
          <p className="text-gray-500 mt-1">
            Track key metrics and performance indicators
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md px-3 py-2">
            <Download size={18} className="mr-2" />
            Export Report
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md px-3 py-2">
            <Calendar size={18} className="mr-2" />
            Schedule
          </button>
        </div>
      </div>
      {/* Date range and filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <select id="dateRange" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={dateRange} onChange={e => setDateRange(e.target.value)}>
              <option value="last30days">Last 30 Days</option>
              <option value="last3months">Last 3 Months</option>
              <option value="last6months">Last 6 Months</option>
              <option value="lastyear">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md px-3 py-2" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={18} className="mr-2" />
              Filters
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>
        </div>
        {showFilters && <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Categories
              </label>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center">
                  <input type="checkbox" id="ai" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                  <label htmlFor="ai" className="ml-2 text-sm text-gray-700">
                    AI & ML
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="iot" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                  <label htmlFor="iot" className="ml-2 text-sm text-gray-700">
                    IoT
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="biotech" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                  <label htmlFor="biotech" className="ml-2 text-sm text-gray-700">
                    Biotech
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="social" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                  <label htmlFor="social" className="ml-2 text-sm text-gray-700">
                    Social Impact
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teams
              </label>
              <select className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Teams</option>
                <option value="EcoTech">Team EcoTech</option>
                <option value="RoboHelp">Team RoboHelp</option>
                <option value="QuantumCoders">Quantum Coders</option>
                <option value="BioInnovators">Bio Innovators</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Metrics Focus
              </label>
              <select className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="all">All Metrics</option>
                <option value="projects">Projects</option>
                <option value="funding">Funding</option>
                <option value="resources">Resources</option>
                <option value="participation">Participation</option>
              </select>
            </div>
          </div>}
      </div>
      {/* Key Performance Indicators */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">
          Key Performance Indicators
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-500">
                Total Projects
              </h4>
              <div className="p-2 bg-blue-100 rounded-md">
                <FileText size={18} className="text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-800">33</div>
              <div className="flex items-center text-sm mt-1">
                <TrendingUp size={14} className="text-green-500 mr-1" />
                <span className="text-green-600">+12%</span>
                <span className="text-gray-500 ml-1">vs. last period</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-500">
                Student Participation
              </h4>
              <div className="p-2 bg-purple-100 rounded-md">
                <Users size={18} className="text-purple-600" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-800">125</div>
              <div className="flex items-center text-sm mt-1">
                <TrendingUp size={14} className="text-green-500 mr-1" />
                <span className="text-green-600">+8%</span>
                <span className="text-gray-500 ml-1">vs. last period</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-500">
                Funding Success Rate
              </h4>
              <div className="p-2 bg-green-100 rounded-md">
                <DollarSign size={18} className="text-green-600" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-800">74%</div>
              <div className="flex items-center text-sm mt-1">
                <TrendingUp size={14} className="text-green-500 mr-1" />
                <span className="text-green-600">+5%</span>
                <span className="text-gray-500 ml-1">vs. last period</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-500">
                Resource Utilization
              </h4>
              <div className="p-2 bg-amber-100 rounded-md">
                <BookOpen size={18} className="text-amber-600" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-800">68%</div>
              <div className="flex items-center text-sm mt-1">
                <TrendingUp size={14} className="text-green-500 mr-1" />
                <span className="text-green-600">+7%</span>
                <span className="text-gray-500 ml-1">vs. last period</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Project Analytics */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">
          Project Analytics
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-medium text-gray-700">
                Project Status Distribution
              </h4>
              <div className="flex items-center">
                <PieChart size={18} className="text-gray-400 mr-1" />
                <select className="text-sm border-none focus:ring-0">
                  <option>All Projects</option>
                  <option>This Month</option>
                  <option>Last Quarter</option>
                </select>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={projectStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {projectStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-medium text-gray-700">
                New Projects Over Time
              </h4>
              <div className="flex items-center">
                <LineChart size={18} className="text-gray-400 mr-1" />
                <select className="text-sm border-none focus:ring-0">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                  <option>Last 2 Years</option>
                </select>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={monthlyProjectsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {/* Resource and Participation Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-gray-700">
              Resource Utilization
            </h4>
            <div className="flex items-center">
              <BarChart2 size={18} className="text-gray-400 mr-1" />
              <select className="text-sm border-none focus:ring-0">
                <option>Last 30 Days</option>
                <option>Last Quarter</option>
                <option>Last Year</option>
              </select>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceUtilizationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="utilization" fill="#8884d8" radius={[0, 4, 4, 0]}>
                  {resourceUtilizationData.map((entry, index) => <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-gray-700">
              Event Attendance
            </h4>
            <div className="flex items-center">
              <BarChart2 size={18} className="text-gray-400 mr-1" />
              <select className="text-sm border-none focus:ring-0">
                <option>All Events</option>
                <option>Workshops</option>
                <option>Networking</option>
              </select>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendance" fill="#3B82F6" />
                <Bar dataKey="capacity" fill="#E5E7EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Funding and Mentorship Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-gray-700">
              Funding by Category
            </h4>
            <div className="flex items-center">
              <DollarSign size={18} className="text-gray-400 mr-1" />
              <select className="text-sm border-none focus:ring-0">
                <option>All Time</option>
                <option>This Year</option>
                <option>Last Year</option>
              </select>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie data={fundingCategoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={entry => `${entry.name}: $${entry.value.toLocaleString()}`}>
                  {fundingCategoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={value => `$${value.toLocaleString()}`} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-gray-700">Top Mentors</h4>
            <div className="flex items-center">
              <Users size={18} className="text-gray-400 mr-1" />
              <select className="text-sm border-none focus:ring-0">
                <option>By Projects</option>
                <option>By Students</option>
                <option>By Rating</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mentor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projects
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mentorshipData.map((mentor, index) => <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {mentor.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {mentor.projects}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {mentor.students}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm text-gray-900 mr-2">
                          {mentor.rating}
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => <svg key={i} className={`h-4 w-4 ${i < Math.floor(mentor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>)}
                        </div>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Generate Report */}
      <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-blue-800">
              Generate Custom Report
            </h3>
            <p className="text-sm text-blue-600 mt-1">
              Create a detailed report with selected metrics and date ranges
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <select className="border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option>PDF Format</option>
              <option>Excel Format</option>
              <option>CSV Format</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center">
              <Download size={18} className="mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default Analytics;