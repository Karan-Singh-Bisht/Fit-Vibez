import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const pushUpCount = createAsyncThunk(
  "counter/pushUpCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
