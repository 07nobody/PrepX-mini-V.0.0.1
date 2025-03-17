# PrepX-mini-V.0.0.1 - Free & Beginner-Friendly Competitive Exam Platform

## Overview
PrepX-mini is a **lightweight and beginner-friendly** competitive exam mock test platform designed for **JEE, NEET, Banking, and CMAT** preparation. This version uses **only free and open-source tools**, making it accessible for all developers and students. The system provides essential features such as **mock test management, user authentication, and performance tracking** while maintaining simplicity and ease of deployment.

🚧 **This project is in active development, and contributions are welcome!**

---

## 🔹 Features & Functionality

### ✅ **User Authentication & Role-Based Access**
- Secure login and registration using **JWT with Clerk.dev (Free Plan)**.
- Role-based access for **students, teachers, and admins**.

### ✅ **Mock Test & Exam Management**
- Teachers can **create, edit, and verify** mock tests.
- Students can **attempt MCQs and True/False questions**.
- Timed test sessions with **auto-submission**.

### ✅ **Performance Tracking & Leaderboards**
- Track progress with **free data visualization tools**.
- **Dynamic leaderboards** to rank students based on exam scores.

### ✅ **Deployment & Hosting (Free Services)**
- **Frontend**: Hosted on **Netlify (Free Tier)**.
- **Backend**: Hosted on **Render (Free Tier)**.
- **Database**: MongoDB alternative **Supabase (Free Plan)**.

---

## 🔹 Technology Stack (Free & Open-Source)

| Component     | Free Alternative Used   |
|--------------|----------------------|
| Frontend     | React (Vite) + Tailwind CSS |
| Backend      | Express.js (Node.js) |
| Database     | Supabase (PostgreSQL) |
| Authentication | Clerk.dev (Free Tier) |
| AI Features  | Hugging Face API (Free Alternative to OpenAI) |
| Hosting      | Netlify (Frontend) & Render (Backend) |

---

## 🔹 Database Schema (PostgreSQL via Supabase)

### Users Table (students, teachers, admins)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK (role IN ('student', 'teacher', 'admin')) NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);
```

### Tests Table (Mock Tests)
```sql
CREATE TABLE tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    duration INT NOT NULL,
    created_by UUID REFERENCES users(id)
);
```

### Questions Table
```sql
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id UUID REFERENCES tests(id),
    question_text TEXT NOT NULL,
    question_type TEXT CHECK (question_type IN ('MCQ', 'True/False')) NOT NULL,
    options TEXT,
    correct_answer TEXT
);
```

### Results Table (Student Scores)
```sql
CREATE TABLE results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    test_id UUID REFERENCES tests(id),
    score FLOAT,
    completed_at TIMESTAMP DEFAULT now()
);
```

---

## 🔹 Installation Guide

### Prerequisites
- Node.js & npm installed
- Supabase account (for free database hosting)
- Netlify & Render accounts (for free hosting)

### Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/prepx-mini.git
   cd prepx-mini
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file with your **Supabase, Clerk.dev, and Hugging Face API keys**.
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   HUGGINGFACE_API_KEY=your_huggingface_api_key
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

---

## 🔹 Free Deployment Guide

### **Frontend Hosting (Netlify - Free Tier)**
1. Sign up at [Netlify](https://www.netlify.com/).
2. Connect the GitHub repository and deploy.

### **Backend Hosting (Render - Free Tier)**
1. Sign up at [Render](https://render.com/).
2. Deploy your **Express.js backend** from GitHub.

### **Database (Supabase - Free Tier)**
1. Sign up at [Supabase](https://supabase.io/).
2. Use PostgreSQL database for storing test and user data.

---

## 🔹 License & Contributions
This project is licensed under the MIT License. Feel free to contribute and improve the platform.

---

## 🔹 Contact Information
For inquiries, reach out via **neelpatelcoc2gmail.com** or open an issue in the repository.

---

🚀 **PrepX-mini (Free & Beginner-Friendly Version) is now available for exam preparation!**

