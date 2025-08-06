import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileCode2,
  FileSpreadsheet,
  Users,
  Calendar,
  Laptop,
  BanknoteIcon,
  BarChart2,
  Bell,
  Settings as SettingsIcon,
  Menu,
  Lightbulb,
  X,
} from "lucide-react";

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/projects", label: "Projects", icon: <FileCode2 size={20} /> },
    { path: "/forms", label: "Google Forms Hub", icon: <FileSpreadsheet size={20} /> },
    { path: "/people", label: "People", icon: <Users size={20} /> },
    { path: "/events", label: "Events & Workshops", icon: <Calendar size={20} /> },
    { path: "/resources", label: "Resources & Bookings", icon: <Laptop size={20} /> },
    { path: "/funding", label: "Funding & Grants", icon: <BanknoteIcon size={20} /> },
    { path: "/analytics", label: "Analytics & Reports", icon: <BarChart2 size={20} /> },
    { path: "/notifications", label: "Notifications", icon: <Bell size={20} /> },
    { path: "/settings", label: "Settings", icon: <SettingsIcon size={20} /> },
  ];

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${collapsed ? "w-16" : "w-64"} hidden md:flex flex-col bg-blue-800 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          {!collapsed ? (
            <div onClick={() => { toggleSidebar(); }} className="flex items-center cursor-pointer">
              <div className="p-2 bg-white rounded-md">
                <Lightbulb size={24} className="text-blue-800" />
              </div>
              <div className="ml-2">
                <h2 className="text-lg font-bold">Innovation Hub</h2>
                <p className="text-xs text-blue-200">Admin Panel</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => { setExpanded(!expanded); toggleSidebar(); }}
              className="mx-auto p-1 bg-white rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <Lightbulb size={20} className="text-blue-800" />
            </button>
          )}
          <button
            onClick={() => { setExpanded(expanded); toggleSidebar(); }}
            className={`text-white p-1 rounded hover:bg-blue-700 ${collapsed ? "invisible" : ""}`}
          >
            <Menu size={20} />
          </button>
        </div>

        <div
          className={`overflow-y-hidden hover:overflow-y-auto scrollbar-thin scrollbar-track-blue-900 scrollbar-thumb-blue-700 transition-all duration-300 ${expanded ? 'max-h-[600px]' : 'max-h-[370px]'}`}
        >
          <nav className="mt-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center py-3 px-4 transition-colors duration-200 ${location.pathname === item.path ? "bg-blue-900 border-l-4 border-white" : "hover:bg-blue-900"}`}
              >
                <div className="mr-3">{item.icon}</div>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {!collapsed && (
          <div className="p-4 bg-blue-900">
            <h3 className="text-white font-medium">Need Help?</h3>
            <button className="mt-3 w-full py-2 px-4 bg-blue-700 hover:bg-blue-600 rounded text-sm">
              View Documentation
            </button>
          </div>
        )}
      </div>

      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="bg-blue-800 text-white w-64 h-full">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-white rounded-md">
                  <Lightbulb size={24} className="text-blue-800" />
                </div>
                <div className="ml-2">
                  <h2 className="text-lg font-bold">Innovation Hub</h2>
                  <p className="text-xs text-blue-200">Admin Panel</p>
                </div>
              </div>
              <button onClick={toggleMobileMenu} className="text-white p-1 rounded hover:bg-blue-700">
                <X size={20} />
              </button>
            </div>
            <nav className="mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={toggleMobileMenu}
                  className={`flex items-center py-3 px-4 transition-colors duration-200 ${location.pathname === item.path ? "bg-blue-900 border-l-4 border-white" : "hover:bg-blue-900"}`}
                >
                  <div className="mr-3">{item.icon}</div>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={toggleMobileMenu} className="md:hidden mr-4 text-gray-600">
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                {navItems.find((item) => item.path === location.pathname)?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center relative">
              <div className="relative mr-4">
                <Bell size={20} className="text-gray-600 cursor-pointer" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              </div>
              <div onClick={() => setProfileOpen(!profileOpen)} className="flex items-center cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                  JD
                </div>
                <div className="ml-2 hidden md:block">
                  <div className="text-sm font-semibold text-gray-700">John Doe</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
              </div>
              {profileOpen && (
                <div className="absolute right-0 mt-12 w-40 bg-white border rounded-md shadow-lg py-1 z-20">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;