import { Dispatch, SetStateAction, useState } from "react";
import { TABS } from "../../utils/constants";
import Icon from "supercons";

type MobileNavPropsType = {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
};

function MobileNav({ tab, setTab }: MobileNavPropsType) {
  const [isOpen, setIsOpen] = useState(false);
  const baseItemClasses =
    "font-primary flex cursor-pointer min-w-40 items-center gap-4 rounded-lg px-6 py-4 font-medium transition-all duration-300 ";

  const activeClasses = "bg-primary text-primary-content";
  const inactiveClasses = "hover:bg-primary/30 ";

  return (
    <>
      <button
        className="btn btn-circle dark:bg-neutral"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon glyph="align-right" />
      </button>

      <ul
        className={`animate-fade-left animate-ease-out fixed top-0 -right-full z-20 flex h-full w-screen flex-col items-center justify-center gap-4 opacity-0 ${isOpen && "-translate-x-full opacity-100"} bg-base-100 transition-all duration-700`}
      >
        <button
          className="btn btn-circle absolute top-5 right-5"
          onClick={() => setIsOpen(!open)}
        >
          <Icon glyph="view-close" />
        </button>
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
    </>
  );
}

export default MobileNav;
