# 🌍Lovable Climate Action MERN Application 🌿
A full-stack **MERN platform** supporting **SDG 13 – Climate Action**, enabling users to report environmental issues, explore climate data, learn from the education hub, and shop for climate-friendly items.

## 🔗 LIVE LINKS
**Frontend Live URL:** _add link here_  
**Backend API URL:** _add link here_  
**Pitch Deck:** _[https://drive.google.com/drive/folders/1c5vtwqrSoHSp3FGxspBwQZccIAwMcVHV?usp=sharing]

## 📌 TABLE OF CONTENTS
- Features
- Tech Stack
- Project Structure
- Installation & Setup
- Environment Variables
- Running the App
- API Documentation
- User Guide
- Technical Architecture Overview
- Testing & Quality Assurance
- Contributing
- License

## 🚀 FEATURES
### User Features
- User Registration & Login (JWT Authentication)
- Report environmental issues
- Browse Education Hub (articles + videos)
- View & manage personal reports
- Interactive map with AQI & climate overlays
- Shopping + Cart (climate-friendly items)

### Admin Features
- View all user-reported issues
- Update report status
- Manage articles, videos, and store products

### System Features
- REST API backend
- Fully responsive UI
- Secure authentication
- MongoDB Atlas database
- Clean UI built with ShadCN + Tailwind

## 🛠 TECH STACK
### Frontend
- React (TypeScript)
- Vite
- Tailwind CSS
- ShadCN UI
- Zustand
- React Router
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt

## 📁 PROJECT STRUCTURE
```
project-root/
│── frontend/
│   ├──node_modules
│   ├── .github/worklows/Frontend-ci.yml
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── ui/
│   │   ├── contexts
│   │   ├── data/
│   │   ├── pages/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── index.tsx
│   │   ├── main.tsx
│   │   ├── ReportForm.tsx
│   │   ├── vite-env.d.ts
│   └── test/
│   └── .env
│   └── components.json
│   └── index.html
│   └── package-lock.json
│   └── package.json
│   └── postcss.config.js
│   └── tailwind.config.json
│   └── tsconfig.app.json
│   └── tsconfig.node.json
│   └── vite.config.ts
│   └──jest.config.js
│   

│
│── backend/
│   ├── .github/worklows/backend-ci.yml
│   ├── node_modules/
│   ├── src
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── types/
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── tsconfig.json
│
│── .github/workflows/ci.yml
│── node_modules
│── jest.config.js
│── PITCH DECK
└── README.md
```

## 🧩 INSTALLATION & SETUP
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/PreciousAnagwu/air-kindly-guide.git
cd air-kindly-guide
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create `.env`:
```
PORT=5000
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret-key
CLIENT_ORIGIN=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

## 📡 RUNNING THE APP
- Frontend → http://localhost:5173  
- Backend → http://localhost:5000  

## 📘 API DOCUMENTATION
Main endpoints include auth, reports, cart, and admin management.

## 👥 USER GUIDE
- Create account and log in
- Submit environmental reports
- Explore education hub
- Shop sustainable products
- View interactive climate maps

## 🧠 TECHNICAL ARCHITECTURE OVERVIEW
- React + Zustand frontend
- Express.js REST API
- MongoDB Atlas database
- Authentication via JWT

## 🧪 TESTING & QUALITY ASSURANCE
- Vitest for frontend testing
- Postman for API testing

## 🤝 CONTRIBUTING
Pull requests are welcome.

## 👩‍💻AUTHOR
**Name:** Anagwu Precious Chinemerem  
**Program:** PLP Academy – Project  
**Project:** SDG 13 - Climate Action MERN Application 

## 📄 LICENSE
This project is for educational purposes under the PLP Academy Project


