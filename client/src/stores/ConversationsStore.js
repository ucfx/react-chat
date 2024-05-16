import { create } from "zustand";
import useAuthStore from "./AuthStore";
const ConversationsStore = create((set) => ({
  conversations: [],
  selectedConversation: null,
  messages: {},
  loading: true,
  conversationsLoading: true,
  setSelectedConversation: (conversation) => {
    set({ selectedConversation: conversation });
  },
  setMessages: (messages) => {
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

      if (conversationIndex !== -1) {
        const updatedConversations = [...state.conversations];
        updatedConversations[conversationIndex] = {
          ...updatedConversations[conversationIndex],
          lastMessage: message,
          unreadMessagesCount:
            state.selectedConversation?._id === senderId
              ? 0
              : updatedConversations[conversationIndex].unreadMessagesCount + 1,
        };
        return { conversations: updatedConversations };
      } else {
        ConversationsStore.getState().getConversations();
        return state;
      }
    });
  },
  readMessage: (messageId, conversationId, time) => {
    set((state) => {
      if (messageId === null) return state;

      const conversationMessages = state.messages[conversationId];
      let messageIndex = null;
      for (let i = conversationMessages.length - 1; i >= 0; i--) {
        if (conversationMessages[i]._id.toString() === messageId) {
          messageIndex = i;
          break;
        }
      }
      if (messageIndex !== null) {
        const updatedMessages = [...conversationMessages];
        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          read: true,
          updatedAt: time,
        };
        return {
          messages: {
            ...state.messages,
            [conversationId]: updatedMessages,
          },
        };
      } else {
        return state;
      }
    });
    set((state) => {
      const conversationIndex = state.conversations.findIndex((c) => {
        return c._id === conversationId;
      });
      if (conversationIndex !== -1) {
        const updatedConversations = [...state.conversations];
        updatedConversations[conversationIndex] = {
          ...updatedConversations[conversationIndex],
          unreadMessagesCount: updatedConversations[conversationIndex]
            .unreadMessagesCount
            ? updatedConversations[conversationIndex].unreadMessagesCount - 1
            : 0,
        };
        return {
          conversations: updatedConversations,
        };
      } else {
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
    }
  },
  getConversations: async () => {
    ConversationsStore.setState({ conversationsLoading: true });
    const user = useAuthStore.getState().user;
    if (!user) {
      console.error("No user found in authStore");
      return;
    }

    try {
      const response = await fetch(`/api/users`);
      const data = await response.json();
      if (data) {
        set({ conversations: data });
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    } finally {
      ConversationsStore.setState({ conversationsLoading: false });
    }
  },
  resetConversations: () => set({ conversations: [] }),
}));

export default ConversationsStore;
