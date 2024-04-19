import { useEffect, useRef } from "react";
import useAuthStore from "stores/AuthStore";
import useConversationsStore from "stores/ConversationsStore";
import { extractTime } from "utils/extractTime";

const Messages = () => {
  const authUser = useAuthStore((state) => state.user);
  const { messages, selectedConversation } = useConversationsStore();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [messages[selectedConversation?._id]]);
  return (
    <>
      {messages[selectedConversation?._id]?.map((message, index) => {
        const isMe = message.sender === authUser._id;
        console.log(message);
        return (
          <div
            ref={
              index === messages[selectedConversation?._id].length - 1
                ? lastMessageRef
                : null
            }
            key={message._id}
            className={`chat ${isMe ? "chat-end" : "chat-start"}`}
          >
            <div className={`chat-bubble ${isMe ? "chat-bubble-primary" : ""}`}>
              <p>{message.message}</p>
            </div>
            <div className="chat-footer opacity-50">
              {extractTime(message.createdAt)}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Messages;
