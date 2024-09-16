import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import tagReducer from "./modules/tag";

export default configureStore({
  reducer: {
    user: persistReducer({ key: "user", storage: sessionStorage }, userReducer),
    tag: persistReducer({ key: "tag", storage: sessionStorage }, tagReducer),
  },
  // 禁止序列化 否则redux-persist会报错
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
