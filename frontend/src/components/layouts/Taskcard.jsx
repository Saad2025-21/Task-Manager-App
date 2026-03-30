import { useNavigate } from "react-router-dom";
export default function TaskCard({ task }) {
const navigate = useNavigate()

  const totalTask = task.todochecklist?.length || 0;
  const pendingTask = task.todochecklist?.filter(item => !item.completed).length || 0;
  const progress = totalTask > 0 ? ((totalTask - pendingTask) / totalTask) * 100 : 0;


  const statusStyles = {
    pending: {
      text: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      dot: "bg-red-500",
    },
    'in-progress': {
      text: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      dot: "bg-orange-500",
    },
    completed: {
      text: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      dot: "bg-green-500",
    },
  };

  const priorityStyles = {
    High: {
      text: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      dot: "bg-red-500",
    },
    Medium: {
      text: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      dot: "bg-orange-500",
    },
    low: {
      text: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      dot: "bg-green-500",
    },
  };

  const styles = statusStyles[task.status] || statusStyles.pending;
  const pri_styles = priorityStyles[task.priority] || priorityStyles.High;
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 w-80"
    onClick={()=>{
      navigate(`/admin/create-task/${task._id}`) 
    }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <h2 className="text-lg font-bold text-gray-900 leading-tight">
          {task.title}
        </h2>
        <div>
          <span
            className={`ml-3 mt-0.5 mb-1.5 inline-flex items-center gap-1 text-xs font-medium 
        ${styles.text} ${styles.bg} ${styles.border} rounded-full px-2.5 py-1 whitespace-nowrap`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${styles.dot} inline-block`}></span>
            {task.status}
          </span>
          <span
            className={`ml-3 mt-0.5 mb-1.5 inline-flex items-center gap-1 text-xs font-medium 
        ${pri_styles.text} ${pri_styles.bg} ${pri_styles.border} rounded-full px-2.5 py-1 whitespace-nowrap`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${pri_styles.dot} inline-block`}></span>
            {task.priority}
          </span>
        </div>

      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-4 leading-snug">
        {task.description}
      </p>



      <span className="mb-2.5">Task done:</span>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-3 mt-1.5 overflow-hidden">
        <div
          className="h-2 rounded-full bg-blue-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-800 font-medium">
          <span className="font-bold">{totalTask - pendingTask}</span>
          <span className="text-gray-400">/{totalTask}</span>
        </span>
        <span className="font-semibold text-gray-700">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
