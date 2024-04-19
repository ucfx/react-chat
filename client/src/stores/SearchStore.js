import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchTerm: "",
  searchMode: false,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchMode: (mode) => set({ searchMode: mode, searchTerm: "" }),
}));

export default useSearchStore;
