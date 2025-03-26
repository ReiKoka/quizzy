import Icon from "supercons";
import useTheme from "../../hooks/useTheme";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  console.log(theme);

  const handleToggle = () => {
    setTheme(theme === "sunset" ? "caramellatte" : "sunset");
  };

  return (
    <button className="relative aspect-square w-8 cursor-pointer" onClick={handleToggle}>
      <Icon
        glyph="moon"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${theme === "caramellatte" ? "animate-jump-in animate-once animate-duration-500 animate-ease-out visible" : "animate-jump-out animate-once animate-duration-500 animate-ease-out invisible"}`}
      />
      <Icon
        glyph="sun"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${theme === "caramellatte" ? "animate-jump-out animate-once animate-duration-500 animate-ease-out invisible" : "animate-jump-in animate-once animate-duration-500 animate-ease-out visible"}`}
      />
    </button>
  );
}

export default ThemeToggle;
