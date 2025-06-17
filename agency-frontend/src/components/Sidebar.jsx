import { Link } from "react-router-dom";
import "../components/Sidebar.css";

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <img src="/untitled.png" alt="Admin Logo" className="sidebar-logo" />
      <Link to="/agency" className="sidebar-nav">Profile</Link>
      <Link to="/pages/AddPost" className="sidebar-nav">Add Post</Link>
      <Link to="/agency-manage-posts"className="sidebar-nav">Manage Posts</Link>

      {/* <Link to="/admin/view-agencies" className="sidebar-nav">View Agencies</Link>
      <Link to="/admin/add-post" className="sidebar-nav">Add Post</Link>
      <Link to="/admin/posts" className="sidebar-nav">All Posts</Link> */}
    </div>
  );
};

export default AdminSidebar;

