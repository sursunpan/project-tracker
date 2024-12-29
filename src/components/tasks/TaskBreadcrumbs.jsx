/* eslint-disable react/prop-types */
import ProjectAvatar from "../projects/ProjectAvatar";
import { Link, useNavigate } from "react-router-dom";
import { ChevronsRightIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useDeleteConfirm } from "@/hooks/useDeleteConfirm";
import { toast } from "sonner";
import { makeHTTPCall } from "@/helper/make-http-call";
import { useState } from "react";

export default function TaskBreadcrumbs({ project, task }) {
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [DeleteDialog, confirmDelete] = useDeleteConfirm(
    "Delete Task?",
    "Are you sure you want to delete this task?",
    "destructive"
  );

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const ok = await confirmDelete();
      if (!ok) return;

      const response = await makeHTTPCall(`/task/${task.id}`, "DELETE", true);
      const { error, message } = response;
      if (error) throw new Error(message || "API error");
      toast.success("Task deleted successfully!");
      navigate(`/workspace/${project.workSpaceId}/project/${project.id}`);
    } catch (error) {
      console.error("Error during task deletion:", error);
      toast.error(error.message || "Failed to delete task.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <DeleteDialog />
      <ProjectAvatar
        name={project.name}
        image={project.image}
        className="size-6 lg:size-8"
      />
      <Link to={`/workspace/${project.workSpaceId}/project/${project.id}`}>
        <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
          {project.name}
        </p>
      </Link>
      <ChevronsRightIcon className="size-4 lg:size-5 text-muted-foreground" />
      <p className="text-sm lg:text-lg font-semibold">{task.name}</p>
      <Button
        onClick={handleDelete}
        className="ml-auto"
        variant="destructive"
        size="sm"
      >
        <TrashIcon className="size-4 lg:mr-2" />
        <span className="hidden lg:block">Delete Task</span>
      </Button>
    </div>
  );
}
