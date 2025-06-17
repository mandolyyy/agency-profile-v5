// src/App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../components/Sidebar";
import '../pages/css/profile.css';
import AgencyPanel from "../pages/Dashboard";
import AdminPanel from "../adminPages/AdminDashboard";
import AddAgency from "../adminPages/AddAgency"; // optional, test

function App() {
  const [agency, setAgency] = useState(null);
  const [form, setForm] = useState({ phone: '', address: '', about: '', logo: null });
  const [selectedAgencyId, setSelectedAgencyId] = useState(1);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

 

  // ✅ Load agency when selectedAgencyId changes
  useEffect(() => {
    axios.get(`http://localhost:3001/agency/${selectedAgencyId}`).then((res) => {
      setAgency(res.data);
      setForm({
        phone: res.data.phone || '',
        address: res.data.address || '',
        about: res.data.about || '',
        logo: null,
      });
    }).catch(err => {
      console.error("❌ Error loading agency:", err);
      setAgency(null);
    });
  }, [selectedAgencyId]); // 👈 Reacts to ID change

  // ✅ Handle agency dropdown selection
  const handleSelectChange = (e) => {
    setSelectedAgencyId(Number(e.target.value));
  };


 const handleSubmit = (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append("phone", form.phone);
  data.append("address", form.address);
  data.append("about", form.about);
  if (form.logo) data.append("logo", form.logo);

  axios
    .post("http://localhost:3001/update-agency", data)


    .then(() => alert("✅ Agency updated!"))
    .catch((err) => {
      console.error("❌ Upload error:", err);
      alert("❌ Update failed");
    });
    
};



  if (!agency) return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-wrapper">
      <div className="main">
        <h2 className="text-xl font-bold mb-4">Agency Profile</h2>
         {/* 🖼️ Logo Image for User ID 2 */}
          {agency.logo && (
          <div className="logo-container">
            <img
              src={`http://localhost:3001/uploads/${agency.logo}`}
              alt="Agency Logo"
              className="agency-logo"
            />
          </div>
        )}

        <div className="dropdown-container">
        <label>Select Agency for Testing:(this is only dev testing function. rm when deploy) </label>
        <select value={selectedAgencyId} onChange={handleSelectChange}>
          <option value="1">Agency 1</option>
          <option value="2">Agency 2</option>
          <option value="3">Agency 3</option>
        </select>
      </div>
        
        {/* Prefilled Info Box */}
        <div className="header-box">
          <p>Agency Name: {agency.name}</p>
          <p>Agency Email: {agency.email}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label>Agency Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label>Agency Address:</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>

          <div>
            <label>About your agency:</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              placeholder="Describe the agency..."
            />
          </div>

          <div>
            <label>Agency Logo:</label>
            <div className="upload-box">
              <input type="file" name="logo" onChange={handleChange} />
              <p>Drop a file here or click to browse</p>
            </div>
          </div>

          <button type="submit">💾 Save Changes</button>
        </form>
      </div>
      </div>
    </div>
  );
  
}

export default App;
