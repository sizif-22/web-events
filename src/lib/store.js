import { configureStore } from "@reduxjs/toolkit";
import editor from "./editor.data";
import user from "./user.data";

export default configureStore({
  reducer: {
    editor,
    user,
  },
});
