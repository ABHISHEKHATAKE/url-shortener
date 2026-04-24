<div align="center">
  <img alt="URL Shortener Logo" src="https://img.icons8.com/color/96/000000/domain.png" width="100"/>
  
  # 🔗 URL Shortener
  
  A modern, fast, and lightweight URL Shortener built with Node.js and React.

  <p>
    <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
    <img alt="Express.js" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
    <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  </p>
</div>

<br/>

## 🚀 Overview

This is a full-stack URL shortener application. The frontend is built using **React** and **Vite** for a blazing fast user experience, while the backend is powered by **Node.js** and **Express**, utilizing a local JSON database for simple and effective storage of shortened links.

## ✨ Features

- **Shorten any valid URL**: Transform long, unwieldy links into clean, shareable short URLs.
- **Instant Redirection**: Quick server-side redirection to your original link.
- **Duplicate Prevention**: Detects if a URL has already been shortened and returns the existing short link.
- **Beautiful UI**: A responsive, modern interface designed for ease of use.
- **JSON Based Storage**: Lightweight, file-based persistence out of the box (no complex DB setup required).

## 🛠️ Technology Stack

### Frontend
- **React.js** (v19)
- **Vite** (Build tool)
- Vanilla CSS for styling

### Backend
- **Node.js**
- **Express.js** (Web framework)
- **shortid** (For generating unique identifiers)
- **cors** & **dotenv** (Middleware & Configuration)

## 📁 Project Structure

```text
url-shortener/
├── backend/
│   ├── server.js        # Main Express server and API endpoints
│   ├── links.json       # JSON file serving as the database
│   ├── package.json     # Backend dependencies
│   └── .env             # Environment variables (port, etc.)
└── frontend/
    ├── src/             # React source code (App.jsx, index.css, etc.)
    ├── index.html       # Entry HTML file
    ├── package.json     # Frontend dependencies
    └── vite.config.js   # Vite configuration
```

## ⚙️ Setup and Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
*(If applicable, clone your repository here)*
```bash
git clone <your-repo-url>
cd url-shortener
```

### 2. Backend Setup
Open a new terminal and navigate to the backend directory:
```bash
cd backend
npm install
node server.js
```
*The backend server will run on `http://localhost:5000` by default.*

### 3. Frontend Setup
Open another terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
*The frontend application will start and be accessible via the Vite dev server (usually `http://localhost:5173`).*

## 🔌 API Endpoints

The backend provides the following RESTful endpoints:

| Method | Endpoint | Description | Body / Params |
|--------|----------|-------------|---------------|
| `GET`  | `/api/urls` | Retrieve all shortened URLs | - |
| `POST` | `/api/shorten` | Create a new short URL | `{ "originalUrl": "https://..." }` |
| `GET`  | `/:short` | Redirect to original URL | URL param: `short` |

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## 📝 License

This project is licensed under the **ISC License**.
