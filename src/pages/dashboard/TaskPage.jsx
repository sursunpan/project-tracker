import TaskViewSwitcher from "@/components/tasks/task-view-switcher";
import DashboardLayout from "./DashboardLayout";

export default function TaskPage() {
  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <TaskViewSwitcher />
      </div>
    </DashboardLayout>
  );
}
