import { configureStore } from "@reduxjs/toolkit";
import editorConsts from "./editor.data.consts";
import editor from "./editor.data";
import user from "./user.data";

export default configureStore({
  reducer: {
    editorConsts,
    editor,
    user,
  },
});
