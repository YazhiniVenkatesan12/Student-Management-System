# Student Management System

A simple and secure student management application built with **React** and **Node.js**, featuring authentication, role-based access, and a clean user interface.

## 🚀 Features

* **User Authentication** – Secure login system with protected routes
* **Student Records** – Add, edit, and view student details
* **Responsive Layout** – Sidebar navigation and clean design using Tailwind CSS
* **Protected Pages** – Only logged-in users can access certain routes
* **Reusable Components** – Organized code structure for easy maintenance

## 🛠 Tech Stack

**Frontend**

* React
* React Router
* Tailwind CSS

**Backend**

* Node.js / Express
* PostgreSQL (via Supabase or native PG)

## 📂 Project Structure

```
project-root/
│
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── App.js
│   │   └── index.js
│
├── backend/          # Node.js server
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
│
└── README.md
```

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
```

### 2. Install dependencies

**Frontend**

```bash
cd frontend
npm install
```

**Backend**

```bash
cd backend
npm install
```

### 3. Environment Variables

Create a `.env` file in both `frontend` and `backend` with required keys:

**Backend** (`.env`)

```
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

**Frontend** (`.env`)

```
REACT_APP_API_URL=http://localhost:5000
```

### 4. Run the project

**Backend**

```bash
npm run dev
```

**Frontend**

```bash
npm start
```

## 📷 Screenshots

*(Add your screenshots here)*

## 📝 License

This project is licensed under the MIT License – you’re free to use, modify, and distribute it.

---
