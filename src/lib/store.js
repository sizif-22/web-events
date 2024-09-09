import { configureStore } from "@reduxjs/toolkit";
import editor from "./editor.data";

export default configureStore({
  reducer: {
    editor,
  },
});
