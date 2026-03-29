import { useEffect, useState } from "react";
import { Stats, TaskDistributionChart, TaskPriorityChart } from "./charts";
import axiosInstance from "../../utilis/axiosinstance"
import { API_PATHS } from "../../utilis/apipath";

export default function DashboardLayout() {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            try {
                if (token) {
                    const res = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA)
                    const data = await res.data;
                    setDashboardData(data);
                }


            } catch (error) {
                alert(error)
            }


        };

        fetchData();
    }, []);


    if (!dashboardData) return <p>Loading...</p>;


    const stats = [
        { label: "Total Tasks", value: dashboardData.statistics.totalTask, color: "#3B82F6" },
        { label: "Pending Tasks", value: dashboardData.statistics.pendingTask, color: "#8B5CF6" },
        { label: "In Progress", value: dashboardData.statistics.inprogress, color: "#06B6D4" },
        { label: "Completed Tasks", value: dashboardData.statistics.completedTask, color: "#22C55E" },
    ];

    const taskDistributionData = [
        { name: "Pending", value: dashboardData.chart.taskDistribution.pending, color: "#8B5CF6" },
        { name: "In Progress", value: dashboardData.chart.taskDistribution.inprogress, color: "#06B6D4" },
        { name: "Completed", value: dashboardData.chart.taskDistribution.completed, color: "#22C55E" },
    ];

    const priorityData = [
        { name: "Low", value: dashboardData.chart.taskpriorityLevel.Low, color: "#22C55E" },
        { name: "Medium", value: dashboardData.chart.taskpriorityLevel.Medium, color: "#F97316" },
        { name: "High", value: dashboardData.chart.taskpriorityLevel.High, color: "#F43F5E" },
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
