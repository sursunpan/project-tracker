import { createSlice } from "@reduxjs/toolkit";

const userCredentialSlice = createSlice({
  name: "userCredential",
  initialState: {
    error: true,
    token: null,
    user: null,
  },
  reducers: {
    Login_User: (state, action) => {
      state.error = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    Logout_User: (state) => {
      state.error = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { Login_User, Logout_User } = userCredentialSlice.actions;
export default userCredentialSlice.reducer;
