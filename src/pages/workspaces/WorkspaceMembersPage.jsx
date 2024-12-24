import MemberList from "@/components/workspaces/member-list";
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
