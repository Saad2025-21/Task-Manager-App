import mongoose from "mongoose";
import Task from "../models/task.model.js";
import handleError from "../utils/error.js";


export const createTask = async (req, res, next) => {
    try {
        const {
            title,
            description,
            priority,
            assignee,
            todochecklist,
        } = req.body

        if (!Array.isArray(assignee)) {
            return next(handleError(404, "assigned to must have more IDs"))
        }

        const Tasks = await Task.create({
            title, description, priority, assignee, todochecklist, createdBy: [req.user.id],
        })

        res.status(201).json({
            message: "Task created successfully ",
            Tasks,
        })
    } catch (error) {
        return next(error)
    }
}

export const getTask = async (req, res, next) => {
    try {
        const { status } = req.query

        let filter = {};

        if (status) {
            filter.status = status;
        }
        let tasks

        if (req.user.role === 'admin') {
            tasks = await Task.find(filter).populate(
                "assignee",
                "name email"
            )
        } else {
            tasks = await Task.find({
                ...filter,
                assignee: req.user.id,
            }).populate(
                "assignee",
                "name email"
            )
        }

        tasks = await Promise.all(
            tasks.map(async (task) => {
                const completedCount = task.todochecklist.filter(
                    (item) => item.completed
                ).length

                return { ...task._doc, completed: completedCount }
            })

        )

        //status summary

        const alltask = await Task.countDocuments(
            req.user.role === 'admin' ? {} : { assignee: req.user.id }
        )
        const pendingTask = await Task.countDocuments({
            ...filter,
            status: "pending",
            ...(req.user.role !== "admin" && { assignee: req.user.id })
        })
        const inprogress = await Task.countDocuments({
            ...filter,
            status: "in-progress",
            ...(req.user.role !== "admin" && { assignee: req.user.id })
        })
        const completed = await Task.countDocuments({
            ...filter,
            status: "completed",
            ...(req.user.role !== "admin" && { assignee: req.user.id })
        }
        )
        res.status(200).json(
            {
                tasks,
                statussummary: {
                    all: alltask,
                    pendingTask,
                    inprogress,
                    completed,
                },
            })
    }

    catch (error) {
        return next(error)
    }
}

export const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id).populate(
            "assignee",
            "name email"
        )
        if (!task) {
            return next(404, "Task not found")
        }

        res.status(200).json(task)
    } catch (error) {
        return next(error)
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return next(handleError(404, "Task not found"))
        }

        task.title = req.body.title || task.title
        task.description = req.body.description || task.description
        task.priority = req.body.priority || task.priority
        task.status = req.body.status || task.status
        task.todochecklist = req.body.todochecklist || task.todochecklist

        if (req.body.assignee) {
            if (!Array.isArray(req.body.assignee)) {
                return next(handleError(404, "Should be more than one ID"))
            }

            task.assignee = req.body.assignee || task.assignee
        }

        const updateTask = await task.save()

        return res.status(200).json(

            updateTask, { message: "Task updated successfully" }

        )
    } catch (error) {
        return next(error)
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)

        if (!task) {
            return next(errorHandler(404, "Task not found!"))
        }

        await task.deleteOne()

        res.status(200).json({ message: "Task deleted successfully!" })
    } catch (error) {
        next(error)
    }
}

export const updateTaskStatus = async (req, res, next) => {
    try {

        const task = await Task.findById(req.params.id)

        if (!task) {
            return next(handleError(404, "Task not found"))
        }

        const isAssign = await Task.assignee?.some(
            (userId) => userId.toString() === req.user.id.toString()
        )

        if (!isAssign && req.user.role !== 'admin') {
            return next(handleError(404, "Unauthorized"))
        }

        task.status = req.body.status || task.status

        if (task.status === "completed") {
            task.todochecklist.forEach((item) => item.completed = true)
        }

        await task.save()

        res.status(200).json({ message: "Task status updated ", task })
    } catch (error) {
        return next(error)
    }
}

