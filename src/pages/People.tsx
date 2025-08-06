import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Users, ChevronDown, UserCheck, Mail, MoreHorizontal, FileText, Calendar, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
const peopleData = [{
  id: '1',
  name: 'Sarah Chen',
  email: 'schen@university.edu',
  department: 'Computer Science',
  role: 'Student',
  projects: ['AI for Sustainable Agriculture'],
  skills: ['Machine Learning', 'Python', 'Data Analysis'],
  image: 'https://randomuser.me/api/portraits/women/12.jpg'
}, {
  id: '2',
  name: 'Dr. James Wilson',
  email: 'jwilson@university.edu',
  department: 'Electrical Engineering',
  role: 'Mentor',
  projects: ['Quantum Computing Applications', 'Smart City Solutions'],
  skills: ['Quantum Computing', 'Circuit Design', 'IoT'],
  image: 'https://randomuser.me/api/portraits/men/32.jpg'
}, {
  id: '3',
  name: 'Mike Johnson',
  email: 'mjohnson@university.edu',
  department: 'Environmental Science',
  role: 'Student',
  projects: ['AI for Sustainable Agriculture'],
  skills: ['Sustainability', 'Agriculture', 'Research'],
  image: 'https://randomuser.me/api/portraits/men/45.jpg'
}, {
  id: '4',
  name: 'Prof. Maria Garcia',
  email: 'mgarcia@university.edu',
  department: 'Computer Science',
  role: 'Mentor',
  projects: ['Smart City Solutions'],
  skills: ['Urban Planning', 'Data Science', 'IoT'],
  image: 'https://randomuser.me/api/portraits/women/68.jpg'
}, {
  id: '5',
  name: 'Alex Kumar',
  email: 'akumar@university.edu',
  department: 'Mechanical Engineering',
  role: 'Student',
  projects: ['Smart City Solutions'],
  skills: ['CAD', '3D Printing', 'Robotics'],
  image: 'https://randomuser.me/api/portraits/men/67.jpg'
}, {
  id: '6',
  name: 'Lisa Wong',
  email: 'lwong@university.edu',
  department: 'Business',
  role: 'Student',
  projects: ['Smart City Solutions'],
  skills: ['Project Management', 'Marketing', 'Finance'],
  image: 'https://randomuser.me/api/portraits/women/55.jpg'
}, {
  id: '7',
  name: 'Dr. Robert Chen',
  email: 'rchen@university.edu',
  department: 'Chemistry',
  role: 'Mentor',
  projects: ['Biodegradable Plastics'],
  skills: ['Polymer Science', 'Sustainability', 'Material Science'],
  image: 'https://randomuser.me/api/portraits/men/22.jpg'
}, {
  id: '8',
  name: 'Emma Lewis',
  email: 'elewis@university.edu',
  department: 'Chemistry',
  role: 'Student',
  projects: ['Biodegradable Plastics'],
  skills: ['Analytical Chemistry', 'Lab Work', 'Research'],
  image: 'https://randomuser.me/api/portraits/women/33.jpg'
}];

export interface FormEntry {
  Timestamp: number;
  Name: string;
  'Designation ': string;
  Department: string;
  Skills: string;
  Projects: string;
  Portfolio: string;
  Mobile: string;
}

