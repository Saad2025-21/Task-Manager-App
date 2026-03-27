import { Stats, TaskDistributionChart, TaskPriorityChart } from "./charts"

export default function dashboardlayout() {
    

    const stats = [
        { label: "Total Tasks", value: 18, color: "#3B82F6" },
        { label: "Pending Tasks", value: 11, color: "#8B5CF6" },
        { label: "In Progress", value: 5, color: "#06B6D4" },
        { label: "Completed Tasks", value: 2, color: "#22C55E" },
    ];

    const taskDistributionData = [
        { name: "Pending", value: 11, color: "#8B5CF6" },
        { name: "In Progress", value: 5, color: "#06B6D4" },
        { name: "Completed", value: 2, color: "#22C55E" },
    ];

    const priorityData = [
        { name: "Low", value: 5, color: "#22C55E" },
        { name: "Medium", value: 6, color: "#F97316" },
        { name: "High", value: 8, color: "#F43F5E" },
    ];

    return (
  
            <main className="flex-1 p-8 flex flex-col gap-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome!</h1>
                    <Stats stats={stats} />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TaskDistributionChart data={taskDistributionData} />
                    <TaskPriorityChart data={priorityData} />
                </div>
            </main>
      
    );
}