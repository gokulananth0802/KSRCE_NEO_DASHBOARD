import { Activity, Users, DollarSign, Calendar, FileText, CheckCircle, AlertTriangle, Clock, Plus, Eye, PlusCircle, FileCode2 } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import ChartCard from '../components/dashboard/ChartCard';
import ProjectStatusChart from '../components/dashboard/ProjectStatusChart';
import FormSubmissionsChart from '../components/dashboard/FormSubmissionsChart';
import ResourceUtilizationChart from '../components/dashboard/ResourceUtilizationChart';
import FundingPipelineChart from '../components/dashboard/FundingPipelineChart';
import AlertItem from '../components/dashboard/AlertItem';
import ActivityItem from '../components/dashboard/ActivityItem';
import QuickActionButton from '../components/dashboard/QuickActionButton';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  return <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-500 mt-1">
          Monitor key metrics and activities across the Innovation Hub
        </p>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Projects" value="24" icon={<Activity size={20} className="text-blue-600" />} iconBgColor="bg-blue-100" trend={{
        value: '+3',
        isPositive: true
      }} footer={<Link to="/projects" className="text-blue-600 text-sm flex items-center hover:underline">
              View all projects <span className="ml-1">→</span>
            </Link>} />
        <StatCard title="Team Participation" value="156" subtitle="members" icon={<Users size={20} className="text-purple-600" />} iconBgColor="bg-purple-100" footer={<div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>mentor-1:4 student ratio</span>
              </div>
              <div className="flex space-x-2">
                <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                  31 mentors
                </div>
                <div className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">
                  125 students
                </div>
              </div>
              <Link to="/people" className="text-blue-600 text-sm flex items-center mt-2 hover:underline">
                View all people <span className="ml-1">→</span>
              </Link>
            </div>} />
        <StatCard title="Funding Overview" value="₹42.5K" subtitle="/ ₹75K" icon={<DollarSign size={20} className="text-green-600" />} iconBgColor="bg-green-100" footer={<div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{
            width: '56%'
          }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>56% of budget utilized</span>
                <span>₹32.5K remaining</span>
              </div>
              <Link to="/funding" className="text-blue-600 text-sm flex items-center mt-2 hover:underline">
                View funding details <span className="ml-1">→</span>
              </Link>
            </div>} />
        <StatCard title="Upcoming Events" value="8" subtitle="next 30 days" icon={<Calendar size={20} className="text-amber-600" />} iconBgColor="bg-amber-100" footer={<div>
              <div className="flex items-center text-sm mt-2">
                <Clock size={14} className="mr-1 text-gray-500" />
                <span className="text-gray-700">Next: </span>
                <span className="ml-1 font-medium">AI Workshop (Tomorrow)</span>
              </div>
              <Link to="/events" className="text-blue-600 text-sm flex items-center mt-2 hover:underline">
                View all events <span className="ml-1">→</span>
              </Link>
            </div>} />
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard title="Project Status">
            <ProjectStatusChart />
          </ChartCard>
          <ChartCard title="Form Submissions">
            <FormSubmissionsChart />
          </ChartCard>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard title="Resource Utilization">
            <ResourceUtilizationChart />
          </ChartCard>
          <ChartCard title="Funding Pipeline">
            <FundingPipelineChart />
          </ChartCard>
        </div>
      </div>
      {/* Alerts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Alerts & Approvals" actions={<div className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
              5 pending
            </div>}>
          <div className="space-y-2">
            <AlertItem title="New Project Proposal" description='"AI for Sustainable Agriculture" by Team EcoTech' time="2 hours ago" color="#FFCA28" actions={<>
                  <button className="px-3 py-1 bg-green-100 text-green-600 rounded-md text-sm flex items-center">
                    <CheckCircle size={14} className="mr-1" /> Approve
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm flex items-center">
                    <Eye size={14} className="mr-1" /> Review
                  </button>
                </>} />
            <AlertItem title="Resource Booking Conflict" description="3D Printer double-booked on July 15, 2-4pm" time="Yesterday" color="#EF4444" actions={<>
                  <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm flex items-center">
                    <Calendar size={14} className="mr-1" /> Reschedule
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm flex items-center">
                    <Users size={14} className="mr-1" /> Contact
                  </button>
                </>} />
            <AlertItem title="Grant Application" description='₹2,500 requested for "Smart City Solutions" project' time="2 days ago" color="#3B82F6" actions={<>
                  <button className="px-3 py-1 bg-green-100 text-green-600 rounded-md text-sm flex items-center">
                    <CheckCircle size={14} className="mr-1" /> Approve
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm flex items-center">
                    <Eye size={14} className="mr-1" /> Review
                  </button>
                </>} />
          </div>
        </ChartCard>
        <div className="space-y-6">
          <ChartCard title="Recent Activity" actions={<button className="text-gray-500 hover:text-gray-700 text-sm">
                Filter
              </button>}>
            <div className="space-y-1">
              <ActivityItem icon={<FileText size={16} />} title="Sarah Chen submitted Project Proposal via Form" time="10 minutes ago" />
              <ActivityItem icon={<Users size={16} />} title="Dr. James Wilson assigned as mentor to Quantum Computing project" time="1 hour ago" />
              <ActivityItem icon={<Calendar size={16} />} title="Electronics Lab booked by Team RoboHelp for Friday" time="3 hours ago" />
              <ActivityItem icon={<DollarSign size={16} />} title="₹1,200 funding approved for Biodegradable Plastics project" time="Yesterday" />
              <ActivityItem icon={<Activity size={16} />} title="Monthly report for June 2023 is now available" time="Yesterday" />
            </div>
            <div className="mt-3 text-right">
              <Link to="/notifications" className="text-blue-600 text-sm hover:underline">
                View all activity
              </Link>
            </div>
          </ChartCard>
          <ChartCard title="Quick Actions">
            <div className="grid grid-cols-3 gap-3">
              <QuickActionButton icon={<Plus size={18} />} label="New Project" onClick={() => {}} />
              <QuickActionButton icon={<Calendar size={18} />} label="Schedule Event" onClick={() => {}} />
              <QuickActionButton icon={<FileText size={18} />} label="New Booking" onClick={() => {}} />
            </div>
          </ChartCard>
        </div>
      </div>
    </div>;
};
export default Dashboard;