import { createSlice } from "@reduxjs/toolkit";
export const editorData2 = createSlice({
  name: "editorData2",
  initialState: {
    allowTochangeRoute: false,
    title: "",
    organization: "",
    date: "",
    time: "",
    where: "",
    head1: "What is all about us?",
    body1: "",
    logoUrl: "",
    img1: "",
    img2: "",
  },
  reducers: {},
});

export const {} = editorData2.actions;
export default editorData2.reducer;
