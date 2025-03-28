import { Dispatch, SetStateAction } from "react";
import Logo from "../assets/images/logo.svg?react";
import Icon from "supercons";
import { TABS } from "../utils/constants";
import ThemeToggle from "./ui/ThemeToggle";

type NavPropsType = {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
};

const baseItemClasses =
  "font-primary flex cursor-pointer  items-center gap-4 rounded-lg px-6 py-4 font-medium transition-all duration-300";

const activeClasses = "bg-primary text-primary-content";
const inactiveClasses = "hover:bg-primary/30 ";

function Nav({ tab, setTab }: NavPropsType) {
  return (
    <nav className="w-full max-w-7xl self-center p-6">
      <div className="border-primary flex items-center justify-between rounded-2xl border p-4">
        <div className="flex items-center gap-4">
          <Logo className="text-primary h-fit w-16" />
          <p className="font-secondary text-primary text-2xl font-medium uppercase">
            quizzy
          </p>
        </div>
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
