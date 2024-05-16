import React from "react";
import useConversationsStore from "stores/ConversationsStore";
const ChatHeader = () => {
  const conversation = useConversationsStore(
    (state) => state.selectedConversation
  );

  return (
    <>
      {conversation && (
        <div className="chat-header flex items-center p-4 bg-base-300 shadow-xl">
          <img
            src={conversation?.profilePic}
            alt="User profile"
            className="profile-picture rounded-full h-10 w-10 object-cover mr-4"
          />

          <h2 className="user-full-name text-white">
            {conversation?.fullName}
          </h2>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
