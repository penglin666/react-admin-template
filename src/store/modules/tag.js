import { createSlice } from "@reduxjs/toolkit";
export const tagSlice = createSlice({
  name: "tag",
  initialState: {
    items: [],
    activeKey: "",
  },
  reducers: {
    add: (state, { payload }) => {
      const isExist = state.items.some((item) => item.key === payload.key);
      if (!isExist) {
        state.items.push(payload);
      }
      state.activeKey = payload.key;
    },
    edit: (state, { payload }) => {
      const { type, key } = payload;
      const index = state.items.findIndex((item) => item.key === key);
      switch (type) {
        case "closeCurrent":
          if (key !== "/home") {
            state.items.splice(index, 1);
            state.activeKey = state.items[index - 1].key;
          }
          break;
        case "closeLeft":
          state.items.splice(1, index - 1);
          break;
        case "closeRight":
          state.items.splice(index + 1);
          break;
        case "closeOther": //关闭其它所有窗口-只有首页和当前页
          if (key === "/home") {
            state.items = [state.items[0]];
          } else {
            state.items = [state.items[0], state.items[index]];
          }
          break;
        case "closeAll": //关闭其它所有窗口-只有首页
          state.items = [state.items[0]];
          state.activeKey = state.items[0].key;
          break;
      }
    },
    clear: (state) => {
      state.items = [];
      state.activeKey = "";
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { add, edit, clear } = tagSlice.actions;
export default tagSlice.reducer;
