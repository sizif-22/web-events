import { createSlice } from "@reduxjs/toolkit";
export const editorData = createSlice({
  name: "editorData",
  initialState: {
    valid: true,
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
    handleLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { handleValid, handleShowFormEditor, handleLoading } =
  editorData.actions;
export default editorData.reducer;
