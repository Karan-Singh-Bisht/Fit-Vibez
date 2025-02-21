import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";

export const pushUpTracker = createAsyncThunk(
  "activity/pushUpTracker",
  async ({ pushUpCount, userAddress }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/track/pushups`,
        {
          userAddress,
          pushUpCount,
        }
      );
      return response.data; // ✅ Ensure response is returned properly
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const ActivitySlice = createSlice({
  name: "activity",
  initialState: {
    error: null,
    finalCount: 0,
    loading: false,
    message: null,
  },
  reducers: {
    setFinalActivityCount: (state, action) => {
      state.finalCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(pushUpTracker.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(pushUpTracker.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    });
    builder.addCase(pushUpTracker.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const { setFinalActivityCount } = ActivitySlice.actions;
export default ActivitySlice.reducer;
