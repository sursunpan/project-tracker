import { Link, useParams } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import useProjectDetails from "@/hooks/project/useProjectDetails";
import DashboardLoading from "../../components/Loading";
import ProjectAvatar from "@/components/projects/Project-avatar";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import TaskViewSwitcher from "@/components/tasks/task-view-switcher";

export default function ProjectIdPage() {
  const params = useParams();
  const { data, loading } = useProjectDetails(params.id, params.projectId);

  if (!data) return null;

  return (
    <>
      {loading ? (
        <DashboardLoading />
      ) : (
        <DashboardLayout>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <ProjectAvatar
                  name={data?.name}
                  image={data?.image}
                  className="size-8"
                />
                <p className="text-lg font-semibold">{data?.name}</p>
              </div>
              <Button variant="secondary" size="sm" asChild>
                <Link
                  to={`/workspace/${params.id}/project/${data.id}/settings`}
                >
                  <PencilIcon className="size-4 mr-2" />
                  Edit Project
                </Link>
              </Button>
            </div>
            <TaskViewSwitcher />
          </div>
        </DashboardLayout>
      )}
    </>
  );
}
