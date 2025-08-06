import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  FileText,
  Link as LinkIcon,
  RefreshCw,
  Download,
  ExternalLink,
  FileCheck
} from 'lucide-react';


type Purpose =
  | 'Submit new project ideas'
  | 'Register for workshops and events'
  | 'Apply to become a mentor'
  | 'Request lab or equipment time'
  | 'Apply for project funding'

interface FormEntry {
  Purpose: Purpose
  Timestamp: number
  Name: string
  'Mail Id': string
  'Institution Name': string
  Abstract: string
  'Idea Title': string
  'Mobile Number': number
  __rowNum__: number
  'Designation ': string
}

interface SummaryRow {
  purpose: Purpose
  totalSubmissions: number
  lastSubmission: string // formatted date or '-'
  pendingReview: number  // wherever you get this
  id: Purpose            // use purpose as key
}

const allPurposes: Purpose[] = [
  'Submit new project ideas',
  'Register for workshops and events',
  'Apply to become a mentor',
  'Request lab or equipment time',
  'Apply for project funding',
]

// Excel serial → JS Date
function excelDateToJSDate(serial: number): Date {
  // Excel’s “zero” is 1899‑12‑30, so subtract 25569 days to get to Unix epoch:
  const utcDays = serial - 25569
  const utcSeconds = utcDays * 86400
  const date = new Date(utcSeconds * 1000)

  // handle fraction of day
  const fractionalDay = serial - Math.floor(serial)
  const totalSeconds = Math.floor(86400 * fractionalDay + 0.5)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  date.setHours(hours, minutes, seconds)
  return date
}


// URL to your published Excel (e.g., Google Sheets export link or raw .xlsx URL)

// Add mock data for formsData and submissionsData
const formsData = [
  { id: '1', name: 'Project Proposal', purpose: 'Project', totalSubmissions: 12, pendingReview: 2, lastSubmission: '2024-06-01 10:00' },
  { id: '2', name: 'Resource Booking', purpose: 'Resource', totalSubmissions: 8, pendingReview: 1, lastSubmission: '2024-06-02 14:30' },
];
const submissionsData = [
  { id: '1', timestamp: '2024-06-01 10:00', name: 'Sarah Chen', email: 'schen@university.edu', designation: 'Student', linkedProject: 'AI for Sustainable Agriculture', form: 'Project Proposal' },
  { id: '2', timestamp: '2024-06-02 14:30', name: 'Mike Johnson', email: 'mjohnson@university.edu', designation: 'Mentor', linkedProject: 'Smart City Solutions', form: 'Resource Booking' },
];

// Utility: load and parse spreadsheet

// Summarize form stats from submissions


