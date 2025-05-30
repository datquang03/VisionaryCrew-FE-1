import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./APIs/slices/authSlice";
import tranSlice from "./APIs/slices/transactionSlice"
import doctorSlice from "./APIs/slices/doctorSlice";
const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    doctorSlice: doctorSlice.reducer,
    tranSlice: tranSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
