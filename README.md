# Task Manager

> A role-based task management app where admins create and assign work, and users track progress through checklists.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://task-manager-app-1386.vercel.app/)
![Stack](https://img.shields.io/badge/stack-MERN-blue)

**Live demo:** https://task-manager-app-1386.vercel.app/


![Dashboard screenshot](./assests/dashboard.png)
![SignUp screenshot](./assests/signup.png)

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [API Reference](#api-reference)
8. [Roles and Permissions](#roles-and-permissions)
9. [Security Notes](#security-notes)
10. [Deployment](#deployment)

---

## Overview

Task Manager helps small teams plan, assign, and track work in one place. Admins get a full overview of every task with charts and filters. Regular users see only the tasks assigned to them and can update their own checklist and status as work progresses.

## Features


**Authentication**
- Sign up and log in with JWT-based authentication
- Passwords hashed with bcrypt
- Admin accounts created only with a secret join code

**Admin**
- Dashboard with statistics, task-distribution chart, and priority chart
- Create, edit, assign, and delete tasks
- Manage users (view, create, delete)
- Status filters, live counts, and search across all tasks

**User**
- Personal dashboard showing only assigned tasks
- Task detail page with an interactive checklist
- Progress bar and status update automatically from checklist completion
- Search and filter your own task list

**General**
- Role-based route protection on both frontend and backend
- Responsive layout built with Tailwind CSS

## Tech Stack


| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router v6, Tailwind CSS, Axios, React Icons |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Auth | JSON Web Tokens, bcrypt |
| Hosting | Vercel |


## Project Structure


```
task-manager/
├── backend/
│   ├── controller/          # Request handlers (auth, task, user)
│   ├── models/              # Mongoose schemas (User, Task)
│   ├── routes/              # Express routers
│   ├── utils/               # verifyToken, adminOnly, error handler
│   └── server.js            # App entry point
└── frontend/
    └── src/
        ├── components/layouts/   # Sidebar, charts
        ├── pages/
        │   ├── auth/             # Login, Signup, Logout
        │   ├── admin/            # Dashboard, ManageTask, ManageUsers, CreateTask
        │   └── user/             # UserDashboard, Mytask, Taskdetail
        ├── routes/               # PrivateRoute (role guard)
        ├── utilis/               # axiosinstance, apipath
        └── App.jsx               # Route definitions
```

## Getting Started

### Prerequisites

- Node.js v18 or later
- npm (or yarn/pnpm)
- A MongoDB database (local, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### 1. Clone the repository

```bash
git clone https://github.com/Saad2025-21
cd https://github.com/Saad2025-21/Task-Manager-App
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env     
npm run dev
```

The API starts on `http://localhost:3000`.

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

The app starts on `http://localhost:5173`.

### 4. Point the frontend at your API

In `frontend/src/utilis/apipath.js`, set the base URL:

```js
const BASE_URL = "http://localhost:3000";
```

### 5. Create your first admin

1. Set `ADMIN_JOIN_CODE` in the backend `.env`.
2. Open the signup page and choose **Admin**.
3. Enter the same code in the admin code field.

Without a matching code, the account is created as a regular `user`.

## Environment Variables

Create `backend/.env`:

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the API listens on | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster/db` |
| `JWT_SECRET` | Long random string used to sign tokens | `change-me-to-a-long-random-string` |
| `ADMIN_JOIN_CODE` | Secret code required to register as admin | `your-secret-code` |


> Never commit `.env`. Make sure it is listed in `.gitignore`.

## API Reference

All protected routes require the header `Authorization: Bearer <token>`.

### Auth

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | Public | Register a user |
| POST | `/api/auth/login` | Public | Log in and receive a token |
| GET | `/api/auth/user-profile` | Authenticated | Get the current user's profile |

### Users

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/users/get-user` | Admin | List users |
| GET | `/api/users/get-user/:userId` | Authenticated | Get one user (password excluded) |
| POST | `/api/users` | Admin | Create a user |
| DELETE | `/api/users/:userId` | Admin | Delete a user |

### Tasks

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/task/create` | Admin | Create a task |
| GET | `/api/task` | Authenticated | List tasks (admin: all, user: assigned only) |
| GET | `/api/task/admin-dashboard` | Admin | Dashboard stats and charts |
| GET | `/api/task/user-dashboard` | Authenticated | Stats and charts for the current user |
| GET | `/api/task/:id` | Assigned user or admin | Get one task |
| PUT | `/api/task/:id` | Admin | Edit a task |
| DELETE | `/api/task/:id` | Admin | Delete a task |
| PUT | `/api/task/:id/status` | Assigned user or admin | Update status |
| PUT | `/api/task/:id/todo` | Assigned user or admin | Update checklist completion |

**Example: update a checklist item**

```http
PUT /api/task/6ac39bc0655163a78044ecde/todo
Authorization: Bearer <token>
Content-Type: application/json

{
  "todochecklist": [
    { "_id": "6ac39bc0655163a78044ecdf", "completed": true }
  ]
}
```

The server only reads the `completed` field of existing items. It ignores renamed, added, or removed items.

## Roles and Permissions

| Action | Admin | User |
|---|---|---|
| View all tasks | Yes | No (assigned only) |
| Create / edit / delete tasks | Yes | No |
| Update status and checklist | Yes | Assigned tasks only |
| Manage users | Yes | No |
| View own profile | Yes | Yes |

Permissions are enforced on the server by the `verifyToken` and `adminOnly` middleware. Hiding a button in the UI is a convenience, not security.

## Security Notes


- Passwords are hashed with bcrypt before storage and never returned in responses.
- The role is decided by the server. A client-supplied `role` is ignored unless the correct admin code is sent.
- Task access is checked against the assignee list on every read and update.
- Checklist updates accept only the `completed` flag, so clients cannot rewrite task content.
- Secrets live in environment variables, never in source control.

## Deployment

**Frontend (Vercel)**
1. Push the repo to GitHub.
2. Import the project in Vercel and set the root directory to `frontend`.
3. Build command: `npm run build`. Output directory: `dist`.
4. Add a rewrite so client-side routes work on refresh (`vercel.json`):
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```

**Backend**
1. Deploy `backend` as a separate Vercel project (or any Node host).
2. Add every variable from the table above in the host's environment settings.
3. Allow your frontend's domain in the CORS configuration.
4. Update `BASE_URL` in the frontend to the deployed API URL and redeploy.


## Author

**Saad Ansari**
GitHub: [@Saad2025-21](https://github.com/Saad2025-21) · LinkedIn: [Saad Ansari](https://www.linkedin.com/in/saad-ansari-3a863b401)