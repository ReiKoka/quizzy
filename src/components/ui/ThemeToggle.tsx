import Icon from "supercons";
import useTheme from "../../hooks/useTheme";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  console.log(theme);

  const handleToggle = () => {
    setTheme(theme === "sunset" ? "caramellatte" : "sunset");
  };

  return (
    <button
      className="relative aspect-square w-8 cursor-pointer"
      onClick={handleToggle}
    >
      <Icon
        glyph="moon-star"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${theme === "caramellatte" ? "animate-jump-in animate-once animate-duration-500 animate-ease-out visible" : "invisible"} active:scale-50`}
      />
      <Icon
        glyph="sun"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${theme === "caramellatte" ? "invisible" : "animate-jump-in animate-once animate-duration-300 animate-ease-out visible"} active:scale-50`}
      />
    </button>
  );
}

export default ThemeToggle;
