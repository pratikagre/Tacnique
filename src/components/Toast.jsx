import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={20} className="toast-icon" />;
      case 'error':
        return <AlertCircle size={20} className="toast-icon" />;
      default:
        return <Info size={20} className="toast-icon" />;
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast toast-${toast.type || 'info'}`}>
        {getIcon()}
        <span style={{ flex: 1 }}>{toast.message}</span>
        <button className="close-btn" onClick={onClose}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
