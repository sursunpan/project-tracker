/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import useWorkspaceAnalytics from "@/hooks/workspace/useWorkspaceAnalytic";
import useGetTasks from "@/hooks/tasks/useGetTasks";
import useWorkspaceProject from "@/hooks/workspace/useWorkspaceProject";
import useWorkspaceMember from "@/hooks/workspace/useWorkspaceMember";
import DashboardLoading from "@/components/Loading";
import Error from "@/components/Error";
import Analytics from "@/components/projects/Analytics";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PlusIcon, SettingsIcon } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import ProjectAvatar from "@/components/projects/Project-avatar";
import { useDispatch } from "react-redux";
import { openTaskModal } from "@/redux/slices/taskModalSlice";
import { openCreateProjectModal } from "@/redux/slices/projectModalSlice";
import WorkspaceMemberavatar from "@/components/workspaces/Member-avatar";

export default function WorkspaceId() {
  const param = useParams();

  const { data: analytics, loading: loadingAnalytics } = useWorkspaceAnalytics(
    param.id
  );
  const { data: taskData, loading: taskLoading } = useGetTasks({
    workSpaceId: param.id,
  });
  const { data: workspaceData, loading: workspaceLoading } =
    useWorkspaceProject(param.id);
  const { data: memberData, loading: memberLoading } = useWorkspaceMember(
    param.id
  );

  console.log("memberData", memberData);

  const loading =
    loadingAnalytics || taskLoading || workspaceLoading || memberLoading;

  if (loading) return <DashboardLoading />;

  if (!workspaceData || !taskData || !memberData || !analytics) {
    return <Error />;
  }

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col space-y-4">
        <Analytics data={analytics} />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TaskList data={taskData} total={taskData.length} />
          <ProjectList data={workspaceData} total={workspaceData.length} />
          <MemberList data={memberData} total={memberData.length} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export const TaskList = ({ data, total }) => {
  const param = useParams();
  const dispatch = useDispatch();
  const createTask = () => {
    dispatch(openTaskModal());
  };
  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tasks ({total})</p>
          <Button variant="muted" size="icon" onClick={createTask}>
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.map((task) => (
            <li className="" key={task.id}>
              <Link to={`/workspace/${param.id}/task/${task.id}`}>
                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4">
                    <p className="text-lg font-medium truncate">{task.name}</p>
                    <div className="flex items-center gap-x-2">
                      <p>{task.projectId?.name}</p>
                      <div className="size-1 rounded-full bg-neutral-300" />
                      <div className="text-sm text-muted-foreground flex items-center">
                        <CalendarIcon className="size-3 mr-1" />
                        <span className="truncate">
                          {formatDistanceToNow(new Date(task.dueDate))}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No tasks found
          </li>
        </ul>
        <Button variant="muted" className="mt-4 w-full" asChild>
          <Link to={`/workspace/${param.id}/tasks`}>show All</Link>
        </Button>
      </div>
    </div>
  );
};

export const ProjectList = ({ data, total }) => {
  const param = useParams();
  const dispatch = useDispatch();
  const createProject = () => {
    dispatch(openCreateProjectModal());
  };
  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Project ({total})</p>
          <Button variant="secondary" size="icon" onClick={createProject}>
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.map((project) => (
            <li className="" key={project.id}>
              <Link to={`/workspace/${param.id}/project/${project.id}`}>
                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4 flex items-center gap-x-2.5">
                    <ProjectAvatar
                      className="size-12"
                      avatarFallbackClassName="text-lg"
                      name={project?.name}
                      image={project.image}
                    />
                    <p className="tx-lg font-medium truncate">{project.name}</p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No project found
          </li>
        </ul>
      </div>
    </div>
  );
};

export const MemberList = ({ data, total }) => {
  const param = useParams();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Project ({total})</p>
          <Button variant="secondary" size="icon">
            <Link to={`/workspace/${param.id}/members/`}>
              <SettingsIcon className="size-4 text-neutral-400" />
            </Link>
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((member) => (
            <li className="" key={member.id}>
              <Card className="shadow-none rounded-lg overflow-hidden">
                <CardContent className="p-3 flex flex-col items-center gap-x-2">
                  <WorkspaceMemberavatar
                    className="size-12"
                    name={member._user.name}
                  />
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="tx-lg font-medium line-clamp-1">
                      {member._user.name}
                    </p>
                    <p className="tx-lg font-medium line-clamp-1">
                      {member._user.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No Members found
          </li>
        </ul>
      </div>
    </div>
  );
};
