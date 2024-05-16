import { useEffect, useRef } from "react";
import useSocket from "hooks/useSocket";
import useAuthStore from "stores/AuthStore";
import useConversationsStore from "stores/ConversationsStore";

const useVisibility = (targetRef, messageId, readed, sender) => {
  const observer = useRef(null);

  const authUser = useAuthStore((_) => _.user);
  const selectedConversation = useConversationsStore(
    (_) => _.selectedConversation
  );
  const readMessage = useConversationsStore((state) => state.readMessage);

  const { socket } = useSocket();

  useEffect(() => {
    if (readed || sender === authUser._id.toString())
      return () => {
        if (observer.current && targetRef.current) {
          observer.current.unobserve(targetRef.current);
        }
      };
    let observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: [1.0],
    };
    observer.current = new IntersectionObserver(([entry]) => {
      console.log(entry.intersectionRatio);
      if (entry.isIntersecting) {
        socket.emit(
          "readMessage",
          messageId,
          authUser._id,
          selectedConversation._id
        );
        readMessage(messageId, selectedConversation._id);
      }
    }, observerOptions);

    if (targetRef.current) {
      observer.current.observe(targetRef.current);
    }

    return () => {
      if (observer.current && targetRef.current) {
        observer.current.unobserve(targetRef.current);
      }
    };
  }, [targetRef, messageId, readed]);

  return observer;
};

export default useVisibility;
