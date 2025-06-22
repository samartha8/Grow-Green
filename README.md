# 🌸 CHORI – *Care, Health, and Openness for Reproductive Insight*


CHORI is a compassionate digital wellness companion designed to support menstruators—especially young people and first-time period experiencers—through **education**, **empathy**, and **empowerment**.

It’s more than just a tracker—**CHORI** is a complete menstrual wellness platform combining AI-powered assistance, personalized health tracking, gamified motivation, and inclusive design in a secure, judgment-free space.

![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)

---

## 📚 Table of Contents

- [Key Features](#-key-features)
- [UI/UX Highlights](#-uiux-highlights)
- [User Flow Overview](#-user-flow-overview)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Commitment to Privacy](#-commitment-to-privacy)
- [Project Goals](#-project-goals-hackathon-vision)
- [Future Plans](#-future-plans)
- [Contributors](#-contributors)
- [Project Structure](#-project-structure)
- [Mission](#-mission)

---

## 🔍 Key Features

### 🤖 Ask Chori – AI Chatbot
An intelligent chatbot that answers questions about periods, hygiene, cramps, emotions, and mental health—anytime, judgment-free.

### 📅 Personalized Period Tracker
Track symptoms, moods, flow levels. Registration includes last period input for accurate cycle prediction and reminders.

### 💬 Daily Motivational Quotes
Uplifting affirmations tailored to cycle phases.

### 🎥 Menstruation 101 (Educational Videos)
Beginner-friendly, culturally respectful content around body literacy and stigma-breaking.

### 🥗 Strength-Building Diet Tips
Science and tradition-backed tips to ease symptoms and build energy.

### 🌟 Gamified Wellness Streaks
Badges like “Hydration Hero”, “Strong Cycle Warrior”, “5-Day Tracker Streak” to encourage habit-forming.


---

## 🎨 UI/UX Highlights

- **Palette:** Rose Gold `#E8B4B8`, Lavender `#D8BFD8`, Teal `#4A9B9B`, Cream base
- **Design:** Smooth transitions, rounded corners, soft animations
- **Responsiveness:** Fully responsive layout across devices

---

## 🧭 User Flow Overview

1. **Signup/Login** – Secure login with onboarding Q: “When was your last period?”
2. **Dashboard** – Personalized greeting, stats, and quick-access widgets
3. **Tracking** – Log flow, pain, energy, emotions; get health feedback
4. **Profile** – Saved tips, privacy settings, streak achievements
5. **Learn & Grow** – Explore educational resources and diet suggestions

---

## 🛠 Tech Stack

### 🎯 Frontend – React + Tailwind + TypeScript
- Vite-based setup
- Organized with `components/`, `hooks/`, `lib/`, `pages/`
- Recharts for cycle visuals

### 🧠 Backend – Node.js + Express + MongoDB
- RESTful APIs with controllers (auth, chatbot, tracking)
- Mongoose schemas: `User`, `DailyTracking`
- JWT auth, custom middleware

---

## ⚙️ Getting Started

### 🖥 Backend

```bash
cd backend
npm install
npm run dev
```

> ⚠️ Requires a `.env` file with:
```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_key
```

### 🌐 Frontend

```bash
cd frontend
npm install
npm run dev
```

---



---

## 🎯 Project Goals (Hackathon Vision)

- Break menstrual stigma through education
- Build community trust through tech & empathy
- Empower shy or uneducated teens to ask period-related questions through a safe, friendly chatbot

---

## ✨ Future Plans

- Multilingual voice assistant
- PCOS and irregularity insights
- Peer-support groups and mentors
- Focusing on ROI(Return on investment)
- Entry in both market B2C and B2B

---

## 👩‍💻 Contributors

| Name               | Role                  |
|--------------------|-----------------------|
| Samartha Sakhya    | Full Stack Developer  |
| Nikhil rana magar  | Frontend Developer    |
| Salon Acharya      | Backend Developer     |
| Sumit Kathet       | Frontend Developer    |


---

## 📂 Project Structure

```
📦 CHORI/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── index.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   ├── public/
│   ├── tailwind.config.ts
│   ├── vite.config.ts
│   └── package.json
```

---

## 🎯 Mission

“To break menstrual stigma through education and technology, empower menstruators with accurate information and self-awareness, and provide emotional and physical support in a judgment-free space — led by the CHORI Chatbot, a safe and supportive companion for open conversations.”

**CHORI is not just an app. It’s a movement toward dignity, openness, and care for menstrual health.**
