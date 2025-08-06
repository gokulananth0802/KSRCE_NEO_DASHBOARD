import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import GoogleFormsHub from './pages/GoogleFormsHub';
import People from './pages/People';
import Events from './pages/Events';
import Resources from './pages/Resources';
import Funding from './pages/Funding';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import ProjectDetails from './pages/ProjectDetails';
import EventDetails from './pages/EventDetails';
import PersonDetails from './pages/PersonDetails';
import ResourceDetails from './pages/ResourceDetails';
import FundingDetails from './pages/FundingDetails';
import LoginPage from './pages/LoginPage';

export function App() {
  const isLoggedIn = Boolean(localStorage.getItem('userId'));

  return (
    <BrowserRouter>
      <Routes>
        {/* Public login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* All protected routes live under Layout */}
        <Route
          path="/"
          element={isLoggedIn ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="forms" element={<GoogleFormsHub />} />
          <Route path="people" element={<People />} />
          <Route path="people/:id" element={<PersonDetails />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<EventDetails />} />
          <Route path="resources" element={<Resources />} />
          <Route path="resources/:id" element={<ResourceDetails />} />
          <Route path="funding" element={<Funding />} />
          <Route path="funding/:id" element={<FundingDetails />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback for any other path */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? '/' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
