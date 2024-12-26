import { createSlice } from "@reduxjs/toolkit";

const taskViewSlice = createSlice({
  name: "taskView",
  initialState: {
    taskView: "table",
  },
  reducers: {
    changeTaskView: (state, action) => {
      state.taskView = action.payload;
    },
  },
});

export const { changeTaskView } = taskViewSlice.actions;
export default taskViewSlice.reducer;
