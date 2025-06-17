import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../adminPages/css/editpost.css";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    country: "",
    region: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/admin/post/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/admin/edit-post/${id}`, form);
      alert("✅ Post updated");
      navigate("/admin/manage-posts");
    } catch (err) {
      console.error("❌ Failed to update:", err);
    }
  };

  return (

   <div className="app-container">
  <AdminSidebar />
  <div className="form-container">
    <h2 className="form-title">✏️ Edit Post</h2>
    <form onSubmit={handleSubmit}>

        <div >
            <label htmlFor="country">Country</label>
      <input
        type="text"
        name="country"
        value={form.country}
        onChange={handleChange}
        placeholder="Country"
      />
        </div>


        <div >
            <label htmlFor="country">Region</label>
      <input
        type="text"
        name="region"
        value={form.region}
        onChange={handleChange}
        placeholder="Region"
      />
        </div>


        <div >
            <label htmlFor="country">Title</label>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Post Title"
      />
        </div>




        <div >
            <label htmlFor="country">Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />
      </div>

      <button type="submit">💾 Save</button>
    </form>
  </div>
</div>

  );
}

export default EditPost;
