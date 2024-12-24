import ResponsiveModal from "../responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateProjectModal } from "@/redux/slices/projectModalSlice";
import CreateProjectForm from "./create-project-form";

export default function CreateProjectModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state) => state.projectModal.isCreateProjectModalOpen
  );

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      dispatch(closeCreateProjectModal());
    }
  };

  const handleCancel = () => {
    dispatch(closeCreateProjectModal());
  };

  return (
    <ResponsiveModal open={isOpen} onOpenChange={handleOpenChange}>
      <CreateProjectForm onCancel={handleCancel} />
    </ResponsiveModal>
  );
}
