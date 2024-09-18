import { createSlice } from "@reduxjs/toolkit";
export const editorData = createSlice({
  name: "editorData",
  initialState: {
    title: "",
    organization: "",
    date: "",
    time: "",
    where: "",
    head1: "What is all about us?",
    body1: "",
    logo: "",
    img1: "",
    img2: "",
    features: [],
    form: [],
  },
  reducers: {
    handleTitle: (state, action) => {
      state.title = action.payload;
    },
    handleOrganization: (state, action) => {
      state.organization = action.payload;
    },
    handleHead1: (state, action) => {
      state.head1 = action.payload;
    },
    handleBody1: (state, action) => {
      state.body1 = action.payload;
    },
    handleLogo: (state, action) => {
      state.logo = action.payload;
    },
    handleImg1: (state, action) => {
      state.img1 = action.payload;
    },
    handleImg2: (state, action) => {
      state.img2 = action.payload;
    },
    handleDate: (state, action) => {
      state.date = action.payload;
    },
    handleTime: (state, action) => {
      state.time = action.payload;
    },
    handleWhere: (state, action) => {
      state.where = action.payload;
    },
    handleForm: (state, action) => {
      state.form = action.payload;
    },
  },
});

export const {
  handleBody1,
  handleHead1,
  handleImg1,
  handleImg2,
  handleLogo,
  handleOrganization,
  handleTitle,
  handleDate,
  handleTime,
  handleWhere,
  handleForm,
} = editorData.actions;
export default editorData.reducer;
