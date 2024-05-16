import { create } from "zustand";
import { persist } from "zustand/middleware";

const updateTheme = () => {
  document.documentElement.setAttribute(
    "data-theme",
    useThemeStore.getState().theme
  );
};

const useThemeStore = create(
  persist(
    (set) => ({
      theme: "dark",
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        }));
        updateTheme();
      },
    }),
    {
      name: "theme",
    }
  )
);
updateTheme();

export default useThemeStore;
