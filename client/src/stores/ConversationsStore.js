import { create } from "zustand";
import useAuthStore from "./AuthStore";
const ConversationsStore = create((set) => ({
  conversations: [],
  selectedConversation: null,
  setSelectedConversation: (conversation) => {
    set({ selectedConversation: conversation });
  },
  messages: {},
  loading: false,
  setMessages: (messages) => {
    console.log("setMessges function in conversation store");
    set({ messages });
  },
  pushMessage: (message, senderId) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [senderId]: [...(state.messages[senderId] || []), message],
      },
    }));

    set((state) => {
      const conversationIndex = state.conversations.findIndex((c) => {
        return c._id === senderId;
      });

      console.log("conversationIndex", conversationIndex);
      if (conversationIndex !== -1) {
        const updatedConversations = [...state.conversations];
        updatedConversations[conversationIndex] = {
          ...updatedConversations[conversationIndex],
          lastMessage: message,
        };
        return { conversations: updatedConversations };
      } else {
        ConversationsStore.getState().getConversations();
        return state;
      }
    });
  },
  getMessages: async () => {
    try {
      const selectedConversationId =
        ConversationsStore.getState().selectedConversation._id;
      ConversationsStore.setState({ loading: true });
      const response = await fetch(`/api/messages/${selectedConversationId}`);
      const data = await response.json();
      if (data) {
        set((state) => {
          return {
            messages: {
              ...state.messages,
              [selectedConversationId]: data,
            },
          };
        });
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      ConversationsStore.setState({ loading: false });
      console.log("donee");
    }
  },
  getConversations: async () => {
    const user = useAuthStore.getState().user;
    if (!user) {
      console.error("No user found in authStore");
      return;
    }

    try {
      const response = await fetch(`/api/users`);
      const data = await response.json();
      console.log(data);
      if (data) {
        set({ conversations: data });
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  },
  resetConversations: () => set({ conversations: [] }),
}));

export default ConversationsStore;
