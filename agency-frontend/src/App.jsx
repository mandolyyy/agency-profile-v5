// src/App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import './App.css';
import AgencyPanel from "./pages/AgencyPanel";
import AdminPanel from "./pages/AdminPanel";
import AddAgency from "./pages/AddAgency"; // optional, test

function App() {
  const [agency, setAgency] = useState(null);
  const [form, setForm] = useState({
    phone: '',
    address: '',
    about: '',
    logo: null,
  });

  

  useEffect(() => {
    axios.get('http://localhost:3001/agency').then((res) => {
      setAgency(res.data);
      setForm({
        phone: res.data.phone || '',
        address: res.data.address || '',
        about: res.data.about || '',
        logo: null,
      });
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
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
      <div className="main">
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
  );
  
}

export default App;
