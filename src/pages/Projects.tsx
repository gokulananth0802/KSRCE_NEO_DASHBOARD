import { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, Eye, Edit, Archive, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
const projectsData = [{
  id: '1',
  title: 'AI for Sustainable Agriculture',
  team: ['Sarah Chen', 'Mike Johnson'],
  mentor: 'Dr. James Wilson',
  status: 'In Progress',
  fundingRequested: '₹3,500',
  fundingApproved: '₹2,000',
  lastUpdate: '2 days ago'
}, {
  id: '2',
  title: 'Smart City Solutions',
  team: ['Alex Kumar', 'Lisa Wong'],
  mentor: 'Prof. Maria Garcia',
  status: 'Prototype',
  fundingRequested: '₹5,000',
  fundingApproved: '₹5,000',
  lastUpdate: '1 week ago'
}, {
  id: '3',
  title: 'Biodegradable Plastics',
  team: ['Tom Harris', 'Emma Lewis'],
  mentor: 'Dr. Robert Chen',
  status: 'Completed',
  fundingRequested: '₹2,200',
  fundingApproved: '₹1,200',
  lastUpdate: '2 days ago'
}, {
  id: '4',
  title: 'Quantum Computing Applications',
  team: ['David Park', 'Sophia Miller'],
  mentor: 'Dr. James Wilson',
  status: 'Idea',
  fundingRequested: '₹7,000',
  fundingApproved: 'Pending',
  lastUpdate: '1 day ago'
}, {
  id: '5',
  title: 'AR Learning Platform',
  team: ['Ethan Brown', 'Olivia Davis'],
  mentor: 'Prof. Helen Martinez',
  status: 'In Progress',
  fundingRequested: '₹4,200',
  fundingApproved: '₹3,000',
  lastUpdate: '3 days ago'
}];
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Idea':
      return 'bg-blue-100 text-blue-800';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'Prototype':
      return 'bg-purple-100 text-purple-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Archived':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || project.team.some(member => member.toLowerCase().includes(searchTerm.toLowerCase())) || project.mentor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
          <p className="text-gray-500 mt-1">
            Manage and track all innovation projects
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <Plus size={18} className="mr-2" />
          New Project
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Search and filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search projects, team members, or mentors..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex items-center">
              <button className="flex items-center text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md px-3 py-2" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={18} className="mr-2" />
                Filters
                <ChevronDown size={16} className="ml-2" />
              </button>
              <div className="ml-2">
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="All">All Status</option>
                  <option value="Idea">Idea</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Prototype">Prototype</option>
                  <option value="Completed">Completed</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
          {showFilters && <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Departments</option>
                  <option value="AI">AI & Machine Learning</option>
                  <option value="Biotech">Biotech</option>
                  <option value="Social">Social Impact</option>
                  <option value="Hardware">Hardware & IoT</option>
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
                  Form Submissions
                </label>
                <div className="flex items-center">
                  <input type="checkbox" id="formSubmissions" className="rounded text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="formSubmissions" className="ml-2 text-sm text-gray-700">
                    Show only form submissions
                  </label>
                </div>
              </div>
            </div>}
        </div>
        {/* Projects table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Leads
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mentor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Funding Req'd
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Funding App'd
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map(project => <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      <Link to={`/projects/₹{project.id}`} className="hover:text-blue-600">
                        {project.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {project.team.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {project.mentor}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.fundingRequested}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.fundingApproved}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.lastUpdate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link to={`/projects/₹{project.id}`} className="text-blue-600 hover:text-blue-900">
                        <Eye size={18} />
                      </Link>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit size={18} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Archive size={18} />
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
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">5</span> of{' '}
                <span className="font-medium">20</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  4
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Projects;