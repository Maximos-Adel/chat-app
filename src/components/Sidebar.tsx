import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, query, getDocs } from "firebase/firestore";

const Sidebar = ({ setSelectedUser }: any) => {
  const [users, setUsers] = useState<any>([]);
  const currentUser = auth.currentUser;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch the users from Firestore when the component mounts
    const fetchUsers = async () => {
      if (currentUser) {
        const usersQuery = query(collection(db, "users"));
        const querySnapshot = await getDocs(usersQuery);
        const usersList = querySnapshot.docs.map((doc) => doc.data());

        // Filter out the logged-in user from the list
        const filteredUsers = usersList.filter(
          (user) => user.uid !== currentUser.uid
        );
        setUsers(filteredUsers);
      }
    };

    fetchUsers();
  }, [currentUser]);

  const filteredUsers = users.filter(
    (user: any) =>
      searchQuery === "" ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-1/4 border-r h-screen border-gray pr-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by email"
        className="w-full border p-2 rounded-md mb-2 outline-none"
      />
      <div>
        {filteredUsers.map((user: any) => (
          <div
            key={user.uid}
            onClick={() => setSelectedUser(user)}
            className="flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer rounded-lg"
          >
            <img
              src={user.photoURL || "https://via.placeholder.com/40"} // Default placeholder image
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
