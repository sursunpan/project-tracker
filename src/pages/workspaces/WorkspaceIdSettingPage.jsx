import UpdateWorkspaceFrom from "@/components/workspaces/update-workspace-from";
import { useNavigate, useParams } from "react-router-dom";
import WorkspaceLayout from "./WorkspaceLayout";
import DashboardLoading from "../dashboard/DashboardLoading";
import useWorkspaceData from "@/hooks/workspace/useWorkspaceData";

export default function WorkspaceIdSettingPage() {
  console.log("------------------->WorkspaceIdSettingPage");
  const { id } = useParams();
  console.log(id);
  const { data: initialData, loading: isLoading } = useWorkspaceData(id);
  const navigate = useNavigate();

  if (initialData === null || isLoading) return <DashboardLoading />;

  return (
    <WorkspaceLayout>
      <div className="w-full lg:max-w-xl">
        <UpdateWorkspaceFrom
          initialValue={initialData}
          workspaceId={id}
          onCancel={() => navigate(`/workspace/${initialData.id}`)}
        />
      </div>
    </WorkspaceLayout>
  );
}
