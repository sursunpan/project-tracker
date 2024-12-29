import { MoreHorizontal } from "lucide-react";
import TaskAction from "./TaskAction";
import { DottedSeparator } from "../DottedSeparator";
import WorkspaceMemberavatar from "../workspaces/MemberAvatar";
import TaskDate from "../TaskDate";
import ProjectAvatar from "../projects/ProjectAvatar";

/* eslint-disable react/prop-types */
export default function KanbanCard({ task }) {
  console.log(task);
  return (
    <div className="bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-sm line-clamp-2">{task.name}</p>
        <TaskAction id={task.id} projectId={task.projectId}>
          <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition" />
        </TaskAction>
      </div>
      <DottedSeparator />
      <div className="flex items-center gap-x-1.5">
        <WorkspaceMemberavatar
          name={task.assigneeId._user.name}
          fallBackClassName="text-[10px]"
        />
        <div className="size-1 rounded-full bg-neutral-300" />
        <TaskDate value={task.dueDate} className="text-xs" />
      </div>
      <div className="flex items-center gap-x-1.5">
        <ProjectAvatar
          name={task.projectId.name}
          image={task.projectId.image}
          fallBackClassName="text-[10px]"
        />
        <span className="text-xs font-medium">{task.projectId.name}</span>
      </div>
    </div>
  );
}
