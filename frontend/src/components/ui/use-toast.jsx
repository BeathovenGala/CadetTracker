import * as React from "react";

const ToastContext = React.createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (message, type = "default") => {
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded shadow text-white ${
              toast.type === "error"
                ? "bg-red-500"
                : toast.type === "success"
                ? "bg-green-500"
                : "bg-gray-800"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside a ToastProvider");
  }
  return context;
}
