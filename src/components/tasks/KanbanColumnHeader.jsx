/* eslint-disable react/prop-types */
import { snakeCaseToTitleCase } from "@/lib/utils";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  CircleIcon,
  PlusIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { openTaskModal } from "@/redux/slices/taskModalSlice";

const statusIconMap = {
  BACKLOG: <CircleDashedIcon className="size-[18px] text-pink-400" />,
  TODO: <CircleIcon className="size-[18px] text-red-400" />,
  IN_PROGRESS: <CircleDotDashedIcon className="size-[18px] text-yellow-400" />,
  IN_REVIEW: <CircleDotIcon className="size-[18px] text-blue-400" />,
  DONE: <CircleCheckIcon className="size-[18px] text-emerald-400" />,
};

export default function KanbanColumnHeader({ board, taskCount }) {
  const dispatch = useDispatch();

  const icon = statusIconMap[board];

  const openModal = useCallback(() => {
    dispatch(openTaskModal());
  }, [dispatch]);

  return (
    <div className="px-2 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2 className="text-sm font-medium">{snakeCaseToTitleCase(board)}</h2>
        <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-700 font-medium">
          {taskCount}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="size-5"
        onClick={openModal}
      >
        <PlusIcon className="size-4 text-neutral-500" />
      </Button>
    </div>
  );
}
