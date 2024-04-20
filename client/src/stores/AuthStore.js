import { create } from "zustand";
export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  auth: async () => {
    try {
      const res = await fetch("/api/auth");
      if (res.ok) {
        const { user } = await res.json();
        useAuthStore.setState({ user });
      } else {
        const data = await res.json();
        console.log(data);
        useAuthStore.setState({ user: null });
      }
      console.log(useAuthStore.getState());
    } catch (error) {
      console.log("Auth Error :", error.message || error);
    } finally {
      useAuthStore.setState({ loading: false });
    }
  },
}));

useAuthStore.getState().auth();

export default useAuthStore;
