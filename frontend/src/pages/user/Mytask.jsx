import Sidebar from "../../components/layouts/sidebar";
import TaskBoard from "../../components/layouts/TaskBoard";

export default function MyTasks() {
  return (
    <div className="display">
      <Sidebar />
      <main className="content-glow flex min-w-0 flex-1 flex-col overflow-hidden">
        <TaskBoard role="user" />
      </main>
    </div>
  );
}
