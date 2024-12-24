// store/modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const projectModalSlice = createSlice({
  name: "projectModal",
  initialState: {
    isCreateProjectModalOpen: false,
  },
  reducers: {
    openCreateProjectModal: (state) => {
      state.isCreateProjectModalOpen = true;
    },
    closeCreateProjectModal: (state) => {
      state.isCreateProjectModalOpen = false;
    },
    toggleCreateProjectModal: (state) => {
      state.isCreateProjectModalOpen = !state.isCreateProjectModalOpen;
    },
  },
});

export const {
  openCreateProjectModal,
  closeCreateProjectModal,
  toggleCreateProjectModal,
} = projectModalSlice.actions;

export default projectModalSlice.reducer;
