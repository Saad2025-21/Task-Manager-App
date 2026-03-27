import mongoose from "mongoose";

const todoschema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
})

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low',
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
    // assignee: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // }],
    createdBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    todochecklist: [todoschema],

    progress: {
        type: Number,
        default: 0,
    },

}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;