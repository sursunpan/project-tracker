/* eslint-disable react/prop-types */
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDeleteConfirm } from "@/hooks/Delete-Confirm-Hook";
import { toast } from "sonner";
import { makeHTTPCall } from "@/helper/make-http-call";
import { useNavigate, useParams } from "react-router-dom";
import { openEditTaskModal } from "@/redux/slices/taskModalSlice";
import { useDispatch } from "react-redux";

export default function TaskAction({ id, projectId, children }) {
  const params = useParams();
  const navigaate = useNavigate();
  const dispatch = useDispatch();
  const [DeleteDialog, confirmDelete] = useDeleteConfirm(
    "Delete Task",
    "Are you sure you want to delete this Task?",
    "destructive"
  );

  const openModal = () => {
    dispatch(openEditTaskModal(id));
  };

  const onDelete = async () => {
    try {
      const ok = await confirmDelete();
      if (!ok) return;
      await makeHTTPCall(`task/${id}`, "DELETE", true);
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error during task deletion:", error);
      toast.error(error.message || "Failed to delete task.");
    }
  };

  const onOpenTask = () => {
    navigaate(`/workspace/${params.id}/task/${id}`);
  };

  const onOpenProject = () => {
    navigaate(`/workspace/${params.id}/project/${projectId}`);
  };

  return (
    <div className="flex justify-end">
      <DeleteDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={onOpenTask}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={openModal}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            disabled={false}
            className="text-amber-700 focus:text-amber-300 font-medium p-[10px]"
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
