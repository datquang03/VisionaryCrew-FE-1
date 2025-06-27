import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, getRequest, putRequest, deleteRequest } from "../../../services/httpMethods";
import { toast } from "react-toastify";

// Thunk để gửi hồ sơ y tế
export const createMedicalRecord = createAsyncThunk(
  "medicalRecord/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequest("/record", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message || "Tạo hồ sơ thành công!");
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Có lỗi xảy ra";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Thunk để lưu hồ sơ y tế
export const saveMedicalRecord = createAsyncThunk(
  "medicalRecord/save",
  async (medicalRecordId, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        `/users/record/save`,
        { medicalRecordId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message || "Lưu hồ sơ y tế thành công!");
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Có lỗi xảy ra";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Thunk để lấy danh sách hồ sơ y tế đã lưu
export const getSavedMedicalRecords = createAsyncThunk(
  "medicalRecord/getSaved",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getRequest(`/users/record/save/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Có lỗi xảy ra";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Thunk để cập nhật hồ sơ y tế
export const updateMedicalRecord = createAsyncThunk(
  "medicalRecord/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await putRequest(`/record/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message || "Cập nhật hồ sơ thành công!");
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Có lỗi xảy ra";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Thunk để xóa hồ sơ y tế
export const deleteMedicalRecord = createAsyncThunk(
  "medicalRecord/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(`/record/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message || "Xóa hồ sơ thành công!");
      return id; // Trả về id để filter ra khỏi state
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Có lỗi xảy ra";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Thunk để reset trạng thái
export const resetMedicalRecordStatus = createAsyncThunk(
  "medicalRecord/resetStatus",
  async (_, { rejectWithValue }) => {
    try {
      return { message: "Trạng thái đã được reset" };
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Có lỗi xảy ra";
      return rejectWithValue(errorMsg);
    }
  }
);

const medicalRecordSlice = createSlice({
  name: "medicalRecord",
  initialState: {
    records: [],
    savedRecords: [],
    currentMedicalRecordId: null,
    loading: false,
    error: null,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.currentMedicalRecordId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý createMedicalRecord
      .addCase(createMedicalRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createMedicalRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload.record);
        state.currentMedicalRecordId = action.payload.medicalRecordId || action.payload.record?._id;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message || "Tạo hồ sơ thành công";
      })
      .addCase(createMedicalRecord.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Tạo hồ sơ thất bại";
      })
      // Xử lý saveMedicalRecord
      .addCase(saveMedicalRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(saveMedicalRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message || "Lưu hồ sơ y tế thành công";
        if (action.payload.savedMedicalRecord) {
          state.savedRecords.push(action.payload.savedMedicalRecord);
        }
      })
      .addCase(saveMedicalRecord.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Lưu hồ sơ y tế thất bại";
      })
      // Xử lý getSavedMedicalRecords
      .addCase(getSavedMedicalRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getSavedMedicalRecords.fulfilled, (state, action) => {
        state.loading = false;
        // Kiểm tra nếu action.payload là mảng hoặc có savedMedicalRecords
        if (Array.isArray(action.payload)) {
          state.savedRecords = action.payload; // Nếu API trả về trực tiếp mảng
        } else if (action.payload?.savedMedicalRecords) {
          state.savedRecords = action.payload.savedMedicalRecords; // Nếu có trường savedMedicalRecords
        } else {
          state.savedRecords = []; // Fallback nếu không có dữ liệu
        }
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message || "Lấy danh sách hồ sơ y tế đã lưu thành công";
      })
      .addCase(getSavedMedicalRecords.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Lấy danh sách hồ sơ y tế đã lưu thất bại";
      })
      // Xử lý updateMedicalRecord
      .addCase(updateMedicalRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateMedicalRecord.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.savedRecords.findIndex(record => record._id === action.payload.record._id);
        if (index !== -1) {
          state.savedRecords[index] = action.payload.record;
        }
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message || "Cập nhật hồ sơ thành công";
      })
      .addCase(updateMedicalRecord.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Cập nhật hồ sơ thất bại";
      })
      // Xử lý deleteMedicalRecord
      .addCase(deleteMedicalRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(deleteMedicalRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.savedRecords = state.savedRecords.filter(record => record._id !== action.payload);
        state.isSuccess = true;
        state.isError = false;
        state.message = "Xóa hồ sơ thành công";
      })
      .addCase(deleteMedicalRecord.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Xóa hồ sơ thất bại";
      })
      // Xử lý resetMedicalRecordStatus
      .addCase(resetMedicalRecordStatus.fulfilled, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.currentMedicalRecordId = null;
      });
  },
});

export const { resetStatus } = medicalRecordSlice.actions;
export default medicalRecordSlice.reducer;