export const updateTaskchecklist = async (req, res, next) => {
    try {
        const { todochecklist } = req.body

        const task = await Task.findById(req.params.id)

        if (!task) {
            return next(handleError(404, "Task not found"))
        }

        if (!task.assignee.includes(req.user.id) && req.user.role !== "admin") {
            return next(handleError(404, "Not authorized to update the checklist"))
        }

        task.todochecklist = todochecklist

        const completedCount = task.todochecklist.filter(
            (item) => item.completed
        ).length

        const totalitem = task.todochecklist.length

        task.progress = totalitem > 0 ? Math.round((completedCount / totalitem) * 100) : 0

        if (task.progress === 100) {
            task.status = "completed"
        } else if (task.progress > 0) {
            task.status = "in-progress"
        } else {
            task.status = "pending"
        }

        await task.save()

        const updatedTask = await Task.findById(req.params.id).populate(
            "assignee",
            "name email"
        )

        res.status(200).json(

            { message: "Updated successfully ", task: updatedTask }

        )
    } catch (error) {
        return next(error)
    }
}

export const getDashboardData = async (req, res, next) => {
    try {
        const totalTask = await Task.countDocuments()
        const pendingTask = await Task.countDocuments({ "status": "pending" })
        const completedTask = await Task.countDocuments({ "status": "completed" })

        const taskstatuses = ["pending", "in-progress", "completed"]

        const taskDistributionRaw = await Task.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]
        )
        // console.log(taskDistributionRaw)
        const taskDistribution = taskstatuses.reduce((acc, status) => {
            const formatedkey = status.replace(/\s+/g, "")
            acc[formatedkey] = taskDistributionRaw.find((item) => item._id === status)?.count || 0

            return acc
        }, {})

        taskDistribution["all"] = totalTask

        const taskpriority = ["low", "medium", "high"]

        const taskprioritylevelraw = await Task.aggregate(
            [
                {
                    $group: {
                        _id: "$priority",
                        count: { $sum: 1 },
                    },
                },
            ]
        )

        const taskpriorityLevel = taskpriority.reduce((acc, priority) => {
            acc[priority] = taskprioritylevelraw.find((item) => item._id === priority)?.count || 0
            return acc
        }, {})

        //fetch recent task
        const recentTask = await Task.find()
            .sort({ createdBy: -1 })
            .limit(10)
            .select("title status priority createdBy")
        res.status(200).json({
            statistics: {
                totalTask,
                pendingTask,
                completedTask,
            },
            chart: {
                taskDistribution,
                taskpriorityLevel,
            },
            recentTask
        })

    } catch (error) {
        return next(error)
    }
}

export const userDashboard = async (req, res, next) => {
    try {
        const userId = req.user.id
        // console.log(userId)

        const userObjectId = new mongoose.Types.ObjectId(userId)
        // console.log(userObjectId)


        const totalTask = await Task.countDocuments({ assignee: userObjectId })
        const pendingTask = await Task.countDocuments({
            assignee: userObjectId,
            status: "pending"
        })
        const completedTask = await Task.countDocuments({
            assignee: userObjectId,
            status: "completed"
        })

        const taskstatuses = ["pending", "in-progress", "completed"]
        // console.log(taskstatuses)

        const taskDistributionRaw = await Task.aggregate(
            [{
                $match: { assignee: userObjectId },
            }, {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            }]
        )
        // console.log(taskDistributionRaw)

        const taskDistribution = taskstatuses.reduce((acc, status) => {
            const formattedKey = status.replace(/\s+/g, "")
            acc[formattedKey] = taskDistributionRaw.find((item) => item._id === status)?.count || 0

            return acc
        }, {})
        // console.log(taskDistribution)
        const priorities = ["low", "medium", "high"]

        const prioritylevelRaw = await Task.aggregate([{
            $match: { assignee: userObjectId },
        }, {
            $group: {
                _id: "$priority",
                count: { $sum: 1 },
            },
        }])


        const prioritylevel = priorities.reduce((acc, priority) => {
            acc[priority] = prioritylevelRaw.find((item) => item._id === priority)?.count || 0
            return acc
        }, {})

        const recentTask = await Task.find()
            .sort({ createdBy: -1 })
            .limit(10)
            .select("title status priority createdBy")

        res.status(200).json({
            statistics: {
                totalTask,
                pendingTask,
                completedTask,
            },
            chart: {
                taskDistribution,
                prioritylevel,
            },
            recentTask
        })
    } catch (error) {
        return next(error)
    }
}