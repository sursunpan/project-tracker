import ResponsiveModal from "../ResponsiveModal";
import { useDispatch, useSelector } from "react-redux";
import { closeTaskModal } from "@/redux/slices/taskModalSlice";
import CreateTaskFormWrapper from "./CreateTaskModalWrapper";

export default function CreateTaskModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.taskModal.isCreateTaskModalOpen);

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      dispatch(closeTaskModal());
    }
  };

  const handleCancel = () => {
    dispatch(closeTaskModal());
  };

  return (
    <ResponsiveModal open={isOpen} onOpenChange={handleOpenChange}>
      <CreateTaskFormWrapper onCancel={handleCancel} />
    </ResponsiveModal>
  );
}
