import Navbar from "../components/Navbar";

import { auth, setupFirebaseAuthPersistence } from "../../firebase";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { User } from "firebase/auth";

const MainLayout = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure Firebase Authentication session persists
    setupFirebaseAuthPersistence();

    // Listen for changes in the auth state (e.g., after page refresh)
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setCurrentUser(user); // Set the current user on login
      } else {
        setCurrentUser(null); // Set null when logged out
      }
    });

    return () => unsubscribe(); // Clean up the subscription on component unmount
  }, [currentUser]);

  useEffect(() => {
    const currentUser: User | null = auth.currentUser;
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="p-4">
      <Navbar />
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
