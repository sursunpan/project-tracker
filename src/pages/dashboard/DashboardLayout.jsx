/* eslint-disable react/prop-types */
import Navbar from "@/components/Navbar";
import CreateProjectModal from "@/components/projects/create-project-modal";
import Sidebar from "@/components/Sidebar";
import CreateTaskModal from "@/components/tasks/create-task-modal";
import CreateWorkspaceModal from "@/components/workspaces/create-workspace-modal";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <CreateTaskModal />
      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
