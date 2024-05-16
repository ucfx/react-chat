import { useEffect } from "react";
import Conversation from "./Conversation";
import useConversationsStore from "stores/ConversationsStore";
import NoConversations from "./NoConversations";

const Conversations = () => {
  const conversations = useConversationsStore((state) => state.conversations);
  const conversationsLoading = useConversationsStore(
    (state) => state.conversationsLoading
  );
  const getConversations = useConversationsStore(
    (state) => state.getConversations
  );

  useEffect(() => {
    getConversations();
  }, []);

  const sortedConversations = conversations.sort(
    (a, b) =>
      new Date(b.lastMessage.updatedAt || b.updatedAt) -
      new Date(a.lastMessage.updatedAt || a.updatedAt)
  );

  return (
    <div className="py-2">
      {sortedConversations.map((conversation) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}
      {!conversationsLoading && conversations.length === 0 && (
        <NoConversations />
      )}
    </div>
  );
};

export default Conversations;
