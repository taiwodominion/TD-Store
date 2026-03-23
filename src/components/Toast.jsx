import React from "react";
import { useApp } from "../contexts/AppContext";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import "../css/Toast.css";

const Toast = () => {
  const { toast, setToast } = useApp();

  if (!toast.show) return null;

  return (
    <div className={`global-toast ${toast.type}`}>
      <div className="toast-content">
        {toast.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
        <span className="toast-msg">{toast.message}</span>
      </div>
      <button 
        className="toast-close" 
        onClick={() => setToast({ ...toast, show: false })}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;