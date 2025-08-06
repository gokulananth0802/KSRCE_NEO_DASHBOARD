import { useState } from 'react';
import { Save, Bell, User, Lock, Mail, Database, FileText, Users, Globe, HelpCircle, AlertTriangle, Check } from 'lucide-react';
const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      newProject: true,
      resourceBooking: true,
      fundingUpdate: true,
      newMember: false,
      eventReminder: true,
      systemUpdate: false
    },
    push: {
      newProject: true,
      resourceBooking: true,
      fundingUpdate: false,
      newMember: true,
      eventReminder: true,
      systemUpdate: true
    }
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const handleToggleNotification = (channel, setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [channel]: {
        ...notificationSettings[channel],
        [setting]: !notificationSettings[channel][setting]
      }
    });
  };
  const handleSave = () => {
    // In a real app, this would save to a database
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <p className="text-gray-500 mt-1">
            Manage your preferences and system settings
          </p>
        </div>
        <button onClick={handleSave} className={`flex items-center ₹{saveSuccess ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-md`}>
          {saveSuccess ? <>
              <Check size={18} className="mr-2" />
              Saved
            </> : <>
              <Save size={18} className="mr-2" />
              Save Changes
            </>}
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar navigation */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            <nav className="space-y-1">
              <button className={`w-full flex items-center px-4 py-3 rounded-md ₹{activeTab === 'notifications' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('notifications')}>
                <Bell size={18} className="mr-3" />
                <span className="text-sm font-medium">
                  Notification Settings
                </span>
              </button>
              <button className={`w-full flex items-center px-4 py-3 rounded-md ₹{activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('profile')}>
                <User size={18} className="mr-3" />
                <span className="text-sm font-medium">Profile Settings</span>
              </button>
              <button className={`w-full flex items-center px-4 py-3 rounded-md ₹{activeTab === 'security' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('security')}>
                <Lock size={18} className="mr-3" />
                <span className="text-sm font-medium">Security</span>
              </button>
              <button className={`w-full flex items-center px-4 py-3 rounded-md ₹{activeTab === 'email' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('email')}>
                <Mail size={18} className="mr-3" />
                <span className="text-sm font-medium">Email Templates</span>
              </button>
              <button className={`w-full flex items-center px-4 py-3 rounded-md ₹{activeTab === 'data' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('data')}>
                <Database size={18} className="mr-3" />
                <span className="text-sm font-medium">Data Management</span>
              </button>
              <button className={`w-full flex items-center px-4 py-3 rounded-md ₹{activeTab === 'forms' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('forms')}>
                <FileText size={18} className="mr-3" />
                <span className="text-sm font-medium">Form Settings</span>
              </button>
              <button className={`w-full flex items-center px-4 py-3 rounded-md ₹{activeTab === 'roles' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('roles')}>
                <Users size={18} className="mr-3" />
                <span className="text-sm font-medium">Roles & Permissions</span>
              </button>
              <button className={`w-full flex items-center px-4 py-3 rounded-md ₹{activeTab === 'integrations' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('integrations')}>
                <Globe size={18} className="mr-3" />
                <span className="text-sm font-medium">Integrations</span>
              </button>
              <button className={`w-full flex items-center px-4 py-3 rounded-md ₹{activeTab === 'help' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('help')}>
                <HelpCircle size={18} className="mr-3" />
                <span className="text-sm font-medium">Help & Support</span>
              </button>
            </nav>
          </div>
        </div>
        {/* Settings content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {activeTab === 'notifications' && <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Notification Preferences
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Configure how and when you receive notifications from the
                  Innovation Hub.
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Email Notifications
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor="email-new-project" className="text-sm text-gray-700">
                          New project proposals
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="email-new-project" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={notificationSettings.email.newProject} onChange={() => handleToggleNotification('email', 'newProject')} />
                          <label htmlFor="email-new-project" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ₹{notificationSettings.email.newProject ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="email-resource-booking" className="text-sm text-gray-700">
                          Resource booking confirmations
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="email-resource-booking" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={notificationSettings.email.resourceBooking} onChange={() => handleToggleNotification('email', 'resourceBooking')} />
                          <label htmlFor="email-resource-booking" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ₹{notificationSettings.email.resourceBooking ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="email-funding-update" className="text-sm text-gray-700">
                          Funding application updates
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="email-funding-update" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={notificationSettings.email.fundingUpdate} onChange={() => handleToggleNotification('email', 'fundingUpdate')} />
                          <label htmlFor="email-funding-update" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ₹{notificationSettings.email.fundingUpdate ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="email-new-member" className="text-sm text-gray-700">
                          New member registrations
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="email-new-member" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={notificationSettings.email.newMember} onChange={() => handleToggleNotification('email', 'newMember')} />
                          <label htmlFor="email-new-member" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ₹{notificationSettings.email.newMember ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="email-event-reminder" className="text-sm text-gray-700">
                          Event reminders
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="email-event-reminder" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={notificationSettings.email.eventReminder} onChange={() => handleToggleNotification('email', 'eventReminder')} />
                          <label htmlFor="email-event-reminder" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ₹{notificationSettings.email.eventReminder ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="email-system-update" className="text-sm text-gray-700">
                          System updates and maintenance
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="email-system-update" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={notificationSettings.email.systemUpdate} onChange={() => handleToggleNotification('email', 'systemUpdate')} />
                          <label htmlFor="email-system-update" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ₹{notificationSettings.email.systemUpdate ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Push Notifications
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor="push-new-project" className="text-sm text-gray-700">
                          New project proposals
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="push-new-project" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={notificationSettings.push.newProject} onChange={() => handleToggleNotification('push', 'newProject')} />
                          <label htmlFor="push-new-project" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ₹{notificationSettings.push.newProject ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="push-resource-booking" className="text-sm text-gray-700">
                          Resource booking confirmations
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="push-resource-booking" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={notificationSettings.push.resourceBooking} onChange={() => handleToggleNotification('push', 'resourceBooking')} />
                          <label htmlFor="push-resource-booking" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ₹{notificationSettings.push.resourceBooking ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="push-funding-update" className="text-sm text-gray-700">
                          Funding application updates
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="push-funding-update" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={notificationSettings.push.fundingUpdate} onChange={() => handleToggleNotification('push', 'fundingUpdate')} />
                          <label htmlFor="push-funding-update" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ₹{notificationSettings.push.fundingUpdate ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="push-new-member" className="text-sm text-gray-700">
                          New member registrations
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="push-new-member" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={notificationSettings.push.newMember} onChange={() => handleToggleNotification('push', 'newMember')} />
                          <label htmlFor="push-new-member" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ₹{notificationSettings.push.newMember ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="push-event-reminder" className="text-sm text-gray-700">
                          Event reminders
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="push-event-reminder" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={notificationSettings.push.eventReminder} onChange={() => handleToggleNotification('push', 'eventReminder')} />
                          <label htmlFor="push-event-reminder" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ₹{notificationSettings.push.eventReminder ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="push-system-update" className="text-sm text-gray-700">
                          System updates and maintenance
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="push-system-update" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={notificationSettings.push.systemUpdate} onChange={() => handleToggleNotification('push', 'systemUpdate')} />
                          <label htmlFor="push-system-update" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ₹{notificationSettings.push.systemUpdate ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium textgray-700 mb-3">
                      Notification Frequency
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="frequency" className="block text-sm text-gray-700 mb-1">
                          Email Digest Frequency
                        </label>
                        <select id="frequency" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="immediate">Immediate</option>
                          <option value="daily">Daily Digest</option>
                          <option value="weekly">Weekly Digest</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="quiet-hours" className="block text-sm text-gray-700 mb-1">
                          Quiet Hours
                        </label>
                        <div className="flex items-center space-x-2">
                          <select id="quiet-hours-from" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="20">8:00 PM</option>
                            <option value="21">9:00 PM</option>
                            <option value="22">10:00 PM</option>
                            <option value="23">11:00 PM</option>
                          </select>
                          <span>to</span>
                          <select id="quiet-hours-to" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="6">6:00 AM</option>
                            <option value="7">7:00 AM</option>
                            <option value="8">8:00 AM</option>
                            <option value="9">9:00 AM</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            {activeTab === 'profile' && <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Profile Settings
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Manage your personal information and preferences.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xl">
                      JD
                    </div>
                    <div className="ml-4">
                      <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
                        Change Photo
                      </button>
                      <button className="ml-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input type="text" id="first-name" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" defaultValue="John" />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input type="text" id="last-name" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" defaultValue="Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input type="email" id="email" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" defaultValue="john.doe@example.com" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input type="tel" id="phone" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" defaultValue="(123) 456-7890" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select id="role" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="coordinator">Coordinator</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea id="bio" rows={4} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" defaultValue="Innovation Hub administrator with 5+ years of experience managing technology incubation programs."></textarea>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Preferences
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input type="checkbox" id="public-profile" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked={true} />
                        <label htmlFor="public-profile" className="ml-2 text-sm text-gray-700">
                          Make my profile visible to team members
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="show-email" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked={false} />
                        <label htmlFor="show-email" className="ml-2 text-sm text-gray-700">
                          Show my email address on my profile
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="available-mentor" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked={true} />
                        <label htmlFor="available-mentor" className="ml-2 text-sm text-gray-700">
                          Available as a mentor for new projects
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            {activeTab === 'security' && <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Security Settings
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Manage your account security and authentication preferences.
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Change Password
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input type="password" id="current-password" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input type="password" id="new-password" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input type="password" id="confirm-password" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Two-Factor Authentication
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-700">
                            Enable two-factor authentication
                          </div>
                          <div className="text-xs text-gray-500">
                            Add an extra layer of security to your account
                          </div>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="enable-2fa" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                          <label htmlFor="enable-2fa" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Session Management
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-700">
                          Currently logged in devices
                        </div>
                        <div className="mt-2 border border-gray-200 rounded-md">
                          <div className="p-3 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium">
                                  Chrome on Windows
                                </div>
                                <div className="text-xs text-gray-500">
                                  Current session • Last active: Now
                                </div>
                              </div>
                              <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                Current
                              </div>
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium">
                                  Safari on iPhone
                                </div>
                                <div className="text-xs text-gray-500">
                                  Last active: 2 days ago
                                </div>
                              </div>
                              <button className="text-xs text-red-600 hover:text-red-800">
                                Logout
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <button className="text-sm text-red-600 hover:text-red-800">
                            Logout of all other sessions
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex">
                      <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Security Recommendations
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              Enable two-factor authentication for enhanced
                              security
                            </li>
                            <li>
                              Use a strong, unique password for your account
                            </li>
                            <li>Regularly review your login sessions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            {activeTab !== 'notifications' && activeTab !== 'profile' && activeTab !== 'security' && <div className="text-center py-12">
                  <div className="p-4 rounded-full bg-blue-100 inline-flex items-center justify-center mb-4">
                    {activeTab === 'email' && <Mail size={32} className="text-blue-600" />}
                    {activeTab === 'data' && <Database size={32} className="text-blue-600" />}
                    {activeTab === 'forms' && <FileText size={32} className="text-blue-600" />}
                    {activeTab === 'roles' && <Users size={32} className="text-blue-600" />}
                    {activeTab === 'integrations' && <Globe size={32} className="text-blue-600" />}
                    {activeTab === 'help' && <HelpCircle size={32} className="text-blue-600" />}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Setting up {activeTab}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                    This section is currently being developed. Check back soon
                    for updates!
                  </p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Learn More
                  </button>
                </div>}
          </div>
        </div>
      </div>
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #fff;
        }
        .toggle-label {
          transition: background-color 0.2s ease;
        }
      `}</style>
    </div>;
};
export default Settings;