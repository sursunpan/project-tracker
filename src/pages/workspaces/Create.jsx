import CreateWorkspaceFrom from "@/components/workspaces/create-workspace-from";
import WorkspaceLayout from "./WorkspaceLayout";

export default function Create() {
  return (
    <WorkspaceLayout>
      <div className="w-full lg:max-w-xl">
        <CreateWorkspaceFrom />
      </div>
    </WorkspaceLayout>
  );
}
