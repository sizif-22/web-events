import { configureStore } from "@reduxjs/toolkit";
import editor from "./editor.data";
import editor2 from './editor2.data';
import user from "./user.data";

export default configureStore({
  reducer: {
    editor,
    editor2,
    user,
  },
});
