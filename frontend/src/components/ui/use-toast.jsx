import React, { useState, createContext, useContext, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const addToast = useCallback(({ title, description, variant }) => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {toast && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${toast.variant === 'destructive' ? 'bg-red-500' : 'bg-green-500'}`}>
          <h4 className="font-bold">{toast.title}</h4>
          <p className="text-sm">{toast.description}</p>
        </div>
      )}
    </ToastContext.Provider>
  );
};
