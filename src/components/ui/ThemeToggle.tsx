import Icon from "supercons";
import useTheme from "../../hooks/useTheme";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "sunset" ? "garden" : "sunset");
  };

  return (
    <button
      className="relative aspect-square w-8 cursor-pointer"
      onClick={handleToggle}
    >
      <Icon
        glyph="moon-star"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${theme === "garden" ? "animate-jump animate-once animate-duration-500 animate-ease-out visible" : "invisible"} active:scale-75`}
      />
      <Icon
        glyph="sun"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${theme === "garden" ? "invisible" : "animate-jump animate-once animate-duration-300 animate-ease-out visible"} active:scale-75`}
      />
    </button>
  );
}

export default ThemeToggle;
