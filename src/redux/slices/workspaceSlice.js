// src/redux/slices/workspaceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setWorkspaces: (state, action) => {
      state.list = action.payload;
    },
    addWorkspace: (state, action) => {
      state.list.push(action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setWorkspaces, addWorkspace, setLoading, setError } =
  workspaceSlice.actions;

export default workspaceSlice.reducer;
