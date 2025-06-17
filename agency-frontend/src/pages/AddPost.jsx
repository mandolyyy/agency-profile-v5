// src/pages/AddPost.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import '../pages/css/profile.css';

function AddPost() {
  const [form, setForm] = useState({
    agency_id: "",
    country: "",
    region: "",
    title: "",
    description: "",
    pictures: [],
  });

  const [agencies, setAgencies] = useState([]);

  // ✅ Fetch all agencies on mount
  useEffect(() => {
    axios.get("http://localhost:3001/admin/agencies")
      .then((res) => setAgencies(res.data))
      .catch((err) => console.error("❌ Failed to load agencies:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, pictures: files }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("country", form.country);
    data.append("region", form.region);
    data.append("title", form.title);
    data.append("description", form.description);

    for (let i = 0; i < form.pictures.length; i++) {
      data.append("pictures", form.pictures[i]);
    }

    try {
      await axios.post(`http://localhost:3001/add-post/${form.agency_id}`, data);
      alert("✅ Post added successfully!");
    } catch (err) {
      console.error("❌ Failed to upload post:", err);
      alert("❌ Failed to add post");
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-wrapper">
      <div className="main">
        <h2 className="text-xl font-bold mb-4">Add Travel Post</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          
          {/* ✅ Agency dropdown */}
          <div>
            <label>Agency: (this is only dev testing function. rm when deploy)</label>
            <select name="agency_id" value={form.agency_id} onChange={handleChange} required>
              <option value="">-- Select Agency -- ( testing purpose only. rm when deploy)</option>
              {agencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Country:</label>
            <input type="text" name="country" value={form.country} onChange={handleChange} required />
          </div>

          <div>
            <label>Region:</label>
            <input type="text" name="region" value={form.region} onChange={handleChange} required />
          </div>

          <div>
            <label>Title:</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required />
          </div>

          <div>
            <label>Description:</label>
            <textarea name="description" value={form.description} onChange={handleChange} required />
          </div>

          <div>
            <label>Upload Pictures:</label>
            <input type="file" name="pictures" onChange={handleChange} multiple accept="image/*" />
          </div>

          <button type="submit">📤 Submit Post</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default AddPost;
