// store/modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isCreateWorkspaceModalOpen: false,
  },
  reducers: {
    openCreateWorkspaceModal: (state) => {
      state.isCreateWorkspaceModalOpen = true;
    },
    closeCreateWorkspaceModal: (state) => {
      state.isCreateWorkspaceModalOpen = false;
    },
    toggleCreateWorkspaceModal: (state) => {
      state.isCreateWorkspaceModalOpen = !state.isCreateWorkspaceModalOpen;
    },
  },
});

export const {
  openCreateWorkspaceModal,
  closeCreateWorkspaceModal,
  toggleCreateWorkspaceModal,
} = modalSlice.actions;

export default modalSlice.reducer;
