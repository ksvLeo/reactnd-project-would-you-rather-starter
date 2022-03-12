import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: { value: null },
  reducers: {
    loginUser: (state, action) => {
      state.value = action.payload.value;
    },
    logoutUser: (state) => {
      state.value = null;
    },
    authedUser: (state, action) => {
      return state
    },
  },
});

export const { loginUser, logoutUser, authedUser } = sessionSlice.actions;
export default sessionSlice.reducer;
