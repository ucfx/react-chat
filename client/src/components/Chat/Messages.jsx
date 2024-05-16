import { useEffect, useRef } from "react";
import useAuthStore from "stores/AuthStore";
import useConversationsStore from "stores/ConversationsStore";
import Message from "./Message";

const Messages = () => {
  const authUser = useAuthStore((state) => state.user);
  const { messages, selectedConversation } = useConversationsStore();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        block: "nearest",
      });
    }
  }, [messages[selectedConversation?._id]]);

  return (
    <>
      {messages[selectedConversation?._id]?.map((message, index) => {
        const isMe = message.sender === authUser._id;
        let ref = null;

        if (selectedConversation.unreadMessagesCount === 0) {
          if (index === messages[selectedConversation._id].length - 1) {
            ref = lastMessageRef;
          }
        } else if (
          index ===
          messages[selectedConversation._id].length -
            selectedConversation.unreadMessagesCount
        ) {
          ref = lastMessageRef;
        }

        return (
          <div ref={ref} key={message._id}>
            <Message message={message} isMe={isMe} />
          </div>
        );
      })}
    </>
  );
};

export default Messages;
