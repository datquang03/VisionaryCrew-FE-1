// src/utils/toast.js
import { toast } from "react-hot-toast";
import CustomHotToast from "../components/Toast/CustomToast";

export const showToast = (message, type = "info") => {
  toast.custom(
    (t) => (
      <CustomHotToast
        id={t.id}
        message={message}
        type={type}
        visible={t.visible}
        onClose={toast.dismiss}
      />
    ),
    { duration: 5000 }
  );
};
