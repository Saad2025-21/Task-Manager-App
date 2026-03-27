import { useState } from "react";
import axiosInstance from '../../utilis/axiosinstance'
import { API_PATHS } from "../../utilis/apipath";

export default function CreateTask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low");
   
    const [todoInput, setTodoInput] = useState("");
    const [todos, setTodos] = useState([]);

    const handleAddTodo = () => {
        if (todoInput.trim()) {
            setTodos([...todos, { id: Date.now(), text: todoInput.trim(), done: false }]);
            setTodoInput("");
        }
    };

    const handleToggleTodo = (id) =>
        setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

    const handleRemoveTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  const handleSubmit = async () => {
  if (!title.trim()) return alert("Please enter a task title.");

  try {
    const newTask = {
      title,
      description,
      priority,
      todochecklist: todos,
    };

    const res = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, newTask);
    alert("Task created successfully!");
    console.log("Created task:", res.data);


    setTitle("");
    setDescription("");
    setPriority("Low");
    setTodos([]);
  } catch (error) {
    console.error("Error creating task:", error);
    alert("Failed to create task");
  }
};

    return (

        <div className=" items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200 w-full 
      max-w-5xl">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Task</h2>

            {/* Task Title */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    Task Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe task"
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition resize-y"
                />
            </div>

            {/* Priority / Due Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {/* Priority */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                        Priority
                    </label>
                    <div className="relative">
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
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

                {/* Due Date
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                        Due Date
                    </label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition cursor-pointer"
                    />
                </div> */}
            </div>

            {/* TODO Checklist */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    TODO Checklist
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={todoInput}
                        onChange={(e) => setTodoInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                        placeholder="Enter Task"
                        className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                    />
                    <button
                        onClick={handleAddTodo}
                        className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-5 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                        Add
                    </button>
                </div>

                {todos.length > 0 && (
                    <ul className="mt-3 space-y-2">
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5"
                            >
                                <input
                                    type="checkbox"
                                    checked={todo.done}
                                    onChange={() => handleToggleTodo(todo.id)}
                                    className="w-4 h-4 accent-blue-500 cursor-pointer"
                                />
                                <span
                                    className={`flex-1 text-sm ${todo.done ? "line-through text-gray-400" : "text-gray-700"
                                        }`}
                                >
                                    {todo.text}
                                </span>
                                <button
                                    onClick={() => handleRemoveTodo(todo.id)}
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
                Create Task
            </button>
        </div>

    );
}