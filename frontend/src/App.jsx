import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./index.css"
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Dashboard from './pages/admin/Dashboard';
import ManageTasks from './pages/admin/managetask';
import PrivateRoute from './routes/PrivateRoute';
import CreateTask from './pages/admin/createTask';
import UserDashboard from './pages/user/UserDashboard';
import Mytask from './pages/user/Mytask';
import Taskdetail from './pages/user/Taskdetail';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* admin routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
          </Route>

          {/* User routes */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<Mytask />} />
            <Route path="/user/taskdetail/:id" element={<Taskdetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
