import { Dispatch, SetStateAction } from "react";
import Logo from "../assets/images/logo.png";
import Icon from "supercons";
import { TABS } from "../utils/constants";
import ThemeToggle from "./ui/ThemeToggle";

type NavPropsType = {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
};

const baseItemClasses =
  "font-primary flex cursor-pointer text-secondary items-center gap-4 rounded-lg px-6 py-4 font-medium transition-all duration-300";

const activeClasses = "bg-secondary text-secondary-content";
const inactiveClasses = "hover:bg-accent-content/20 hover:text-secondary";

function Nav({ tab, setTab }: NavPropsType) {
  return (
    <nav className="w-full max-w-7xl self-center p-6">
      <div className="flex items-center justify-between rounded-2xl border p-4">
        <img src={Logo} alt="logo" className="w-40" />
        <ul className="flex items-center gap-4">
          <li
            className={` ${baseItemClasses} ${tab === TABS.QUIZ ? activeClasses : inactiveClasses} `}
            onClick={() => setTab(TABS.QUIZ)}
            role="button"
            tabIndex={0}
            aria-current={tab === TABS.QUIZ ? "page" : undefined}
          >
            <Icon glyph="game-controller" size={18} />
            <span className="capitalize">{TABS.QUIZ}</span>
          </li>
          <li
            className={` ${baseItemClasses} ${tab === TABS.RESULTS ? activeClasses : inactiveClasses} `}
            onClick={() => setTab(TABS.RESULTS)}
            role="button"
            tabIndex={0}
            aria-current={tab === TABS.RESULTS ? "page" : undefined}
          >
            <Icon glyph="list-magic" size={18} />
            <span className="capitalize">{TABS.RESULTS}</span>
          </li>
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Nav;
