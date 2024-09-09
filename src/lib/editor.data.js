// import { createSlice } from "@reduxjs/toolkit";
// export const editorData = createSlice({
//   name: "editorData",
//   initialState: {
//     title: "test",
//     description: "test description",
//     loading: false,
//   },
//   reducers: {
//     createEvent: async (state) => {
//       console.log("start");
//       state.loading = true;
//       const userData = await getUser();
//       const user = userData.data();
//       const data = {
//         title: state.title,
//         description: state.description,
//         organizer: user.email,
//       };
//       await addEvent(data);
//     },
//     handleTitle: (state, action) => {
//       state.title = action.payload;
//     },
//     handleDescription: (state, action) => {
//       state.description = action.payload;
//     },
//   },
// });

// export const { createEvent, handleTitle, handleDescription } =
//   editorData.actions;
// export default editorData.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "@/app/firebase/firebase.firestore";
import { addEvent } from "@/app/firebase/firestore.events";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define the thunk for creating an event
export const createEvent = createAsyncThunk(
  "editorData/createEvent",
  async (_, { getState }) => {
    console.log("start");
    const state = getState().editorData;
    console.log("==============");
    const userData = await getUser();

    const user = userData.data();
    console.log(user);
    console.log(state);
    const data = {
      title: state.title,
      description: state.description,
      organizer: user.email,
    };
    console.log(data);
    await addEvent(data);
    console.log("end");
    return data;
  }
);

export const editorData = createSlice({
  name: "editorData",
  initialState: {
    title: "test",
    description: "test description",
    loading: false,
  },
  reducers: {
    handleTitle: (state, action) => {
      state.title = action.payload;
    },
    handleDescription: (state, action) => {
      state.description = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createEvent.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { handleTitle, handleDescription } = editorData.actions;
export default editorData.reducer;
