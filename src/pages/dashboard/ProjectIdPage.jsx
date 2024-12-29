import { Link, useParams } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import useProjectDetails from "@/hooks/project/useProjectDetails";
import DashboardLoading from "../../components/Loading";
import ProjectAvatar from "@/components/projects/Project-avatar";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import TaskViewSwitcher from "@/components/tasks/task-view-switcher";
import useProjectAnalytics from "@/hooks/project/useProjectAnalytic";
import Analytics from "@/components/projects/Analytics";

export default function ProjectIdPage() {
  console.log("ProjectIdPage>>>>>>>>>>>>>>>>>>>>>>>>>>>", "suraj");
  const params = useParams();
  const { data: projectData, loading: projectLoading } = useProjectDetails(
    params.id,
    params.projectId
  );
  const { data: analyticsData, loading: analyticsLoading } =
    useProjectAnalytics(params.projectId);

  if (!projectData) return null;

  return (
    <>
      {projectLoading || analyticsLoading ? (
        <DashboardLoading />
      ) : (
        <DashboardLayout>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <ProjectAvatar
                  name={projectData?.name}
                  image={projectData?.image}
                  className="size-8"
                />
                <p className="text-lg font-semibold">{projectData?.name}</p>
              </div>
              <Button variant="secondary" size="sm" asChild>
                <Link
                  to={`/workspace/${params.id}/project/${projectData.id}/settings`}
                >
                  <PencilIcon className="size-4 mr-2" />
                  Edit Project
                </Link>
              </Button>
            </div>
            {analyticsData ? <Analytics data={analyticsData} /> : null}
            <TaskViewSwitcher hideProjectFilter={true} />
          </div>
        </DashboardLayout>
      )}
    </>
  );
}
