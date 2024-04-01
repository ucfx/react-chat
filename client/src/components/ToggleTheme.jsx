import useThemeStore from "stores/ThemeStore";
import { Sun, Moon } from "assets/svg";

const ToggleTheme = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);

  return (
    <label className="swap swap-rotate overflow-hidden">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <Sun />
      <Moon />
    </label>
  );
};

export default ToggleTheme;
