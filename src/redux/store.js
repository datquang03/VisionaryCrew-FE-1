import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./APIs/slices/authSlice";
import tranSlice from "./APIs/slices/transactionSlice"
import doctorSlice from "./APIs/slices/doctorSlice";
import messageSlice from "./APIs/slices/messageSlice";
import userSlice from "./APIs/slices/userSlice";
import medicineSlice from "./APIs/slices/medicineSlice";
import chatAI from "./APIs/slices/chatAISlice";
import doctorRequestSlice from "./APIs/slices/doctorRequestSlice";
import medicalRecordSlice from "./APIs/slices/medicalRecordSlice";

const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    doctorSlice: doctorSlice.reducer,
    tranSlice: tranSlice.reducer,
    messageSlice: messageSlice.reducer,
    userSlice: userSlice.reducer,
    medicine: medicineSlice,
    chatAI,
    doctorRequest: doctorRequestSlice,  
    medicalRecord: medicalRecordSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
