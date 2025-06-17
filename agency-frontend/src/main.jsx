import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./components/Sidebar.css";
import Profile from './pages/Profile';           // agency profile page
import AdminDashboard from './adminPages/AdminDashboard'; // example admin page
import AddAgency from './adminPages/AddAgency';
import ViewAgencies from "./adminPages/ViewAgencies";
import EditAgency from "./adminPages/EditAgency";
import AddPost from './pages/AddPost'; // optional, test
import AdminAddPost from "./adminPages/AddPostAgency";
import ManagePosts from './adminPages/ManagePosts';
import EditPost from "./adminPages/EditPost";
import AgencyManagePosts from "./pages/AgencyManagePosts";
import AgencyEditPost from "./pages/AgencyEditPost"; // agency post edit page



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/agency" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-agency" element={<AddAgency />} />
        <Route path="/admin/view-agencies" element={<ViewAgencies />} />
        <Route path="/admin/edit-agency/:id" element={<EditAgency />} />
        <Route path="/pages/AddPost" element={<AddPost />} />
        <Route path="/admin/add-post" element={<AdminAddPost />} />
        <Route path="/admin/view-posts" element={<ManagePosts />} />
        <Route path="/agency-manage-posts" element={<AgencyManagePosts />} />
        <Route path="/edit-post/:id" element={<AgencyEditPost />} />


      <Route path= "/admin/edit-post/:id" element= {<EditPost />} />

        

        {/* Optional: fallback route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
