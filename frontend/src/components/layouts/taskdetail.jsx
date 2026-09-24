import React from 'react'
import { useEffect, useState } from 'react';
import axiosInstance from '../../utilis/axiosinstance';
import { API_PATHS } from '../../utilis/apipath';
import { useParams } from 'react-router-dom';

export default function TaskDetailLayout() {
    const { id } = useParams()
    const [taskdata, settaskdata] = useState(null);
    const [todoinput, settodoinput] = useState();

    useEffect(() => {
        const fetchdata = async () => {
            const token = localStorage.getItem("token")

            try {
                if (token) {
                    const res = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id))
                    const data = await res.data
                    settaskdata(data)
                }
            } catch (error) {
                alert(error)
            }
        }

        fetchdata()
    }, [id])
    const handleAddtodo = async () => {
        if (todoinput.trim()) {
            settaskdata({
                ...taskdata,
                todochecklist: [
                    ...taskdata.todochecklist,
                    { _id: Date.now(), text: todoinput.trim(), completed: false }
                ]
            });
            settodoinput("");   
        }
    }

    const handletoggletodo = (id) => {
        settaskdata({
            ...taskdata,
            todochecklist:taskdata.todochecklist.map((t) =>
                t._id === id ? { ...t, completed: !t.completed } : t
            )
        });
    }

    const handleremovetodo = (id) => {
        settaskdata({
            ...taskdata,
            todochecklist: taskdata.todochecklist.filter((t) => t._id !== id)
        });
    }
    const handleSubmit = async () => {
        if (!taskdata?.title?.trim()) return alert("Please enter a task title.");

        try {
            const res = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(id), taskdata);
            alert(res.data.message);
            console.log(taskdata.todochecklist)

        } catch (error) {
            console.error("Error updating task:", error);
            alert("Failed to update task");
        }
    };

    if (!taskdata) return <p>Loading......</p>

    return (
        <div className=" items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200 w-full 
      max-w-5xl">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Task</h2>

            {/* Task Title */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    Task Title
                </label>
                <input
                    type="text"
                    value={taskdata.title}
                    onChange={(e) => settaskdata({ ...taskdata, title: e.target.value })}
                    placeholder="Create App UI"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                />
            </div>

            {/* Description */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    Description
                </label>
                <textarea
                    value={taskdata.description}
                    onChange={(e) => settaskdata({ ...taskdata, description: e.target.value })}
                    placeholder="Describe task"
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition resize-y"
                />
            </div>

            {/* Priority / status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {/* Priority */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                        Priority
                    </label>
                    <div className="relative">
                        <select
                            value={taskdata.priority}
                            onChange={(e) => settaskdata({ ...taskdata, priority: e.target.value })}
                            className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition cursor-pointer"
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                        <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                        Progress
                    </label>
                    <div className="relative">
                        <select
                            value={taskdata.status}
                            onChange={(e) => settaskdata({ ...taskdata, status: e.target.value })}
                            className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition cursor-pointer"
                        >
                            <option value={'pending'}>pending</option>
                            <option value={'in-progress'}>in-progress</option>
                            <option value={'completed'}>completed</option>
                        </select>
                        <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
            {/* TODO Checklist */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    TODO Checklist
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={todoinput}
                        onChange={(e) => settodoinput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddtodo()}
                        placeholder="Enter Task"
                        className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                    />
                    <button
                        onClick={handleAddtodo}
                        className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-5 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                        Add
                    </button>
                </div>

                {taskdata.todochecklist.length > 0 && (
                    <ul className="mt-3 space-y-2">
                        {taskdata.todochecklist.map((todo) => (
                            <li
                                key={todo._id}
                                className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5"
                            >
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handletoggletodo(todo._id)}
                                    className="w-4 h-4 accent-blue-500 cursor-pointer"
                                />
                                <span
                                    className={`flex-1 text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-700"
                                        }`}
                                >
                                    {todo.text}
                                </span>
                                <button
                                    onClick={() => handleremovetodo(todo._id)}
                                    className="text-gray-300 hover:text-red-400 transition text-lg leading-none"
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className="w-full bg-blue-100 hover:bg-blue-200 text-blue-500 font-semibold tracking-widest text-sm py-4 rounded-xl transition-colors duration-200 uppercase"
            >
                update Task
            </button>
        </div>
    )
}