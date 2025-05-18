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
    return res;
  } catch (error) {
    return error;
  }
});

export const registerAcc = createAsyncThunk(
  "Account/registerAcc",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postRequestFormData("users/register", payload);

      return response;
    } catch (error) {
      console.error(
        error.response.data.message || "An error occurred during registration."
      );
      return rejectWithValue(error.response || error.response.data.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "Account/updateProfile",
  async (values) => {
    try {
      const res = await patchRequest("users/profile", values);
      return res;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: null,
  message: null,
  updatedUser: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("userInfo");
      state.user = null;
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.message = null;
    },
    setNull(state){
      state.isSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.status === 200 || action.payload.status === 201) {
          handleDangNhap(action.payload.data);
          localStorage.setItem("userInfo", JSON.stringify(action.payload.data));
          state.isSuccess = true;
          state.isLoading = false;
          state.isError = false;
        } else {
          state.message = action.payload.response.data.message;
          state.isSuccess = false;
          state.isLoading = false;
          state.isError = true;
        }
      })
      // Rejected state
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(registerAcc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAcc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerAcc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || "Registration failed";
      })

      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (action.payload.status === 200 || action.payload.status === 201) {
          state.isLoading = false;
          state.isSuccess = true;
          state.updatedUser = action.payload.data.user;
          state.message = action.payload.data.message;
        } else {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.message = action.payload.response.data.message;
        }
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const { logout, setNull } = authSlice.actions;

export default authSlice;
