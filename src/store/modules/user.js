import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: {},
  },
  reducers: {
    set: (state, { payload }) => {
      state.profile = payload;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { get, set } = userSlice.actions;

export default userSlice.reducer;
