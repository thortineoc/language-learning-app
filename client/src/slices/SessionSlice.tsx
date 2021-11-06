import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    session: null,
  },
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
  },
});

export const { setSession } = sessionSlice.actions;
export const selectSession = (state: any) => state.session.session;
export default sessionSlice.reducer;
