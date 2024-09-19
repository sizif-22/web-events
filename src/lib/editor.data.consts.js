import { createSlice } from "@reduxjs/toolkit";

export const editorData = createSlice({
  name: "editorData",
  initialState: {
    valid: false,
    showFormEditor: false,
    loading: false,
    allowTochangeRoute: false,
    error: null,
  },
  reducers: {
    handleValid: (state, action) => {
      state.valid = action.payload;
    },
    handleShowFormEditor: (state, action) => {
      state.showFormEditor = action.payload;
    },
  },
});

export const { handleValid, handleShowFormEditor } =
  editorData.actions;
export default editorData.reducer;
