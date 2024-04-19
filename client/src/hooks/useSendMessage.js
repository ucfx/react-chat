import { useState } from "react";
import toast from "react-hot-toast";
import useConversationsStore from "stores/ConversationsStore";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, pushMessage, selectedConversation } =
    useConversationsStore();
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const newMessage = await res.json();
      pushMessage(newMessage, selectedConversation._id);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
