// const BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "http://localhost:3000" : "")
const BASE_URL = "https://task-manager-app-five-bay.vercel.app"
if (!BASE_URL) {
    throw new Error("VITE_API_BASE_URL must be set to the deployed backend URL.")
}

export default BASE_URL;

export const API_PATHS = {
    AUTH: {
        SignUP: "/api/auth/signup",
        LOGIN: "/api/auth/login",
        GET_PROFILE: "/api/auth/user-profile",
    },
    USERS: {
        GET_ALL_USERS: "/api/users/get-user",
        GET_USER_BY_ID: (userId) => `/api/users/get-user/${userId}`,
        CREATE_USER: "/api/users/create-User",
        DELETE_USER: (userId) => `/api/users/${userId}`,
    },
    TASKS: {
        GET_DASHBOARD_DATA: "/api/task/admin-dashboard",
        GET_USER_DASHBAORD_DATA: "/api/task/user-dashboard",
        GET_TASK_BY_ID: (taskId) => `/api/task/${taskId}`,
        GET_ALL_TASKS: "/api/task",
        CREATE_TASK: "/api/task/create",
        UPDATE_TASK: (taskId) => `/api/task/${taskId}`,
        DELETE_TASK: (taskId) => `/api/task/${taskId}`,
        UPDATE_TASK_STATUS: (taskId) => `/api/task/${taskId}/status`,
        UPDATE_TODO_CHECKLIST: (taskId) => `/api/task/${taskId}/todo`,
    },
}
