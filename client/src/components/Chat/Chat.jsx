import { useEffect } from "react";
import useConversationsStore from "stores/ConversationsStore";
import Loader from "components/Loader";
import ChatHeader from "./ChatHeader";
import InputMessage from "./InputMessage";
import Messages from "./Messages";
const Chat = () => {
  const { getMessages, setMessages, loading, selectedConversation } =
    useConversationsStore();

  useEffect(() => {
    if (selectedConversation) {
      getMessages();
    }
    return () => {
      setMessages({});
    };
  }, [selectedConversation]);

  return (
    <div className="relative w-full flex flex-col">
      <Loader loading={loading} />
      <ChatHeader />

      <div className="relative h-full overflow-hidden">
        <div className="w-full h-full gutter custom-scroll">
          <div className="w-full mx-auto max-w-[680px] py-4 px-12">
            <Messages />
          </div>
        </div>
      </div>
      <InputMessage />
    </div>
  );
};

export default Chat;
