import { createContext, useState, useEffect } from "react";
import useAuthStore from "stores/AuthStore";
import io from "socket.io-client";
import useConversationsStore from "stores/ConversationsStore";
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});

  const pushMessage = useConversationsStore((state) => state.pushMessage);

  const authUser = useAuthStore((state) => state.user);
  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (onlineUsers) => {
        setOnlineUsers(onlineUsers);
      });

      socket.on("online", (userId) => {
        setOnlineUsers((prev) => ({
          ...prev,
          [userId]: true,
        }));
      });

      socket.on("disconnectUser", (userId) => {
        setOnlineUsers((prev) => {
          if (prev[userId]) {
            console.log("user disconnected", userId);
            const onlineUsers = { ...prev };
            delete onlineUsers[userId];
            return onlineUsers;
          }

          return prev;
        });
      });

      socket.on("newMessage", (newMessage, senderId) => {
        console.log("newmesssage: senderUsername", newMessage, senderId);
        pushMessage(newMessage, senderId);
        setOnlineUsers((prev) => ({
          ...prev,
          [senderId]: true,
        }));
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
