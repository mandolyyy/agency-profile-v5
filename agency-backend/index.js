const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require('fs');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mtg_db",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Get agency
app.get("/agency/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM agencies WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0] || {});
  });
});


app.post("/update-agency/:id", upload.single("logo"), (req, res) => {
  const agencyId = 2;

  try {
    const { phone, address, about } = req.body;
    const file = req.file;
    const logo = file ? file.filename : null;

    console.log("📥 Phone:", phone);
    console.log("📍 Address:", address);
    console.log("ℹ️ About:", about);
    console.log("🖼️ Logo:", logo);
    console.log("🆔 Agency ID:", agencyId);

    const sql = logo
      ? `UPDATE agencies SET phone = ?, address = ?, about = ?, logo = ? WHERE id = ?`
      : `UPDATE agencies SET phone = ?, address = ?, about = ? WHERE id = ?`;

    const values = logo
      ? [phone, address, about, logo, agencyId]
      : [phone, address, about, agencyId];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("❌ SQL Error:", err);
        return res.status(500).json({ error: err.message });
      }

      console.log("✅ Update success:", result);
      res.json({ message: "Agency updated successfully" });
    });
  } catch (err) {
    console.error("❌ Unexpected Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 📌 POST: Admin adds new agency
// POST route for admin to add a new agency
app.post("/admin/add-agency", upload.single("logo"), (req, res) => {
  const { name, email, phone, address, about } = req.body;
  const logo = req.file ? req.file.filename : null;

  const sql = "INSERT INTO agencies (name, email, phone, address, about, logo) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, email, phone, address, about, logo], (err, result) => {
    if (err) {
      console.error("❌ Failed to insert agency:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.send("✅ New agency added successfully");
  });
});


// 📌 GET: View all agencies
app.get("/admin/agencies", (req, res) => {
  const sql = "SELECT * FROM agencies ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Failed to fetch agencies:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});


// Get agency by ID
app.get("/admin/agency/:id", (req, res) => {
  const agencyId = req.params.id;
  const sql = "SELECT * FROM agencies WHERE id = ?";
  db.query(sql, [agencyId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Agency not found" });
    res.json(results[0]);
  });
});




// Edit agency by ID
app.post("/admin/edit-agency/:id", upload.single("logo"), (req, res) => {
  const agencyId = req.params.id;
  const { phone, address, about } = req.body;
  const logo = req.file ? req.file.filename : null;

  const sql = logo
    ? "UPDATE agencies SET phone = ?, address = ?, about = ?, logo = ? WHERE id = ?"
    : "UPDATE agencies SET phone = ?, address = ?, about = ? WHERE id = ?";

  const values = logo
    ? [phone, address, about, logo, agencyId]
    : [phone, address, about, agencyId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Update failed:", err);
      return res.status(500).json({ error: err.message });
    }
    res.send("✅ Agency updated successfully");
  });
});


// POST: Add travel post
app.post("/add-post/:agencyId", upload.array("pictures", 10), (req, res) => {
  const agency_id = req.params.agencyId;
  const { country, region, title, description } = req.body;
  const pictures = req.files ? req.files.map(file => file.filename) : [];

  const sql = `
    INSERT INTO posts (agency_id, country, region, title, description, pictures)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const pictureData = JSON.stringify(pictures);

  db.query(
    sql,
    [agency_id, country, region, title, description, pictureData],
    (err, result) => {
      if (err) {
        console.error("❌ Failed to insert post:", err);
        return res.status(500).json({ error: "Database insert failed" });
      }
      res.json({ message: "✅ Post added successfully", postId: result.insertId });
    }
  );
});



// GET all posts with agency name
app.get('/admin/posts', (req, res) => {
  const sql = `
    SELECT posts.id, posts.title, posts.pictures, posts.created_at, posts.description, agencies.name AS agency_name
    FROM posts
    JOIN agencies ON posts.agency_id = agencies.id
    ORDER BY posts.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Failed to fetch posts:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


// Get single post
app.get("/admin/post/:id", (req, res) => {
  const sql = "SELECT * FROM posts WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
});

// Update post
app.post("/admin/edit-post/:id", (req, res) => {
  const { country, region, title, description } = req.body;
  const sql = "UPDATE posts SET country = ?, region = ?, title = ?, description = ? WHERE id = ?";
  db.query(sql, [country, region, title, description, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✅ Post updated" });
  });
});



app.get('/agency/posts/:id', (req, res) => {
  const agencyId = req.params.id;
  const sql = `
    SELECT id, title, pictures, description, created_at
    FROM posts
    WHERE agency_id = ?
    ORDER BY created_at DESC
  `;
  db.query(sql, [agencyId], (err, results) => {
    if (err) {
      console.error("❌ Error getting posts by agency:", err);
      return res.status(500).json({ error: "Error retrieving posts" });
    }
    res.json(results);
  });
});



// Get single post by ID
// GET single post by ID
app.get("/agency/post/:id", (req, res) => {
  const postId = req.params.id;
  const sql = "SELECT * FROM posts WHERE id = ?";
  db.query(sql, [postId], (err, results) => {
    if (err) {
      console.error("❌ Failed to fetch post:", err);
      return res.status(500).json({ error: "Failed to fetch post" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(results[0]);
  });
});


// Update post
// PUT update post by ID
app.put("/agency/post/:id", (req, res) => {
  const postId = req.params.id;
  const { title, country, region, description } = req.body;
  const sql = `
    UPDATE posts SET title = ?, country = ?, region = ?, description = ?
    WHERE id = ?
  `;
  db.query(sql, [title, country, region, description, postId], (err, result) => {
    if (err) {
      console.error("❌ Update failed:", err);
      return res.status(500).json({ error: "Update failed" });
    }
    res.json({ message: "Post updated successfully" });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
