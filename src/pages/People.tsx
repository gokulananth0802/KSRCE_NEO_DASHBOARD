import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Users, ChevronDown, UserCheck, Mail, MoreHorizontal, FileText, Calendar, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';


// Student interface - with flexible field names
export interface StudentEntry {
  Timestamp: number;
  'Full Name ': string;
  'Email Address': string;
  'Phone Number': number;
  'Phone Number ': number;
  '"Phone Number "': number;
  '"Phone Number"': number;
  'Contact Number': string | number;
  'Contact Number ': string | number;
  '"Contact Number "': string | number;
  '"Contact Number"': string | number;
  'City / Location': string;
  // Possible skill field variations
  Skills?: string;
  Skill?: string;
  skills?: string;
  skill?: string;
  Expertise?: string;
  expertise?: string;
  // Possible project field variations
  Projects?: string;
  Project?: string;
  projects?: string;
  project?: string;
  Work?: string;
  work?: string;
  Portfolio?: string;
  'Years of Professional Experience '?: string | number;
  '"Years of Professional Experience "'?: string | number;
  [key: string]: any; // Allow any additional fields
}

// Mentor interface - with flexible field names
export interface MentorEntry {
  Timestamp: number;
  'Full Name': string;
  'Email Address': string;
  'Contact Number': string | number;
  'Contact Number ': string | number;
  '"Contact Number "': string | number;
  '"Contact Number"': string | number;
  'City/ Location': string;
  // Possible skill field variations
  Skills?: string;
  Skill?: string;
  skills?: string;
  skill?: string;
  Expertise?: string;
  expertise?: string;
  // Possible experience field variations
  Experience?: string;
  experience?: string;
  'Work Experience'?: string;
  'work experience'?: string;
  Background?: string;
  background?: string;
  'Years of Professional Experience '?: string | number;
  '"Years of Professional Experience "'?: string | number;
  'Professional Experience'?: string;
  'professional experience'?: string;
  [key: string]: any; // Allow any additional fields
}

// Corporate Partner interface - with flexible field names
export interface CorporatePartnerEntry {
  Timestamp: number;
  'Organization Name': string;
  'Website / LinkedIn Page ': string;
  'Location / Head Office ': string;
  'Your Name ': string;
  'Contact Email': string;
  'Phone Number': string | number;
  'Phone Number ': string | number;
  '"Phone Number "': string | number;
  '"Phone Number"': string | number;
  'Contact Number': string | number;
  'Contact Number ': string | number;
  '"Contact Number "': string | number;
  '"Contact Number"': string | number;
  // Possible info field variations
  'Brief about your interest in this partnership '?: string;
  '"Brief about your interest in this partnership "': string;
  'Brief about your interest in this partnership'?: string;
  'Company Info'?: string;
  'company info'?: string;
  Description?: string;
  description?: string;
  About?: string;
  about?: string;
  [key: string]: any; // Allow any additional fields
}

