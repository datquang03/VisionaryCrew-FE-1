// redux/APIs/slices/doctorRequestSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // Thêm thư viện toast nếu muốn thông báo
import { getRequest, postRequest } from "../../../services/httpMethods";

// Async thunks
export const sendRequest = createAsyncThunk(
  "doctorRequest/sendRequest",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await postRequest("/doctor-requests/send", requestData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 400) {
        throw new Error(response.data?.message || "Gửi yêu cầu thất bại");
      }
      toast.success(response.data?.message || "Yêu cầu đã được gửi thành công!");
      return response.data.request; // Trả về request từ response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Đã xảy ra lỗi khi gửi yêu cầu";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getUserRequests = createAsyncThunk(
  "doctorRequest/getUserRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest("/doctor-requests/user", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status >= 400) {
        throw new Error(response.data?.message || "Lấy danh sách yêu cầu thất bại");
      }
      return response.data; // Trả về danh sách requests từ response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Đã xảy ra lỗi khi lấy danh sách yêu cầu";
      return rejectWithValue(errorMessage);
    }
  }
);

const doctorRequestSlice = createSlice({
  name: "doctorRequest",
  initialState: {
    requests: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // Send Request
    builder
      .addCase(sendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload);
        state.success = action.payload.message || "Yêu cầu đã được gửi thành công!";
      })
      .addCase(sendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get User Requests
    builder
      .addCase(getUserRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getUserRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getUserRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = doctorRequestSlice.actions;
export default doctorRequestSlice.reducer;