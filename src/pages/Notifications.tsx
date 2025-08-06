import React, { useState } from 'react';
import {
  Bell,
  Filter,
  ChevronDown,
  FileText,
  Users,
  Calendar,
  DollarSign,
  Laptop,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Trash2,
  CheckSquare,
  Clock,
  Plus,
  Download,
  MessageSquare,
} from 'lucide-react';

// TypeScript interfaces
type NotificationType = 'project' | 'people' | 'event' | 'funding' | 'resource' | 'analytics';
type NotificationPriority = 'high' | 'medium' | 'low';
type TabType = 'all' | 'unread' | 'read';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: NotificationType;
  priority: NotificationPriority;
  time: string;
  read: boolean;
  actions: string[];
}

const notificationsData: Notification[] = [
  {
    id: '1',
    title: 'New Project Proposal',
    description: '"AI for Sustainable Agriculture" by Team EcoTech',
    type: 'project',
    priority: 'high',
    time: '2 hours ago',
    read: false,
    actions: ['approve', 'review']
  },
  {
    id: '2',
    title: 'Resource Booking Conflict',
    description: '3D Printer double-booked on July 15, 2-4pm',
    type: 'resource',
    priority: 'high',
    time: 'Yesterday',
    read: false,
    actions: ['reschedule', 'contact']
  },
  {
    id: '3',
    title: 'Grant Application',
    description: '₹2,500 requested for "Smart City Solutions" project',
    type: 'funding',
    priority: 'medium',
    time: '2 days ago',
    read: true,
    actions: ['approve', 'review']
  },
  {
    id: '4',
    title: 'New Mentor Registration',
    description: 'Dr. James Wilson registered as a mentor',
    type: 'people',
    priority: 'medium',
    time: '3 days ago',
    read: true,
    actions: ['approve', 'view profile']
  },
  {
    id: '5',
    title: 'Event Registration Full',
    description: 'AI Workshop has reached capacity (30/30)',
    type: 'event',
    priority: 'low',
    time: '4 days ago',
    read: true,
    actions: ['increase capacity', 'view registrations']
  },
  {
    id: '6',
    title: 'Monthly Report Available',
    description: 'June 2023 activity report is ready for review',
    type: 'analytics',
    priority: 'low',
    time: '1 week ago',
    read: true,
    actions: ['view report', 'download']
  },
  {
    id: '7',
    title: 'Equipment Maintenance Required',
    description: 'Laser Cutter needs maintenance check',
    type: 'resource',
    priority: 'medium',
    time: '1 week ago',
    read: true,
    actions: ['schedule maintenance', 'view details']
  },
  {
    id: '8',
    title: 'Project Milestone Achieved',
    description: 'Biodegradable Plastics project completed prototype phase',
    type: 'project',
    priority: 'low',
    time: '1 week ago',
    read: true,
    actions: ['view project', 'send congrats']
  }
];

const getTypeIcon = (type: NotificationType): JSX.Element => {
  switch (type) {
    case 'project':
      return <FileText size={18} />;
    case 'people':
      return <Users size={18} />;
    case 'event':
      return <Calendar size={18} />;
    case 'funding':
      return <DollarSign size={18} />;
    case 'resource':
      return <Laptop size={18} />;
    case 'analytics':
      return <Bell size={18} />;
    default:
      return <Bell size={18} />;
  }
};

