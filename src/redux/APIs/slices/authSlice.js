import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  patchRequest,
  postRequest,
} from "../../../services/httpMethods";
import { handleDangNhap } from "../axios";


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
  async (payload) => {
    try {
      const response = await postRequest("users/register", payload);

      return response;
    } catch (error) {
      return error;
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
  isSuccessReg:false
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
    setNull(state) {
      state.isSuccess = false;
      state.isSuccessReg = false
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
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(registerAcc.pending, (state) => {
        state.isLoading = true;
        state.isSuccessReg = false;
        state.isError = false;
      })
      .addCase(registerAcc.fulfilled, (state, action) => {
        if (action.payload.status === 200 || action.payload.status === 201) {
          state.isSuccessReg = true;
          state.isLoading = false;
          state.isError = false;
          state.message = action.payload.data.message;
        } else {
          state.message = action.payload.response.data.message;
          state.isSuccessReg = false;
          state.isLoading = false;
          state.isError = true;
        }
      })
      .addCase(registerAcc.rejected, (state) => {
        state.isLoading = false;
        state.isSuccessReg = false;
        state.isError = true;
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
