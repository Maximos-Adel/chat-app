import Navbar from "../components/Navbar";

import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";

const MainLayout = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Correctly typed state

  const navigate = useNavigate();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setCurrentUser(user);
      } else {
        // User is not logged in, redirect to login page
        setCurrentUser(null);
        navigate("/"); // or any other logic to redirect to the login page
      }
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, [currentUser, navigate]);

  return (
    <div className="flex flex-col h-screen p-4">
      <Navbar />
      <div className="flex flex-1 mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
