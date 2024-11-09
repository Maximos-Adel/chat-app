import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import Sidebar from "../components/Sidebar";
import { DocumentData } from "firebase/firestore";
import { User } from "firebase/auth";
import spinner from "../assets/spinner.svg";

const Chat = () => {
  const currentUser: User | null = auth.currentUser;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageSearchQuery, setMessageSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (selectedUser && currentUser) {
      const conversationId =
        (currentUser?.uid ?? "") > selectedUser.uid
          ? `${currentUser?.uid}_${selectedUser.uid}`
          : `${selectedUser.uid}_${currentUser?.uid}`;

      const messagesRef = collection(db, "chats", conversationId, "messages");
      const q = query(messagesRef, orderBy("timestamp"));

      // Listen to real-time updates for the selected conversation
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map((doc) => doc.data());

        setMessages(msgs);
        setLoading(false);
      });

      return () => {
        // Cleanup subscription
        unsubscribe();
      };
    }
  }, [selectedUser, currentUser]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();

    if (!currentUser) {
      // Handle the case where currentUser is null (e.g., show an error or redirect)
      console.error("No user is logged in");
      return;
    }

    if (newMessage.trim() && selectedUser) {
      const conversationId =
        currentUser.uid > selectedUser.uid
          ? `${currentUser.uid}_${selectedUser.uid}`
          : `${selectedUser.uid}_${currentUser.uid}`;

      await addDoc(collection(db, "chats", conversationId, "messages"), {
        text: newMessage,
        sender: currentUser.uid,
        receiver: selectedUser.uid,
        timestamp: new Date(),
      });

      setNewMessage("");
    }
  };

  // Filter messages based on message search query
  const filteredMessages = messages.filter((msg: any) =>
    msg.text.toLowerCase().includes(messageSearchQuery.toLowerCase())
  );

  return (
    <>
      <Sidebar setSelectedUser={setSelectedUser} />
      <div className="flex-1 p-4 flex flex-col h-full">
        {selectedUser && (
          <>
            <div className="flex items-center justify-between">
              <h3>
                Chat with <strong>{selectedUser.email}</strong>
              </h3>
              <input
                type="text"
                value={messageSearchQuery}
                onChange={(e) => setMessageSearchQuery(e.target.value)}
                placeholder="Search messages"
                className="border p-2 rounded-md outline-none"
              />
            </div>

            <div className="h-full overflow-scroll my-2">
              {loading ? (
                <div className="flex items-center justify-center ">
                  <img src={spinner} alt="spinner" />
                </div>
              ) : (
                filteredMessages.map((msg, index) => (
                  <p
                    key={index}
                    className={`${
                      msg.sender === currentUser?.uid
                        ? "bg-green-600 text-white w-fit p-2 rounded-xl  mb-1 ml-auto rounded-br-none"
                        : "bg-blue-600 text-white w-fit p-2 rounded-xl  mb-1 mr-auto rounded-bl-none "
                    } mb-2`}
                  >
                    {msg.text}
                  </p>
                ))
              )}
            </div>
            <form
              className="flex items-center gap-3 mt-auto"
              onSubmit={handleSendMessage}
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className="w-full border p-2 rounded-md outline-none"
              />
              <button
                type="submit"
                className="bg-green-600 p-2 px-4 text-white rounded-lg hover:bg-green-700"
              >
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Chat;
