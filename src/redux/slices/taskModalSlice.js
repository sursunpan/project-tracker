// store/modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const taskModalSlice = createSlice({
  name: "taskModal",
  initialState: {
    isCreateTaskModalOpen: false,
    isEditTaskModalOpen: false,
    taskId: undefined,
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
    openEditTaskModal: (state, action) => {
      state.isEditTaskModalOpen = true;
      state.taskId = action.payload;
    },
    closeEditTaskModal: (state) => {
      state.isEditTaskModalOpen = false;
      state.taskId = undefined;
    },
    toggleEditTaskModal: (state) => {
      state.isEditTaskModalOpen = !state.isEditTaskModalOpen;
      state.taskId = undefined;
    },
  },
});

export const {
  openTaskModal,
  closeTaskModal,
  toggleTaskModal,
  openEditTaskModal,
  closeEditTaskModal,
  toggleEditTaskModal,
} = taskModalSlice.actions;

export default taskModalSlice.reducer;
