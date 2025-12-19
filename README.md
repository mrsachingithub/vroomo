# 🚗 Vroomo Service

Vroomo is a modern web-based **mechanic service platform** that connects customers with mechanics for vehicle services. It provides role-based access for customers, mechanics, and admins, along with a clean and responsive user interface.

---

## ✨ Features

* Customer authentication (login/signup)
* Mechanic authentication and dashboard
* Admin dashboard with management modules
* Service request and tracking system
* Responsive UI with Tailwind CSS
* Modern frontend powered by Vite
* Secure backend integration using Supabase

---

## 👥 User Roles

* **Customer**: Book services, manage profile, track requests
* **Mechanic**: View and accept service requests
* **Admin**: Manage users, services, reports, and analytics

---

## 🛠 Tech Stack

**Frontend**

* React (TypeScript)
* Vite
* Tailwind CSS

**Backend / Services**

* Supabase (Auth + Database)

---

## 📁 Project Structure

```
vroomo/
├── public/
├── src/
├── supabase/
├── .env
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory and add your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## ▶️ Run the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app will run at:

```
http://localhost:5173
```

---

## 📌 Project Status

🚧 In Progress

---

## 👨‍💻 Author

Developed by **Sachin Kumar**

---

## 📜 License

This project is for learning and development purposes.