const GoogleFormsHub = () => {
  const [activeTab, setActiveTab] = useState('forms');
  const [searchTerm, setSearchTerm] = useState('');
  const [formFilter, setFormFilter] = useState('All Forms');
  const [designationFilter, setDesignationFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

 const [allForms, setAllForms] = useState<FormEntry[]>([])

  const [formsSummary, setFormsSummary] = useState<SummaryRow[]>(() =>
    allPurposes.map(p => ({
      id: p,
      purpose: p,
      totalSubmissions: 0,
      lastSubmission: '-',
      pendingReview: 0,       // default; replace if you compute it elsewhere
    }))
  )

      useEffect(() => {
        const fetchData = async () => {
          try {
            const SHEET_URL =
              'https://docs.google.com/spreadsheets/d/1an81eaGBYlCnvTr65o1fih47Sfg504o6NKNP1wuV8GQ/export?format=xlsx'
            const res = await fetch(SHEET_URL)
            const buf = await res.arrayBuffer()

            const wb = XLSX.read(buf, { type: 'array' })
            const ws = wb.Sheets[wb.SheetNames[0]]
            const raw = XLSX.utils.sheet_to_json(ws, { defval: null }) as FormEntry[]

            // init counters & tracking
            const counts: Record<Purpose, number> = Object.fromEntries(
              allPurposes.map(p => [p, 0])
            ) as Record<Purpose, number>

            const latestTs: Record<Purpose, number | null> = Object.fromEntries(
              allPurposes.map(p => [p, null])
            ) as Record<Purpose, number | null>

            // tally
            raw.forEach(e => {
              const p = e.Purpose
              const ts = e.Timestamp
              if (!counts.hasOwnProperty(p)) return

              counts[p]++
              if (latestTs[p] === null || ts > latestTs[p]!) {
                latestTs[p] = ts
              }
            })

            // build summary array
            const summary = allPurposes.map(p => {
              const ts = latestTs[p]
              return {
                id: p,
                purpose: p,
                totalSubmissions: counts[p],
                lastSubmission: ts
                  ? excelDateToJSDate(ts).toLocaleString()
                  : '-',
                pendingReview: 0, // or compute here if you have that data
              }
            })

            setFormsSummary(summary)
            console.log('Forms summary:', summary)
          } catch (err) {
            console.error('Error loading sheet:', err)
          }
        }

        fetchData()
      }, [])

        useEffect(() => {
        const fetchData = async () => {
          try {
            const SHEET_URL =
              'https://docs.google.com/spreadsheets/d/1an81eaGBYlCnvTr65o1fih47Sfg504o6NKNP1wuV8GQ/export?format=xlsx'
            const res = await fetch(SHEET_URL)
            const buf = await res.arrayBuffer()

            const wb = XLSX.read(buf, { type: 'array' })
            const ws = wb.Sheets[wb.SheetNames[0]]
            const raw = XLSX.utils.sheet_to_json(ws, { defval: null }) as any[]
            console.log('Raw data:', raw);
            setAllForms(raw)
          } catch (err) {
            console.error('Error loading sheet:', err)
          }
        }

        fetchData()
      }, [])


  return <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Google Forms Hub</h2>
        <p className="text-gray-500 mt-1">
          Manage form integrations and view submissions
        </p>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button className={`py-3 px-6 font-medium text-sm ${activeTab === 'forms' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('forms')}>
          Form Directory
        </button>
        <button className={`py-3 px-6 font-medium text-sm ${activeTab === 'submissions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('submissions')}>
          Submission Explorer
        </button>
      </div>
      {activeTab === 'forms' ? <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search forms..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <div className="flex items-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                  <LinkIcon size={18} className="mr-2" />
                  Connect New Form
                </button>
              </div>
            </div>
          </div>
          {/* Forms table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Form Name
                  </th>
                  {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purpose
                  </th> */}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Submissions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pending Review
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Submission
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead> 
              <tbody className="bg-white divide-y divide-gray-200">
                  {formsSummary.map(form => (
                    <tr key={form.id} className="hover:bg-gray-50">
                      {/* Purpose */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center">
                            <FileText size={16} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {form.purpose}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Purpose (again?) */}
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{form.purpose}</div>
                      </td> */}

                      {/* Total submissions */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {form.totalSubmissions}
                        </div>
                      </td>

                      {/* Pending review */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.pendingReview > 0 ? (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {form.pendingReview} pending
                          </span>
                        ) : (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            All reviewed
                          </span>
                        )}
                      </td>

                      {/* Last submission */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {form.lastSubmission}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => {
                              // setActiveTab('submissions')
                            }}
                          >
                            <FileCheck size={18} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <LinkIcon size={18} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <RefreshCw size={18} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        </div> : <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Search and filters */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search submissions..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md px-3 py-2" onClick={() => setShowFilters(!showFilters)}>
                  <Filter size={18} className="mr-2" />
                  Filters
                  <ChevronDown size={16} className="ml-2" />
                </button>
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={formFilter} onChange={e => setFormFilter(e.target.value)}>
                  <option value="All Forms">All Forms</option>
                  {formsData.map(form => <option key={form.id} value={form.name}>
                      {form.name}
                    </option>)}
                </select>
              </div>
            </div>
            {showFilters && <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <select className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={designationFilter} onChange={e => setDesignationFilter(e.target.value)}>
                    <option value="All">All Designations</option>
                    <option value="Student">Student</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Corporate Partner">Corporate Partner</option>
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
                    Linked Status
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input type="radio" id="all" name="linkStatus" className="text-blue-600 focus:ring-blue-500" defaultChecked />
                      <label htmlFor="all" className="ml-2 text-sm text-gray-700">
                        All
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="linked" name="linkStatus" className="text-blue-600 focus:ring-blue-500" />
                      <label htmlFor="linked" className="ml-2 text-sm text-gray-700">
                        Linked
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="unlinked" name="linkStatus" className="text-blue-600 focus:ring-blue-500" />
                      <label htmlFor="unlinked" className="ml-2 text-sm text-gray-700">
                        Unlinked
                      </label>
                    </div>
                  </div>
                </div>
              </div>}
          </div>
          <div className="flex flex-col lg:flex-row">
            {/* Submissions table */}
            <div className="lg:w-3/4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Designation
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Linked Project
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Form
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {allForms.map(entry => (
                      <tr
                        key={entry.__rowNum__}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          /* e.g. select this entry or navigate */
                        }}
                      >
                        {/* Timestamp */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {excelDateToJSDate(entry.Timestamp).toLocaleString()}
                        </td>

                        {/* Name */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {entry.Name}
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {entry['Mail Id']}
                          </div>
                        </td>

                        {/* Institution */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {entry['Designation ']}
                          </div>
                        </td>

                        {/* Idea Title */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {entry['Idea Title']}
                          </div>
                        </td>

                        {/* Abstract */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {entry.Abstract}
                          </div>
                        </td>

                        {/* Purpose */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {entry.Purpose}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <FileCheck size={18} />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <LinkIcon size={18} />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <RefreshCw size={18} />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <MoreHorizontal size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            </div>
            {/* Preview panel */}
            <div className="lg:w-1/4 border-l border-gray-200 p-4 bg-gray-50 hidden lg:block">
              <div className="text-center text-gray-500 h-full flex flex-col items-center justify-center">
                <FileText size={40} className="text-gray-400 mb-3" />
                <h3 className="font-medium text-gray-700">
                  Select a submission to preview
                </h3>
                <p className="text-sm mt-1">
                  View response details and take actions
                </p>
              </div>
            </div>
          </div>
          {/* Bulk actions */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-700">Select all</span>
              <div className="ml-4 flex space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm flex items-center">
                  <FileCheck size={14} className="mr-1" /> Convert to Project
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm flex items-center">
                  <Download size={14} className="mr-1" /> Export CSV
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">
                1-5 of 32 submissions
              </span>
              <button className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default GoogleFormsHub;