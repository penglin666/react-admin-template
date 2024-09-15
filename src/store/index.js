import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/user";
import tagReducer from "./modules/tag";

export default configureStore({
  reducer: {
    counter: counterReducer,
    tag: tagReducer,
  },
});
