import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useEffect } from "react";
import { setupFirebaseAuthPersistence } from "../firebase";

function App() {
  useEffect(() => {
    setupFirebaseAuthPersistence();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
