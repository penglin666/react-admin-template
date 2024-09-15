import { createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
export const tagSlice = createSlice({
  name: "tag",
  initialState: {
    items: [],
    activeKey: "",
  },
  reducers: {
    add: (state, { payload }) => {
      const isExist = state.items.some((item) => item.key === payload.key);
      if (isExist) {
        state.activeKey = payload.key;
      } else {
        state.activeKey = payload.key;
        state.items.push(payload);
      }
    },
    edit: (state, { payload }) => {
      // console.log(payload, "payload");
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
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { add, edit } = tagSlice.actions;
export default tagSlice.reducer;
