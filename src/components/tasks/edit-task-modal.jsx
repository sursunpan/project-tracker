import ResponsiveModal from "../ResponsiveModal";
import { useDispatch, useSelector } from "react-redux";
import { closeEditTaskModal } from "@/redux/slices/taskModalSlice";
import EditTaskFormWrapper from "./EditTaskModalWrapper";

export default function EditTaskModal() {
  const dispatch = useDispatch();
  const taskId = useSelector((state) => state.taskModal.taskId);

  const handleOpenChange = (taskId) => {
    if (!taskId) {
      dispatch(closeEditTaskModal());
    }
  };

  const handleCancel = () => {
    dispatch(closeEditTaskModal());
  };

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={handleOpenChange}>
      <EditTaskFormWrapper id={taskId} onCancel={handleCancel} />
    </ResponsiveModal>
  );
}
