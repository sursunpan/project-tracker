import { cn } from "@/lib/utils";
import WorkspaceMemberavatar from "../workspaces/Member-avatar";
import ProjectAvatar from "../projects/Project-avatar";
import { useNavigate, useParams } from "react-router-dom";

const statusColorMap = {
  BACKLOG: "border-l-pink-500",
  TODO: "border-l-red-500",
  IN_PROGRESS: "border-l-yellow-500",
  IN_REVIEW: "border-l-blue-500",
  DONE: "border-l-emerald-500",
};
/* eslint-disable react/prop-types */
export default function EventCard({ title, assignee, project, status, id }) {
  const { id: workSpaceId } = useParams();
  const navigate = useNavigate();

  const onClick = (e) => {
    e.stopPropagation();
    navigate(`/workspace/${workSpaceId}/tasks/${id}`);
  };

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 fle flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
          statusColorMap[status]
        )}
      >
        <p>{title}</p>
        <div className="flex items-center gap-x-1">
          <WorkspaceMemberavatar name={assignee._user.name} />
        </div>
        <div className="size-1 rounded-full bg-neutral-300" />
        <ProjectAvatar name={project.name} image={project.image} />
      </div>
    </div>
  );
}
