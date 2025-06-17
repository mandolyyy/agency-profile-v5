// src/adminPages/AddAgency.jsx
import { useState } from 'react';
import axios from 'axios';
import './css/admin.css';
import AdminSidebar from "../components/AdminSidebar";

function AddAgency() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    about: '',
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (const key in form) {
        data.append(key, form[key]);
      }

      await axios.post('http://localhost:3001/admin/add-agency', data);
      alert('✅ Agency added successfully');
    } catch (err) {
      console.error('❌ Add failed:', err);
      alert('❌ Add agency failed');
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
    <div className="admin-container">
      <h2>Add New Agency</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Agency Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <textarea name="about" placeholder="About the agency" onChange={handleChange}></textarea>
        <input type="file" name="logo" onChange={handleChange} />
        <button type="submit">➕ Add Agency</button>
      </form>
    </div>
    </div>
  );
}

export default AddAgency;
