import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk gọi API ChatGPT
export const askChatAI = createAsyncThunk(
  "chatAI/askChatAI",
  async (question, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat/ask`,
        { question }
      );
      return response.data.answer;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Lỗi khi gọi ChatGPT API"
      );
    }
  }
);

const chatAISlice = createSlice({
  name: "chatAI",
  initialState: {
    question: "",
    answer: "",
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    clearChatAI: (state) => {
      state.question = "";
      state.answer = "";
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(askChatAI.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(askChatAI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.answer = action.payload;
      })
      .addCase(askChatAI.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { clearChatAI } = chatAISlice.actions;
export default chatAISlice.reducer;
