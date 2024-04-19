import useAuthStore from "stores/AuthStore";
import useConversationsStore from "stores/ConversationsStore";
import toast from "react-hot-toast";

const useLogout = () => {
  const logoutUser = useAuthStore((state) => state.logout);
  const resetConversations = useConversationsStore(
    (state) => state.resetConversations
  );
  const logout = async () => {
    const tlId = toast.loading("Logging out...");
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      toast.dismiss(tlId);

      if (res.ok) {
        logoutUser();
        resetConversations();
        toast.success("See you soon!");
      } else {
        console.error("Logout failed");
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error", error);
      toast.error("Logout error");
    }
  };

  return logout;
};

export default useLogout;
