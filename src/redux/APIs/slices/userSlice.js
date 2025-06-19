// src/redux/APIs/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/httpMethods";

export const getUserByID = createAsyncThunk(
  "userSlice/getUserByID",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getRequest(`users/${userId}`);
      console.log("API Response:", response); // Debug log
      return response.data; // Adjust if API returns data directly
    } catch (error) {
      console.error("API Error:", error); // Debug log
      return rejectWithValue(error.response?.data || "Error fetching user");
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: null,
  message: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setNull(state) {
      state.user = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserByID.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = null;
        state.message = null;
      })
      .addCase(getUserByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "User fetched successfully";
      })
      .addCase(getUserByID.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.payload.message || "Failed to fetch user";
        state.message = action.payload.message || "Failed to fetch user";
      });
  },
});

export const { setNull } = userSlice.actions;
export default userSlice.reducer;