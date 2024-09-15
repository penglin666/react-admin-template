import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/user";
import { persistReducer } from "redux-persist";
import sessionStorage  from 'redux-persist/lib/storage/session';
import tagReducer from "./modules/tag";

export default configureStore({
  reducer: {
    counter: counterReducer,
    tag: persistReducer({key:'tag',storage:sessionStorage },tagReducer),
  },
  // 禁止序列化 否则redux-persist会报错
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
