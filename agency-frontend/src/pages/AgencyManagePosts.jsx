import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../pages/css/managepost.css";
import { useNavigate } from "react-router-dom";

function AgencyViewPosts() {
  const [posts, setPosts] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all agencies for the dropdown
    
    axios.get("http://localhost:3001/admin/agencies")
      .then((res) => setAgencies(res.data))
      .catch((err) => console.error("❌ Failed to load agencies:", err));
  }, []);

  useEffect(() => {
    if (selectedAgency) {
      axios.get(`http://localhost:3001/agency/posts/${selectedAgency}`)
        .then((res) => setPosts(res.data))
        .catch((err) => {
          console.error("❌ Failed to fetch posts:", err);
        });
    }
  }, [selectedAgency]);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="agencies-container">
        <h1 className="agencies-title">Your Travel Posts</h1>

        {/* Agency Selector */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="agency">Select Agency: </label>
          <select
            id="agency"
            value={selectedAgency}
            onChange={(e) => setSelectedAgency(e.target.value)}
            required
          >
            <option value="">-- Choose Agency --</option>
            {agencies.map((agency) => (
              <option key={agency.id} value={agency.id}>
                {agency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Posts Table */}
        <table className="agencies-table">
          <thead>
            <tr>
              <th className="column-title">Post Title</th>
              <th className="column-photo">Photos</th>
              <th className="column-des">Description</th>
              <th className="column-date" >Date Created</th>
              <th className="column-action" >Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {post.pictures?.split(",").map((pic, idx) => (
                      <img
                        key={idx}
                        src={`http://localhost:3001/uploads/${pic}`}
                        alt={`post-${idx}`}
                        className="agency-logo"
                      />
                    ))}
                  </div>
                </td>
                <td>{post.description}</td>
                <td>{new Date(post.created_at).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => navigate(`/edit-post/${post.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    ✏️ Edit
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && selectedAgency && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No posts found for this agency.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AgencyViewPosts;
