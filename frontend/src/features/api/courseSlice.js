import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateCourse = createAsyncThunk("course/update", async (formData) => {
  const response = await axios.post(
    "http://localhost:8080/api/course",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );
  return response.data;
});

const courseSlice = createSlice({
  name: "course",
  initialState: { course: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.course = action.payload;
      })
      .addCase(updateCourse.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default courseSlice.reducer;