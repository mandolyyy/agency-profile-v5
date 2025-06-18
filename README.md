# 🧳 Agency Travel Post Management System

This is a full-stack web application that allows travel agencies to manage and display travel posts. Admins can manage agencies and their posts, while agencies can edit and manage their own content.

## ✨ Features

### 🔐 Admin Panel
- Add, edit, and view all agencies
- Add, edit, and view all travel posts (with photo uploads)
- View post details including title, description, photos, and creation date
- Admin sidebar for navigation

### 🧑‍💼 Agency Panel
- View posts by selected agency
- Add, edit, and manage travel posts
- Upload multiple photos
- Styled form and clean interface

---

## 🛠 Tech Stack

**Frontend:**
- React.js (with Vite)
- Axios
- Tailwind CSS / Custom CSS

**Backend:**
- Node.js
- Express.js
- MySQL

**Other:**
- Multer (for image upload)
- CORS
- Dotenv

---

## 🧩 Project Structure
agency-travel-app/
├── backend/
│ ├── server.js
│ ├── routes/
│ ├── controllers/
│ └── uploads/
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── adminPages/
│ │ ├── components/
│ │ └── App.jsx
│ └── public/
└── README.md



---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https:/https://github.com/mandolyyy/agency-profile-v5.git
cd agency-profile-v5



##set up backend
cd backend
npm install
cp .env.example .env    # Update your DB and PORT config
node server.js

## set up front end
cd frontend
npm install
npm run dev





MySQL Schema

CREATE TABLE agencies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  about TEXT,
  logo VARCHAR(255)
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  agency_id INT,
  country VARCHAR(100),
  region VARCHAR(100),
  title VARCHAR(255),
  description TEXT,
  pictures TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (agency_id) REFERENCES agencies(id)
);









