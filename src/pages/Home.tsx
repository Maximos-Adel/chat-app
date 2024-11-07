import { auth, db, GoogleAuthProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Google from "../assets/google.svg";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user email in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
      });

      // Navigate to chat page
      navigate("/chat");
    } catch (error: any) {
      console.error("Error during login:", error.message);
    }
  };
  return (
    <div className="h-screen grid place-items-center">
      <button
        onClick={handleLogin}
        className="flex items-center justify-between gap-4 border-none outline-none rounded-sm shadow-md p-3"
      >
        <img src={Google} alt="google" />
        Sign in with Google
      </button>
    </div>
  );
};

export default Home;
