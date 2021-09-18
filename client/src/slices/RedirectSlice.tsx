import { createSlice } from "@reduxjs/toolkit";

export const redirectSlice = createSlice({
  name: "redirect",
  initialState: {
    redirect: null,
  },
  reducers: {
    redirect: (state, action): any => {
      return { redirectTo: action.payload };
    },
  },
});

export const { redirect } = redirectSlice.actions;
export const selectRedirect = (state: any) => state.redirect.redirect;
export default redirectSlice.reducer;
