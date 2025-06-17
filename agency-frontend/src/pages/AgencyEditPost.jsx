import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../pages/css/profile.css";

function AgencyEditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    country: "",
    region: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/agency/post/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("❌ Failed to load post:", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/agency/post/${id}`, form)
      .then(() => {
        alert("✅ Post updated!");
        navigate("/agency-manage-posts");
      })
      .catch((err) => {
        console.error("❌ Failed to update:", err);
        alert("Update failed.");
      });
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="form-container">
        <h2 className="form-title">Edit Travel Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Country</label>
            <input type="text" name="country" value={form.country} onChange={handleChange} required />
          </div>
          <div>
            <label>Region</label>
            <input type="text" name="region" value={form.region} onChange={handleChange} required />
          </div>
          <div>
            <label>Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div>
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required />
          </div>
          <button type="submit">💾 Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default AgencyEditPost;
