import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "@/app/firebase/firebase.firestore";
import { addEvent } from "@/app/firebase/firestore.events";
let i = 0;
export const createEventAsync = createAsyncThunk(
  "editor/createEvent",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { editor } = getState();
      const res = await getUser();
      const user = res?.data();
      if (!user) {
        throw new Error("User data is unavailable.");
      }
      const data = {
        title: editor.title,
        description: editor.description,
        organizer: user.email,
      };
      await addEvent(data);
      window.location.href = "/account";
      return "Event added successfully";
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editorData = createSlice({
  name: "editorData",
  initialState: {
    title: "test",
    description: "test description",
    loading: false,
    allowTochangeRoute: false,
    error: null,
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
      .addCase(createEventAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEventAsync.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
      })
      .addCase(createEventAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("there is an error =>> ", action.payload);
      });
  },
});

export const { handleTitle, handleDescription } = editorData.actions;
export default editorData.reducer;
