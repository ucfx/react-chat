import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useConversationsStore from "stores/ConversationsStore";
import useSearchStore from "stores/SearchStore";
import useSocket from "hooks/useSocket";

const Conversation = ({ conversation }) => {
  const navigate = useNavigate();
  const { onlineUsers } = useSocket();
  const { username } = useParams();
  const setSearchMode = useSearchStore((state) => state.setSearchMode);

  const setSelectedConversation = useConversationsStore(
    (state) => state.setSelectedConversation
  );

  useEffect(() => {
    if (username === conversation.username) {
      setSelectedConversation(conversation);
      setSearchMode(false);
    }
  }, [username]);
  return (
    <div
      onClick={() => {
        navigate(`/${conversation.username}`);
      }}
      className={`p-4 hover:bg-base-100 rounded-xl border border-1 cursor-pointer transition duration-150 ${
        username === conversation.username
          ? "bg-base-200 border-slate-600"
          : "border-transparent"
      }`}
    >
      <div className="flex items-center">
        <div className="indicator">
          <span
            className={`inline-block indicator-item indicator-start ${
              onlineUsers[conversation._id] ? "badge badge-primary" : ""
            } h-3 w-3 p-0 z-0`}
          ></span>
          <div className="grid place-items-center">
            <img
              src={conversation?.profilePic}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
        <div className="indicator flex-1">
          <span
            className={`indicator-item indicator-end indicator-middle ${
              conversation.unreadMessagesCount > 0 ? "badge badge-primary" : ""
            } min-w-5 p-1 mr-2`}
          >
            {conversation.unreadMessagesCount > 0 &&
              conversation.unreadMessagesCount}
          </span>
          <div className="ml-2">
            <p className="font-semibold">{conversation?.fullName}</p>
            <p className="text-xs text-gray-500">
              {conversation?.lastMessage?.message ||
                `@${conversation.username}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
