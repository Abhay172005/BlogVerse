# 📖 BlogVerse

BlogVerse is a **modern blogging platform** built with **React** and powered by **Supabase** as the backend. It allows users to **create, edit, delete, and explore blogs** on various topics including technology, AI, geopolitics, environment, and more. This project is designed to be **responsive, user-friendly, and scalable**, making it a perfect base for personal blogging.

---

## ✨ Features

- 🔐 **Authentication** — Secure login and signup with Supabase Auth.  
- 📝 **Create, Edit & Delete Blogs** — Full CRUD functionality for posts.  
- 💬 **Comments System** — Users can comment on blogs in real-time.  
- 👍👎 **Like / Dislike Posts** — Interactive reactions with instant feedback.  
- 🔎 **Search Functionality** — Quickly find blogs by title or content.  
- 🖼 **Responsive Design** — Optimized for desktop and mobile devices.  
- 🏷 **Categories / Tags** — Classify blogs under Tech, AI, Politics, etc.  

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js (Hooks + Functional Components)  
- React Router (Routing & Navigation)  
- CSS3 (custom styling, responsive grid)  

**Backend & Database:**  
- Supabase (Postgres Database + Auth + API)  

**Deployment:**  
- GitHub (Source Control)  
- Vercel (Free Hosting & Deployment)  

---

## ⚙️ Setup & Installation

Clone the repository and run the following:

```bash
# Clone repo
git clone https://github.com/Abhay172005/BlogVerse.git
cd BlogVerse

# Install dependencies
npm install

# Add environment variables (create a .env file in project root)
echo "REACT_APP_SUPABASE_URL=your_supabase_url" > .env
echo "REACT_APP_SUPABASE_ANON_KEY=your_supabase_key" >> .env

# Start development server
npm start
