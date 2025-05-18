import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  patchRequest,
  postRequest,
  postRequestFormData,
} from "../../../services/httpMethods";
import { handleDangNhap } from "../axios";

// Define the async thunk for login
export const login = createAsyncThunk("Account/login", async (values) => {
  try {
    const res = await postRequest("users/login", values);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const registerAcc = createAsyncThunk(
  "Account/registerAcc",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postRequestFormData("users/register", payload);

      return response.data;
    } catch (error) {
      console.error(
        error.response.data.message || "An error occurred during registration."
      );
      return rejectWithValue(error.response || error.response.data.message);
    }
  }
);

export const updateProfile = createAsyncThunk("Account/updateProfile", async (values) => {
  try {
    const res = await patchRequest("users/profile", values);
    return res.data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  isSuccess: false,
  isError: null,
  message: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    // logout(state) {
    //   state.token = null;
    //   notification.success({
    //     message: "Logged out successfully",
    //   });
    // },
    logout(state) {
      state.token = null;
      state.user = null;
      state.role = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.token) {
          handleDangNhap(action.payload);
          localStorage.setItem("userInfo", JSON.stringify(action.payload));
          state.isSuccess = true;
          state.isLoading = false;
          state.isError = false;
        } else if (action.payload.message) {
          state.message = action.payload.message;
          state.isSuccess = false;
          state.isLoading = false;
          state.isError = true;
        }
      })
      // Rejected state
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        console.log(action.payload);
      })
      // Register
      .addCase(registerAcc.pending, (state) => {
        state.isLoading = true;
      })
      // Fulfilled state
      .addCase(registerAcc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      // Rejected state
      .addCase(registerAcc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice;
