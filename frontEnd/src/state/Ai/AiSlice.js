import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";

export const pushUpTracker = createAsyncThunk(
  "activity/pushUpTracker",
  async (pushupCount, { rejectWithValue }) => {
    try {
      const count = await axios.post(`${API_BASE_URL}/api/v1/track/pushups`);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const ActivitySlice = createSlice({
  name: "activity",
  initialState: {
    finalCount: 0,
  },
  reducers: {
    setFinalActivityCount: (state, action) => {
      state.finalCount = action.payload;
    },
  },
});

export const { setActivityCount, setFinalActivityCount } =
  ActivitySlice.actions;

export default ActivitySlice.reducer;
