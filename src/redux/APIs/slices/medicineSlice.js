// redux/APIs/slices/medicineSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, postRequest, putRequest } from "../../../services/httpMethods";

export const fetchMedicines = createAsyncThunk(
  "medicine/fetchMedicines",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest("/medicines", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status >= 400) throw new Error(response.data?.message || "Lấy danh sách thuốc thất bại");
      return response.data; // Lấy dữ liệu JSON từ response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Lỗi không xác định");
    }
  }
);

export const fetchMedicineById = createAsyncThunk(
  "medicine/fetchMedicineById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getRequest(`/medicines/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status >= 400) throw new Error(response.data?.message || "Lấy thông tin thuốc thất bại");
      return response.data; // Lấy dữ liệu JSON từ response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Lỗi không xác định");
    }
  }
);

export const createMedicine = createAsyncThunk(
  "medicine/createMedicine",
  async (medicineData, { rejectWithValue }) => {
    try {
      const response = await postRequest("/medicines", medicineData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status >= 400) throw new Error(response.data?.message || "Tạo thuốc thất bại");
      return response.data.medicine; // Giả định data chứa trường medicine
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Lỗi không xác định");
    }
  }
);

export const updateMedicine = createAsyncThunk(
  "medicine/updateMedicine",
  async ({ id, medicineData }, { rejectWithValue }) => {
    try {
      const response = await putRequest(`/medicines/${id}`, medicineData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status >= 400) throw new Error(response.data?.message || "Cập nhật thuốc thất bại");
      return response.data.medicine; // Giả định data chứa trường medicine
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Lỗi không xác định");
    }
  }
);

export const deleteMedicine = createAsyncThunk(
  "medicine/deleteMedicine",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(`/medicines/${id}`, null, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status >= 400) throw new Error(response.data?.message || "Xóa thuốc thất bại");
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Lỗi không xác định");
    }
  }
);

const medicineSlice = createSlice({
  name: "medicine",
  initialState: {
    medicines: [],
    selectedMedicine: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedMedicine: (state) => {
      state.selectedMedicine = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all medicines
    builder
      .addCase(fetchMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload;
      })
      .addCase(fetchMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch medicine by ID
    builder
      .addCase(fetchMedicineById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicineById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMedicine = action.payload;
      })
      .addCase(fetchMedicineById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create medicine
    builder
      .addCase(createMedicine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMedicine.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines.push(action.payload);
      })
      .addCase(createMedicine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update medicine
    builder
      .addCase(updateMedicine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMedicine.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.medicines.findIndex((m) => m._id === action.payload._id);
        if (index !== -1) state.medicines[index] = action.payload;
      })
      .addCase(updateMedicine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete medicine
    builder
      .addCase(deleteMedicine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMedicine.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = state.medicines.filter((m) => m._id !== action.payload);
      })
      .addCase(deleteMedicine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedMedicine } = medicineSlice.actions;
export default medicineSlice.reducer;