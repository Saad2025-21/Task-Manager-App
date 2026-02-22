import express from "express"
import { verifyToken, adminOnly } from "../utils/verifyuser.js"
import {
    createTask,
    deleteTask,
    getDashboardData,
    userDashboard,
    getTask,
    getTaskById,
    updateTask,
    updateTaskchecklist,
    updateTaskStatus
} from "../controller/task.controller.js"

const router = express.Router()

router.post("/create", verifyToken, adminOnly, createTask);
router.get('/', verifyToken, getTask)
router.get("/admin-dashboard", verifyToken, adminOnly, getDashboardData)
router.get("/user-dashboard", verifyToken, userDashboard)
router.get('/:id', verifyToken, getTaskById)
router.put('/:id', verifyToken, updateTask)
router.delete('/:id', verifyToken, adminOnly, deleteTask)
router.put('/:id/status', verifyToken, updateTaskStatus)
router.put('/:id/todo', verifyToken, updateTaskchecklist)



export default router;
