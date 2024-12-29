import { PencilIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DottedSeparator } from "../DottedSeparator";
import OverviewProperty from "./OverviewProperty";
import WorkspaceMemberavatar from "../workspaces/MemberAvatar";
import TaskDate from "../TaskDate";
import { Badge } from "../ui/badge";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { openEditTaskModal } from "@/redux/slices/taskModalSlice";
import { useDispatch } from "react-redux";

/* eslint-disable react/prop-types */
export default function TaskOverview({ task }) {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(openEditTaskModal(task.id));
  };

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Overview</p>
          <Button
            size="sm"
            variant="secondary"
            className=""
            onClick={openModal}
          >
            <PencilIcon className="size-4 mr-2" />
            Edit
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Assignee">
            <WorkspaceMemberavatar
              name={task.assigneeId._user.name}
              className="size-6"
            />
            <p className="text-sm font-medium">{task.assigneeId._user.name}</p>
          </OverviewProperty>
          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate} className="text-sm font-medium" />
          </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={task.status}>
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
}
