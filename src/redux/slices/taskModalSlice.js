// store/modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const taskModalSlice = createSlice({
  name: "taskModal",
  initialState: {
    isCreateTaskModalOpen: false,
  },
  reducers: {
    openTaskModal: (state) => {
      state.isCreateTaskModalOpen = true;
    },
    closeTaskModal: (state) => {
      state.isCreateTaskModalOpen = false;
    },
    toggleTaskModal: (state) => {
      state.isCreateTaskModalOpen = !state.isCreateTaskModalOpen;
    },
  },
});

export const { openTaskModal, closeTaskModal, toggleTaskModal } =
  taskModalSlice.actions;

export default taskModalSlice.reducer;
