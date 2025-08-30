// toaster.jsx
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      duration={5000}
      toastOptions={{ style: { maxWidth: "400px" } }}
    />
  );
}

export default Toaster;
