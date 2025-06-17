import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../adminPages/css/editAgency.css";

const EditAgency = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    about: "",
    logo: null,
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing agency data
  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/agency/${id}`)
      .then((res) => {
        const { name, email, phone, address, about } = res.data;
        setForm((prev) => ({
          ...prev,
          name,
          email,
          phone,
          address,
          about,
        }));
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load agency:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, logo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("phone", form.phone);
    data.append("address", form.address);
    data.append("about", form.about);
    if (form.logo) data.append("logo", form.logo);

    try {
      await axios.post(`http://localhost:3001/admin/edit-agency/${id}`, data);
      alert("✅ Agency updated successfully!");
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("Update failed.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading agency data...</p>;

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div className="form-container">
        <h2 className="form-title">✏️ Edit Agency</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Agency Name"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Agency Email"
            required
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Agency Address"
            required
          ></textarea>
          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            placeholder="About Agency"
            required
          ></textarea>
          <input
            type="file"
            name="logo"
            onChange={handleFileChange}
            accept="image/*"
          />
          <button type="submit">Update Agency</button>
        </form>
      </div>
    </div>
  );
};

export default EditAgency;
