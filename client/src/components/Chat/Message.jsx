import { useRef } from "react";
import { extractTime } from "utils/extractTime";
import useVisibility from "hooks/useVisibility";

const Message = ({ message, isMe }) => {
  const messageRef = useRef(null);

  useVisibility(messageRef, message._id, message.read, message.sender);

  return (
    <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-header">
        <time className="text-xs opacity-50">
          {extractTime(message.createdAt)}
        </time>
      </div>
      <div className={`chat-bubble ${isMe ? "chat-bubble-primary" : ""}`}>
        <p ref={messageRef}>{message.message}</p>
      </div>
      {isMe && (
        <div className="chat-footer opacity-50">
          {message.read && `Seen at ${extractTime(message.updatedAt)}`}
          {!message.read && "Sent"}
        </div>
      )}
      <div></div>
    </div>
  );
};

export default Message;
