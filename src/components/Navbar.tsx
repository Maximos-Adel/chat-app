import logout from "../assets/logout.svg";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import spinner from "../assets/spinner.svg";
const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const handleSignOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between pb-2  border-b-[1px] border-gray-500">
      <div>
        <p className="font-semibold">Firbase Real Time Chat</p>
      </div>
      <div>
        {currentUser ? (
          <div className="flex items-center gap-2">
            <img
              src={currentUser.photoURL || "https://via.placeholder.com/40"} // Default placeholder image
              alt={currentUser.displayName || "user"}
              className="w-10 h-10 rounded-full"
            />
            <p>{currentUser.displayName}</p>
            <div
              className="hover:bg-gray-200 p-3  cursor-pointer rounded-full"
              onClick={handleSignOut}
            >
              <img src={logout} alt="logout" className="w-5 h-5" />
            </div>
          </div>
        ) : (
          <img src={spinner} alt="spinner" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
