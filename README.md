# CareConnect — Healthcare Support Portal

A full-stack MERN application connecting patients, families, and volunteers through a healthcare NGO support portal. Built with React (Vite), Node.js, Express, and MongoDB Atlas.

---

## Development Plan & Architecture

### Implementation Strategy

| Phase | Focus | Deliverables |
|-------|-------|--------------|
| 1 | Backend foundation | Express server, MongoDB models, REST APIs, error handling |
| 2 | AI-inspired automation | Text summarizer utility for patient/volunteer submissions |
| 3 | Frontend pages | Home, Patient Support, Volunteer, Contact, Dashboard |
| 4 | Shared components | Navbar, Footer, FAQ Chatbot |
| 5 | Integration | Axios API service, environment variables, CORS |
| 6 | Polish & deploy | Responsive CSS, README, deployment configs |

### Folder Structure

```
CareConnect/
├── client/                          # React (Vite) Frontend
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Chatbot.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── PatientSupport.jsx
│   │   │   ├── Volunteer.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Node.js / Express Backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── patientController.js
│   │   ├── volunteerController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Patient.js
│   │   ├── Volunteer.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── patientRoutes.js
│   │   ├── volunteerRoutes.js
│   │   └── contactRoutes.js
│   ├── utils/
│   │   └── summaryGenerator.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/patients` | Submit patient support request |
| GET | `/api/patients` | Get all patient requests |
| POST | `/api/volunteers` | Submit volunteer registration |
| GET | `/api/volunteers` | Get all volunteers |
| POST | `/api/contact` | Submit contact message |
| GET | `/api/contact` | Get all contact messages |

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)
- npm (comes with Node.js)

---

## MongoDB Atlas Setup

### Step 1: Create a Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign up / log in.
2. Click **Build a Database** → choose **M0 Free** tier.
3. Select a cloud provider and region closest to you.
4. Click **Create Cluster** (takes 1–3 minutes).

### Step 2: Create a Database User

1. Go to **Database Access** in the left sidebar.
2. Click **Add New Database User**.
3. Choose **Password** authentication.
4. Set a username and strong password (save these!).
5. Set privileges to **Read and write to any database**.
6. Click **Add User**.

### Step 3: Allow Network Access

1. Go to **Network Access** in the left sidebar.
2. Click **Add IP Address**.
3. For development, click **Allow Access from Anywhere** (`0.0.0.0/0`).
4. For production, restrict to your server's IP.
5. Click **Confirm**.

### Step 4: Get Connection String

1. Go to **Database** → click **Connect** on your cluster.
2. Choose **Drivers** → select **Node.js**.
3. Copy the connection string. It looks like:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

4. Replace `<username>` and `<password>` with your database user credentials.
5. Add the database name `careconnect` before the `?`:

```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/careconnect?retryWrites=true&w=majority
```

---

## Local Setup (Step-by-Step)

### Step 1: Clone / Open the Project

```bash
cd CareConnect
```

### Step 2: Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file from the example:

```bash
# Windows (PowerShell)
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/careconnect?retryWrites=true&w=majority
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

You should see:

```
MongoDB Connected: cluster0.xxxxx.mongodb.net
CareConnect server running on port 5000
```

### Step 3: Set Up the Frontend

Open a **new terminal**:

```bash
cd client
npm install
```

Create a `.env` file:

```bash
# Windows (PowerShell)
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app opens at **http://localhost:5173**.

### Step 4: Verify Everything Works

1. Visit the Home page — hero, about, services, and footer should render.
2. Submit a **Patient Support** form — check for success message with AI summary.
3. Register a **Volunteer** — verify summary generation.
4. Send a **Contact** message.
5. Open **Dashboard** — all three tables should show your submissions.
6. Click the **chatbot** (bottom-right) and try the FAQ questions.

---

## Running Frontend & Backend Separately

| Service | Directory | Command | URL |
|---------|-----------|---------|-----|
| Backend | `server/` | `npm run dev` | http://localhost:5000 |
| Frontend | `client/` | `npm run dev` | http://localhost:5173 |

**Production start (backend only):**

```bash
cd server
npm start
```

**Build frontend for production:**

```bash
cd client
npm run build
npm run preview
```

---

## Deployment

### Deploy Backend on Render

1. Push your code to GitHub.
2. Go to [Render](https://render.com) → **New** → **Web Service**.
3. Connect your GitHub repository.
4. Configure:
   - **Name:** `careconnect-api`
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add **Environment Variables:**
   - `PORT` = `5000`
   - `MONGODB_URI` = your Atlas connection string
   - `NODE_ENV` = `production`
   - `CLIENT_URL` = your Vercel frontend URL (set after frontend deploy)
6. Click **Create Web Service**.
7. Copy your Render URL (e.g. `https://careconnect-api.onrender.com`).

### Deploy Frontend on Vercel

1. Go to [Vercel](https://vercel.com) → **Add New Project**.
2. Import your GitHub repository.
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add **Environment Variable:**
   - `VITE_API_URL` = `https://careconnect-api.onrender.com/api`
5. Click **Deploy**.
6. Copy your Vercel URL (e.g. `https://careconnect.vercel.app`).

### Post-Deployment

1. Go back to **Render** → your web service → **Environment**.
2. Update `CLIENT_URL` to your Vercel URL.
3. Redeploy the backend so CORS allows your frontend domain.

### Vercel `vercel.json` (Optional)

Create `client/vercel.json` for SPA routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Features

- **Landing Page** — Professional healthcare NGO theme with hero, about, services, footer
- **Patient Support** — Form with AI-generated summary saved to MongoDB
- **Volunteer Registration** — Skills/availability form with motivation summary
- **Contact Form** — Simple message submission
- **Admin Dashboard** — Tables for patients, volunteers, and contacts
- **FAQ Chatbot** — Floating assistant with predefined intelligent responses
- **Responsive Design** — Mobile-friendly across all pages
- **Error Handling** — Validation on both client and server

---

## Tech Stack

- **Frontend:** React 18, Vite, React Router, Axios, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas with Mongoose
- **Language:** Plain JavaScript (no TypeScript)

---

## License

MIT
