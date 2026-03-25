import TaskManager from "../../components/sidebar"

// --- Main Dashboard ---
export default function Dashboard() {
  return (
    <div className="flex h-screen" style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif", background: "#f4f4f9" }}>
      <TaskManager />
    </div>
  );
}