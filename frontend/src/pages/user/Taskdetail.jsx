import Sidebar from "../../components/layouts/sidebar";
import TaskDetailLayout from "../../components/layouts/taskdetail";

export default function TaskDetailPage() {
  return (
    <div className="display">
      <Sidebar />
      <div className="content-glow min-w-0 flex-1 overflow-y-auto">
        <TaskDetailLayout />
      </div>
    </div>
  );
}
