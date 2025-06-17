// src/adminPages/AdminViewPosts.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../adminPages/css/allpost.css";
import { useNavigate } from "react-router-dom";


function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/admin/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.error("❌ Failed to fetch posts:", err);
      });
  }, []);
  return (
    <div className="app-container">
      <AdminSidebar />
      <div className="agencies-container">
        <h1 className="agencies-title">All Travel Posts</h1>
        <table className="agencies-table">
          <thead>
            <tr>
            <th>No.</th>
              <th className="column-name">Agency Name</th>
              <th className="column-title">Post Title</th>
              <th className="column-photo">Photos</th>
              <th className="column-des">Description</th>
              <th className="column-date">Date Created</th>
              <th className="column-action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td className="column-no">{index + 1}</td>
                <td>{post.agency_name}</td>
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
                    onClick={() => navigate(`/admin/edit-post/${post.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    ✏️ Edit
                </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagePosts;