const People = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const filteredPeople = peopleData.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) || person.email.toLowerCase().includes(searchTerm.toLowerCase()) || person.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = activeTab === 'students' && person.role === 'Student' || activeTab === 'mentors' && person.role === 'Mentor' || activeTab === 'partners' && person.role === 'Corporate Partner';
    const matchesDepartment = departmentFilter === 'All' || person.department === departmentFilter;
    return matchesSearch && matchesRole && matchesDepartment;
  });
  const departments = [...new Set(peopleData.map(person => person.department))];

    const [profileCollections, setProfileCollections] = useState<{
    students: FormEntry[];
    mentors: FormEntry[];
    corporatePartners: FormEntry[];
  }>({
    students: [],
    mentors: [],
    corporatePartners: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SHEET_URL =
          'https://docs.google.com/spreadsheets/d/1an81eaGBYlCnvTr65o1fih47Sfg504o6NKNP1wuV8GQ/export?format=xlsx';
        const res = await fetch(SHEET_URL);
        const buf = await res.arrayBuffer();

        const wb = XLSX.read(buf, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const raw = XLSX.utils.sheet_to_json(ws, { defval: null }) as FormEntry[];

        // Segregate profiles by designation
        const students: FormEntry[] = [];
        const mentors: FormEntry[] = [];
        const corporatePartners: FormEntry[] = [];

        raw.forEach(entry => {
          const designation = entry['Designation ']?.trim().toLowerCase();
          switch (designation) {
            case 'student':
              students.push(entry);
              break;
            case 'mentor':
              mentors.push(entry);
              break;
            case 'corporate partner':
            case 'corporate':
            case 'partner':
              corporatePartners.push(entry);
              break;
            default:
              // you may choose to handle unexpected designations here
              break;
          }
        });

        setProfileCollections({ students, mentors, corporatePartners });
        console.log('Profiles loaded:', { students, mentors, corporatePartners });
        console.log('Profiles segregated:', { students, mentors, corporatePartners });
      } catch (err) {
        console.error('Error loading sheet:', err);
      }
    };

    fetchData();
  }, []);

  const getProfiles = () => {
    switch (activeTab) {
      case 'student':
        console.log('Fetching students:', profileCollections.students);
        return profileCollections.students || [];
      case 'mentor':
        return profileCollections.mentors || [];
      case 'corporatePartner':
        return profileCollections.corporatePartners || [];
      default:
        return [];
    }
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">People</h2>
          <p className="text-gray-500 mt-1">
            Manage students, mentors, and partners
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <Plus size={18} className="mr-2" />
          Add Person
        </button>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button className={`py-3 px-6 font-medium text-sm flex items-center ${activeTab === 'students' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('students')}>
          <Users size={16} className="mr-2" />
          Students
        </button>
        <button className={`py-3 px-6 font-medium text-sm flex items-center ${activeTab === 'mentors' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('mentors')}>
          <UserCheck size={16} className="mr-2" />
          Mentors
        </button>
        <button className={`py-3 px-6 font-medium text-sm flex items-center ${activeTab === 'partners' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('partners')}>
          <BarChart2 size={16} className="mr-2" />
          Corporate Partners
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Search and filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder={`Search ${activeTab}...`} className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md px-3 py-2" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={18} className="mr-2" />
                Filters
                <ChevronDown size={16} className="ml-2" />
              </button>
              <div className="border border-gray-300 rounded-md overflow-hidden flex">
                <button className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`} onClick={() => setViewMode('grid')}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button className={`px-3 py-2 ${viewMode === 'table' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`} onClick={() => setViewMode('table')}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {showFilters && <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)}>
                  <option value="All">All Departments</option>
                  {departments.map((dept, index) => <option key={index} value={dept}>
                      {dept}
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <input type="text" placeholder="Filter by skills..." className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Involvement
                </label>
                <select className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="All">All</option>
                  <option value="Active">Active in projects</option>
                  <option value="None">Not in any project</option>
                </select>
              </div>
            </div>}
        </div>
        {/* People grid/table */}
        {viewMode === 'grid' ? <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getProfiles().map(person => (
              <div
                key={person.Timestamp /* or whatever unique key they have */}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex items-center">
                    <img
                      // src={person.image || person['Upload PPT/PDF'] /* fallback if no image */}
                      // alt={person.name || person.Name}
                      // className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="ml-3">
                        {person.Name}
                      <p className="text-sm text-gray-500">
                        {person.Department}
                      </p>
                      <span
                        className={
                          `inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ` +
                          (person['Designation '] === 'Student'
                            ? 'bg-blue-100 text-blue-800'
                            : person['Designation '] === 'Mentor'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800')
                        }
                      >
                        {person['Designation ']}
                      </span>
                    </div>
                  </div>

                  {/* Skills */}
                  {'skills' in person && (
                    <div className="mt-4">
                      <h4 className="text-xs font-medium uppercase text-gray-500">
                        Skills
                      </h4>
                      {/* <div className="mt-1 flex flex-wrap gap-1">
                        {person.skills.slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {person.skills.length > 3 && (
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            +{person.skills.length - 3}
                          </span>
                        )}
                      </div> */}
                    </div>
                  )}

                  {/* Projects */}
                  {'projects' in person && (
                    <div className="mt-3">
                      <h4 className="text-xs font-medium uppercase text-gray-500">
                        Projects
                      </h4>
                      <div className="mt-1">
                        {/* {person.projects.length > 0 ? (
                          <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                            {person.projects[0]}
                            {person.projects.length > 1
                              ? ` +${person.projects.length - 1} more`
                              : ''}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 italic">
                            No active projects
                          </div>
                        )} */}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex justify-between">
                    <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                      <FileText size={14} className="mr-1" />
                      Profile
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 flex items-center text-sm">
                      <Mail size={14} className="mr-1" />
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div> : <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Skills
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projects
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPeople.map(person => <tr key={person.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={person.image} alt={person.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            <Link to={`/people/${person.id}`} className="hover:text-blue-600">
                              {person.name}
                            </Link>
                          </div>
                          <div className="text-sm text-gray-500">
                            {person.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${person.role === 'Student' ? 'bg-blue-100 text-blue-800' : person.role === 'Mentor' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'}`}>
                        {person.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {person.skills.slice(0, 2).map((skill, index) => <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>)}
                        {person.skills.length > 2 && <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            +{person.skills.length - 2}
                          </span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.projects.length > 0 ? <div className="text-blue-600 hover:underline cursor-pointer">
                          {person.projects[0]}
                          {person.projects.length > 1 ? ` +${person.projects.length - 1}` : ''}
                        </div> : <span className="italic text-gray-400">None</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <FileText size={18} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Mail size={18} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Calendar size={18} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
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
                <span className="font-medium">8</span> of{' '}
                <span className="font-medium">{filteredPeople.length}</span>{' '}
                results
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
export default People;