const People = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


    const [profileCollections, setProfileCollections] = useState<{
    students: StudentEntry[];
    mentors: MentorEntry[];
    corporatePartners: CorporatePartnerEntry[];
  }>({
    students: [],
    mentors: [],
    corporatePartners: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // URLs for different sheets
        const STUDENTS_URL = 'https://docs.google.com/spreadsheets/d/1mamjHbZBVkoejh-NLFAi8fmHoSgLr8uNBNXETSeaFyI/export?format=xlsx';
        const MENTORS_URL = 'https://docs.google.com/spreadsheets/d/1ftkH0v-RqTqHRg7_71A3VNYwsd6EP8WLmvm3sz8xnlU/export?format=xlsx';
        const PARTNERS_URL = 'https://docs.google.com/spreadsheets/d/1mrbqOE9zx3ivykED0lbEU3WVTnk7p64ZPwej5yT25-Q/export?format=xlsx';

        // Fetch all three sheets in parallel
        const [studentsRes, mentorsRes, partnersRes] = await Promise.all([
          fetch(STUDENTS_URL),
          fetch(MENTORS_URL),
          fetch(PARTNERS_URL)
        ]);

        if (!studentsRes.ok || !mentorsRes.ok || !partnersRes.ok) {
          throw new Error('Failed to fetch one or more sheets');
        }

        // Process students data
        const studentsBuffer = await studentsRes.arrayBuffer();
        const studentsWb = XLSX.read(studentsBuffer, { type: 'array' });
        const studentsWs = studentsWb.Sheets[studentsWb.SheetNames[0]];
        const students = XLSX.utils.sheet_to_json(studentsWs, { defval: null }) as StudentEntry[];

        // Process mentors data
        const mentorsBuffer = await mentorsRes.arrayBuffer();
        const mentorsWb = XLSX.read(mentorsBuffer, { type: 'array' });
        const mentorsWs = mentorsWb.Sheets[mentorsWb.SheetNames[0]];
        const mentors = XLSX.utils.sheet_to_json(mentorsWs, { defval: null }) as MentorEntry[];

        // Process corporate partners data
        const partnersBuffer = await partnersRes.arrayBuffer();
        const partnersWb = XLSX.read(partnersBuffer, { type: 'array' });
        const partnersWs = partnersWb.Sheets[partnersWb.SheetNames[0]];
        const corporatePartners = XLSX.utils.sheet_to_json(partnersWs, { defval: null }) as CorporatePartnerEntry[];

        setProfileCollections({ students, mentors, corporatePartners });
        console.log('Profiles loaded:', { students, mentors, corporatePartners });

        // Debug: Log the first entry of each type to see available fields
        if (students.length > 0) {
          console.log('Sample student data:', students[0]);
          console.log('Student fields:', Object.keys(students[0]));
        }
        if (mentors.length > 0) {
          console.log('Sample mentor data:', mentors[0]);
          console.log('Mentor fields:', Object.keys(mentors[0]));
        }
        if (corporatePartners.length > 0) {
          console.log('Sample partner data:', corporatePartners[0]);
          console.log('Partner fields:', Object.keys(corporatePartners[0]));
        }
      } catch (err) {
        console.error('Error loading sheets:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper functions to get name and email from different data types
  const getName = (person: StudentEntry | MentorEntry | CorporatePartnerEntry): string => {
    if ('Full Name ' in person) return person['Full Name '];
    if ('Full Name' in person) return person['Full Name'];
    if ('Your Name ' in person) return person['Your Name '];
    return 'Unknown';
  };

  const getEmail = (person: StudentEntry | MentorEntry | CorporatePartnerEntry): string => {
    if ('Email Address' in person) return person['Email Address'];
    if ('Contact Email' in person) return person['Contact Email'];
    return 'No email';
  };

  const getLocation = (person: StudentEntry | MentorEntry | CorporatePartnerEntry): string => {
    if ('City / Location' in person) return person['City / Location'];
    if ('City/ Location' in person) return person['City/ Location'];
    if ('Location / Head Office ' in person) return person['Location / Head Office '];
    return 'Unknown';
  };

  // Helper function to get contact/phone number from any available field
  const getContactNumber = (person: StudentEntry | MentorEntry | CorporatePartnerEntry): string => {
    const contactFields = [
      'Contact Number ',
      'Contact Number',
      'Phone Number',
      'Phone Number ',
      'phone number',
      'contact number',
      'Mobile Number',
      'mobile number',
      'Mobile',
      'mobile'
    ];

    return findFieldValue(person, contactFields);
  };

  // Helper function to get skills from any available field
  const getSkills = (person: StudentEntry | MentorEntry | CorporatePartnerEntry): string => {
    // Check for common skill field names
    const skillFields = [
      'Skills',
      'Skill',
      'skills',
      'skill',
      'Area(s) of Expertise',
      'Area of Expertise',
      'expertise',
      'Specialization',
      'specialization'
    ];

    return findFieldValue(person, skillFields);
  };

  // Helper function to find field value with flexible matching
  const findFieldValue = (person: any, fieldNames: string[]): string => {
    for (const fieldName of fieldNames) {
      // Try exact match first
      if (fieldName in person && person[fieldName]) {
        return String(person[fieldName]);
      }

      // Try to find field with or without quotes
      const withoutQuotes = fieldName.replace(/"/g, '');
      const withQuotes = `"${withoutQuotes}"`;

      if (withoutQuotes in person && person[withoutQuotes]) {
        return String(person[withoutQuotes]);
      }

      if (withQuotes in person && person[withQuotes]) {
        return String(person[withQuotes]);
      }
    }
    return '';
  };

  // Helper function to get projects/experience from any available field
  const getProjectsOrExperience = (person: StudentEntry | MentorEntry | CorporatePartnerEntry): string => {
    // For students, look for project fields
    console.log("Person:", person);
    if (activeTab === 'students') {
      const projectFields = [
        'Years of Professional Experience ',
        'Years of Professional Experience',
        'Projects',
        'Project',
        'projects',
        'project',
        'Work',
        'work'
      ];
      return findFieldValue(person, projectFields);
    }

    // For mentors, look for experience fields
    if (activeTab === 'mentors') {
      const experienceFields = [
        'Years of Professional Experience ',
        'Years of Professional Experience',
        'Experience',
        'experience',
        'Work Experience',
        'work experience',
        'Background',
        'background',
        'Professional Experience',
        'professional experience'
      ];
      return findFieldValue(person, experienceFields);
    }

    // For partners, look for company info
    if (activeTab === 'partners') {
      const infoFields = [
        'Brief about your interest in this partnership ',
        'Brief about your interest in this partnership',
        'Company Info',
        'company info',
        'Description',
        'description',
        'About',
        'about',
        'Business Description',
        'business description'
      ];
      return findFieldValue(person, infoFields);
    }

    return '';
  };

  const getProfiles = (): (StudentEntry | MentorEntry | CorporatePartnerEntry)[] => {
    switch (activeTab) {
      case 'students':
        console.log('Fetching students:', profileCollections.students);
        return profileCollections.students || [];
      case 'mentors':
        return profileCollections.mentors || [];
      case 'partners':
        return profileCollections.corporatePartners || [];
      default:
        return [];
    }
  };

  // Get current profiles based on active tab
  const currentProfiles = getProfiles();

  const filteredPeople = currentProfiles.filter(person => {
    const name = getName(person).toLowerCase();
    const email = getEmail(person).toLowerCase();
    const location = getLocation(person);

    const matchesSearch = name.includes(searchTerm.toLowerCase()) ||
                         email.includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All' || location === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(currentProfiles.map(person => getLocation(person)).filter(Boolean))];
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
                  Location
                </label>
                <select className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)}>
                  <option value="All">All Locations</option>
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
        {/* Loading and Error States */}
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-500">Loading people...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="text-red-600 mb-2">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-red-600 font-medium">Error loading data</p>
            <p className="text-gray-500 text-sm mt-1">{error}</p>
          </div>
        ) : filteredPeople.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-2">
              <Users className="mx-auto h-12 w-12" />
            </div>
            <p className="text-gray-500 font-medium">No people found</p>
            <p className="text-gray-400 text-sm mt-1">
              {searchTerm ? 'Try adjusting your search criteria' : `No ${activeTab} available`}
            </p>
          </div>
        ) : (
        /* People grid/table */
        viewMode === 'grid' ? <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPeople.map(person => (
              <div
                key={person.Timestamp}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-5">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {getName(person).trim()}
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="w-4 text-center mr-2">📍</span>
                          <span className="flex-1">{getLocation(person)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="w-4 text-center mr-2">✉️</span>
                          <span className="flex-1 break-all">{getEmail(person)}</span>
                        </div>
                        {(activeTab === 'students' || activeTab === 'mentors') && getContactNumber(person) && (
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="w-4 text-center mr-2">📞</span>
                            <span className="flex-1">{getContactNumber(person)}</span>
                          </div>
                        )}
                        {activeTab === 'partners' && 'Organization Name' in person && (
                          <div className="flex items-center text-sm font-medium text-blue-600">
                            <span className="w-4 text-center mr-2">🏢</span>
                            <span className="flex-1">{person['Organization Name']}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  {getSkills(person) && (
                    <div className="mt-6">
                      <h4 className="text-xs font-medium uppercase text-gray-500 mb-2">
                        Skills
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">
                          {getSkills(person)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Projects/Experience */}
                  {getProjectsOrExperience(person) && (
                    <div className="mt-4">
                      <h4 className="text-xs font-medium uppercase text-gray-500 mb-2">
                        {activeTab === 'students' ? 'Projects' : activeTab === 'mentors' ? 'Experience' : 'Info'}
                      </h4>
                      <div className={`${activeTab === 'students' ? 'bg-blue-50' : activeTab === 'mentors' ? 'bg-green-50' : 'bg-purple-50'} rounded-lg p-3`}>
                        <p className={`text-sm ${activeTab === 'students' ? 'text-blue-700' : activeTab === 'mentors' ? 'text-green-700' : 'text-purple-700'}`}>
                          {getProjectsOrExperience(person)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Website - only for corporate partners */}
                  {activeTab === 'partners' && 'Website / LinkedIn Page ' in person && person['Website / LinkedIn Page '] && (
                    <div className="mt-4">
                      <h4 className="text-xs font-medium uppercase text-gray-500 mb-2">
                        Website
                      </h4>
                      <div className="bg-green-50 rounded-lg p-3">
                        <a href={person['Website / LinkedIn Page ']} target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 hover:text-green-800 underline break-all">
                          {person['Website / LinkedIn Page ']}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between">
                    <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 px-3 py-2 rounded-lg flex items-center text-sm font-medium transition-colors">
                      <FileText size={14} className="mr-2" />
                      Profile
                    </button>
                    <button className="bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-700 px-3 py-2 rounded-lg flex items-center text-sm font-medium transition-colors">
                      <Mail size={14} className="mr-2" />
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
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab === 'partners' ? 'Website' : 'Skills'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab === 'mentors' ? 'Experience' : activeTab === 'students' ? 'Projects' : 'Info'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPeople.map(person => <tr key={person.Timestamp} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">
                          <Link to={`/people/${person.Timestamp}`} className="hover:text-blue-600">
                            {getName(person).trim()}
                          </Link>
                        </div>
                        <div className="text-sm text-gray-500 break-all">
                          {getEmail(person)}
                        </div>
                        {activeTab === 'partners' && 'Organization Name' in person && (
                          <div className="text-xs text-blue-600 font-medium">
                            🏢 {person['Organization Name']}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getLocation(person)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getContactNumber(person) || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {activeTab === 'partners' && 'Website / LinkedIn Page ' in person && person['Website / LinkedIn Page '] ? (
                          <a href={person['Website / LinkedIn Page ']} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">
                            Visit Website
                          </a>
                        ) : getSkills(person) ? (
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {getSkills(person).length > 50 ? `${getSkills(person).substring(0, 50)}...` : getSkills(person)}
                          </span>
                        ) : (
                          <span className="italic text-gray-400">None</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getProjectsOrExperience(person) ? (
                        <div className={`${activeTab === 'students' ? 'text-blue-600' : 'text-green-600'} hover:underline cursor-pointer`}>
                          {getProjectsOrExperience(person).length > 50 ? `${getProjectsOrExperience(person).substring(0, 50)}...` : getProjectsOrExperience(person)}
                        </div>
                      ) : (
                        <span className="italic text-gray-400">None</span>
                      )}
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
          </div>
        )}

        {/* Pagination - only show if there's data */}
        {!loading && !error && filteredPeople.length > 0 && (
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
                <span className="font-medium">{filteredPeople.length}</span> of{' '}
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
        )}
      </div>
    </div>;
};
export default People;