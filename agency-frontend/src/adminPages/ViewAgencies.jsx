import { useEffect, useState } from "react";
import axios from "axios";
import "../adminPages/css/viewAgencies.css";
import AdminSidebar from "../components/AdminSidebar";

const ViewAgencies = () => {
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/agencies")
      .then((res) => setAgencies(res.data))
      .catch((err) => console.error("❌ Failed to fetch agencies:", err));
  }, []);

  if (agencies.length === 0) {
    return <p className="text-gray-500 mt-10 text-center">No agencies found.</p>;
  }

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
    <div className="agencies-container">
      <h2 className="agencies-title">📋 All Registered Agencies</h2>
      <div className="overflow-x-auto">
        <table className="agencies-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Logo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>About</th>
              <th>Post No.</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {agencies.map((agency) => (
              <tr key={agency.id}>
                <td>{agency.id}</td>
                <td>
                  {agency.logo ? (
                    <img
                      src={`http://localhost:3001/uploads/${agency.logo}`}
                      alt="Logo"
                      className="agency-logo"
                    />
                  ) : (
                    <span className="agency-nologo">No logo</span>
                  )}
                </td>
                <td>{agency.name}</td>
                <td>{agency.email}</td>
                <td>{agency.phone}</td>
                <td>{agency.address}</td>
                <td>{agency.about}</td>
                <td>{agency.postno}</td>
                <td>
                    <a href={`/admin/edit-agency/${agency.id}`} className="edit-link">✏️ Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ViewAgencies;
