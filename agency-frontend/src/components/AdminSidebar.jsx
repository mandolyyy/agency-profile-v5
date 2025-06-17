import { Link } from "react-router-dom";
import "../components/Sidebar.css";

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <img src="/untitled.png" alt="Admin Logo" className="sidebar-logo" />
      <Link to="/admin" className="sidebar-nav">Dashboard</Link>
      <Link to="/admin/add-agency" className="sidebar-nav">Add Agency</Link>
      <Link to="/admin/add-post" className="sidebar-nav">Add Post for Agency</Link>
      <Link to="/admin/view-agencies" className="sidebar-nav">View Agencies</Link>
      
      <Link to="/admin/view-posts" className="sidebar-nav">All Posts</Link>
    </div>
  );
};

export default AdminSidebar;
