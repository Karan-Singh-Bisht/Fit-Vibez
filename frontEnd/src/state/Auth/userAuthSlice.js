import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import Cookies from "js-cookie";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/user/register`,
        userDetails
      );
      Cookies.set("token", response.data.token, { expires: 1 });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/user/login`,
        userDetails
      );
      Cookies.set("token", response.data.token, { expires: 1 });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk(
  "user/logOut",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = Cookies.get("token");
      await axios.get(`${API_BASE_URL}/api/v1/user/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(logOutUser());
      return { message: "User Logged Out Successfully" };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    token: null,
  },
  reducers: {
    logOutUser: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.newUser;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.userDetails;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logOutUser } = userAuthSlice.actions;
export default userAuthSlice.reducer;
