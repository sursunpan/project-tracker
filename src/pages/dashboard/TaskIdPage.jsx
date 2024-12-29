import Error from "@/components/Error";
import DashboardLoading from "@/components/Loading";
import useGetTask from "@/hooks/tasks/useGetTask";
import { useParams } from "react-router-dom";
import TaskBreadcrumbs from "@/components/tasks/TaskBreadcrumbs";
import DashboardLayout from "./DashboardLayout";
import { DottedSeparator } from "@/components/dotted-separator";
import TaskOverview from "@/components/tasks/TaskOverview";
import TaskDescription from "@/components/tasks/TaskDescription";

export default function TaskIdPage() {
  const params = useParams();
  const { data, loading } = useGetTask(params.taskId);

  if (loading) {
    return <DashboardLoading />;
  }

  if (!data) {
    return <Error message="Task not found" />;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <TaskBreadcrumbs project={data.projectId} task={data} />
        <DottedSeparator className="my-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TaskOverview task={data} />
          <TaskDescription task={data} />
        </div>
      </div>
    </DashboardLayout>
  );
}
