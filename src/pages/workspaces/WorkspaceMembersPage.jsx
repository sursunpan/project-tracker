import MemberList from "@/components/workspaces/MemberList";
import WorkspaceLayout from "./WorkspaceLayout";

export default function WorkspaceMembers() {
  return (
    <WorkspaceLayout>
      <div className="w-full lg:max-w-xl">
        <MemberList />
      </div>
    </WorkspaceLayout>
  );
}
