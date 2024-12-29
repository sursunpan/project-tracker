/* eslint-disable react/prop-types */
import useWorkspaceMember from "@/hooks/workspace/useWorkspaceMember";
import useWorkspaceProject from "@/hooks/workspace/useWorkspaceProject";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Loader } from "lucide-react";
import EditTaskForm from "./edit-task-form";
import useGetTask from "@/hooks/tasks/useGetTask";

export default function EditTaskFormWrapper({ onCancel, id }) {
  const params = useParams();

  const { data, loading } = useGetTask(id);

  console.log(data);

  const { data: projects, isLoading: isLoadingProjects } = useWorkspaceProject(
    params.id
  );
  const { data: members, isLoading: isLoadingMembers } = useWorkspaceMember(
    params.id
  );

  const projectOptions = projects?.map((project) => ({
    id: project.id,
    name: project.name,
    image: project.image,
  }));

  const membersOptions = members?.map((member) => ({
    id: member.id,
    name: member._user.name,
  }));

  const isLoading = isLoadingProjects || isLoadingMembers || loading;

  if (isLoading || !projects || !members) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <EditTaskForm
      onCancel={onCancel}
      projectOptions={projectOptions}
      memberOptions={membersOptions}
      initialValues={data}
    />
  );
}
