
import User from "../models/user.model.js"
import Task  from "../models/task.model.js"


export const getUser = async (req,res,next) => {
try {
    const users = await User.find({role : 'user'}).select('-password');

    const userTaskWithCount = await Promise.all(
        users.map(async (user)=>{
            const pendingTask = await Task.countDocuments({
                assignee: user._id,
                status:"pending",
            })
            const inProgressTask = await Task.countDocuments({
                assignee:user._id,
                status:"in-progress",
            }) 

            const completedTask = await Task.countDocuments({
                assignee:user._id,
                status:"completed",
            })

            return {
                ...user._doc,
                pendingTask,
                inProgressTask,
                completedTask

            }
        })
    )

     res.status(200).json(userTaskWithCount)
} catch (error) {
    return next(error)
}
}

export const getUserById = async (req,res,next)=>{
console.log("done")
} 

export const createUser = async (req,res,next)=>{
console.log("done")
} 

export const deleteUser = async (req,res,next)=>{
console.log("done")
} 


