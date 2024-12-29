import useProjectDetails from "@/hooks/project/useProjectDetails";
import WorkspaceLayout from "./WorkspaceLayout";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLoading from "@/components/Loading";
import UpdateWorkspaceProjectFrom from "@/components/projects/update-project-form";

export default function ProjectIdSettingPage() {
  const { workspaceId, projectId } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useProjectDetails(workspaceId, projectId);

  if (loading) return <DashboardLoading />;
  if (!data) return null;

  return (
    <WorkspaceLayout>
      <div className="w-full lg:max-w-xl">
        <UpdateWorkspaceProjectFrom
          initialValue={data}
          workspaceId={workspaceId}
          projectId={projectId}
          onCancel={() =>
            navigate(`/workspace/${workspaceId}/project/${projectId}`)
          }
        />
      </div>
    </WorkspaceLayout>
  );
}