const getTypeColor = (type: NotificationType): string => {
  switch (type) {
    case 'project':
      return 'bg-blue-100 text-blue-600';
    case 'people':
      return 'bg-purple-100 text-purple-600';
    case 'event':
      return 'bg-amber-100 text-amber-600';
    case 'funding':
      return 'bg-green-100 text-green-600';
    case 'resource':
      return 'bg-red-100 text-red-600';
    case 'analytics':
      return 'bg-indigo-100 text-indigo-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const getPriorityColor = (priority: NotificationPriority): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<NotificationType | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<NotificationPriority | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const filteredNotifications = notificationsData.filter((notification) => {
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter;
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'unread' && !notification.read) ||
      (activeTab === 'read' && notification.read);
    return matchesType && matchesPriority && matchesTab;
  });

  const unreadCount = notificationsData.filter(n => !n.read).length;

  const toggleSelectNotification = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  }

  const selectAllNotifications = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
    }
  };

  const markSelectedAsRead = () => {
    console.log('Marked as read:', selectedNotifications);
    setSelectedNotifications([]);
  };

  const deleteSelected = () => {
    console.log('Deleted:', selectedNotifications);
    setSelectedNotifications([]);
  };

  const handleAction = (action: string, notificationId: string) => {
    console.log(`Action: ₹{action} for notification: ₹{notificationId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
          <p className="text-gray-500 mt-1">Stay updated on important activities and alerts</p>
        </div>
        <button className="flex items-center text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md px-3 py-2">
          <Settings size={18} className="mr-2" />
          Notification Settings
        </button>
      </div>

      <div className="flex border-b border-gray-200">
        {(['all', 'unread', 'read'] as TabType[]).map(tab => (
          <button
            key={tab}
            className={`py-3 px-6 font-medium text-sm ₹{
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab !== 'read' && (
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ₹{
                  tab === 'all'
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {tab === 'all' ? notificationsData.length : unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={
                  selectedNotifications.length === filteredNotifications.length &&
                  filteredNotifications.length > 0
                }
                onChange={selectAllNotifications}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Select all</label>
              {selectedNotifications.length > 0 && (
                <div className="ml-4 flex items-center space-x-2">
                  <button
                    onClick={markSelectedAsRead}
                    className="flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm"
                  >
                    <CheckSquare size={14} className="mr-1" />
                    Mark as read
                  </button>
                  <button
                    onClick={deleteSelected}
                    className="flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Delete
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-600 hover:text-blue-600"
            >
              <Filter size={18} className="mr-2" />
              Filters
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as NotificationType | 'all')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="project">Projects</option>
                  <option value="people">People</option>
                  <option value="event">Events</option>
                  <option value="funding">Funding</option>
                  <option value="resource">Resources</option>
                  <option value="analytics">Analytics</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as NotificationPriority | 'all')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="divide-y divide-gray-200">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 ₹{!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => toggleSelectNotification(notification.id)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className={`ml-3 p-2 rounded-md ₹{getTypeColor(notification.type)}`}>
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                      <div className="flex items-center">
                        <span
                          className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ₹{getPriorityColor(
                            notification.priority
                          )}`}
                        >
                          {notification.priority}
                        </span>
                        <Clock size={12} className="ml-2 mr-1 text-gray-500" />
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{notification.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {notification.actions.map((action) => {
                        const buttonConfig = {
                          approve: { icon: CheckCircle, color: 'bg-green-100 text-green-600', label: 'Approve' },
                          review: { icon: FileText, color: 'bg-blue-100 text-blue-600', label: 'Review' },
                          reschedule: { icon: Calendar, color: 'bg-blue-100 text-blue-600', label: 'Reschedule' },
                          contact: { icon: Users, color: 'bg-gray-100 text-gray-600', label: 'Contact' },
                          'view profile': { icon: Users, color: 'bg-blue-100 text-blue-600', label: 'View Profile' },
                          'increase capacity': { icon: Plus, color: 'bg-green-100 text-green-600', label: 'Increase Capacity' },
                          'view registrations': { icon: Users, color: 'bg-blue-100 text-blue-600', label: 'View Registrations' },
                          'view report': { icon: FileText, color: 'bg-blue-100 text-blue-600', label: 'View Report' },
                          download: { icon: Download, color: 'bg-gray-100 text-gray-600', label: 'Download' },
                          'schedule maintenance': { icon: Calendar, color: 'bg-yellow-100 text-yellow-600', label: 'Schedule Maintenance' },
                          'view details': { icon: FileText, color: 'bg-blue-100 text-blue-600', label: 'View Details' },
                          'view project': { icon: FileText, color: 'bg-blue-100 text-blue-600', label: 'View Project' },
                          'send congrats': { icon: MessageSquare, color: 'bg-amber-100 text-amber-600', label: 'Send Congratulations' }
                        };

                        const config = buttonConfig[action as keyof typeof buttonConfig];
                        if (!config) return null;

                        const IconComponent = config.icon;
                        return (
                          <button
                            key={action}
                            onClick={() => handleAction(action, notification.id)}
                            className={`flex items-center px-3 py-1 rounded-md text-sm ₹{config.color}`}
                          >
                            <IconComponent size={14} className="mr-1" />
                            {config.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <Bell size={48} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No notifications found</h3>
              <p className="mt-1 text-sm text-gray-500">No notifications match your current filters.</p>
            </div>
          )}
        </div>

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
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{' '}
              <span className="font-medium">12</span> notifications
            </p>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
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
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;