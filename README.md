## Task Manager App(full stack)

A full stack Task Manager App buid with React and Node js.

## Tech stack 
- Frontend: React,tailwindcss,axios
- Backend: Node js, Mongo DB, express js

## Features
- Respponsive UI
- Api integration
- Admin dashboard

## Deployment configuration

Deploy the Express backend separately from the Vercel frontend. Set the frontend's
`VITE_API_BASE_URL` environment variable to the backend's public URL (for example,
`https://your-backend-service.example.com`, without a trailing slash), then redeploy
the frontend. The production frontend reports a clear configuration error if this
variable is missing.

Set the backend's `FRONTEND_URL` environment variable to the deployed frontend origin
(for example, `https://your-frontend.vercel.app`, without a trailing slash). The
backend also listens on the hosting platform's `PORT` environment variable.
