import ResponsiveModal from "../responsive-modal";
import CreateWorkspaceFrom from "./create-workspace-from";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateWorkspaceModal } from "@/redux/slices/modalSlice";

export default function CreateWorkspaceModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isCreateWorkspaceModalOpen);

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      dispatch(closeCreateWorkspaceModal());
    }
  };

  const handleCancel = () => {
    dispatch(closeCreateWorkspaceModal());
  };

  return (
    <ResponsiveModal open={isOpen} onOpenChange={handleOpenChange}>
      <CreateWorkspaceFrom onCancel={handleCancel} />
    </ResponsiveModal>
  );
}
