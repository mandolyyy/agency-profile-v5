// src/adminPages/AdminDashboard.jsx
import AdminSidebar from "../components/AdminSidebar";


const AdminDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ marginLeft: "240px", padding: "20px", flex: 1 }}>
        <h1>Welcome Admin</h1>
        <p>This is your dashboard overview.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
