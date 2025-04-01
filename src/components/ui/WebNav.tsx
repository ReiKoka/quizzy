import { Dispatch, SetStateAction } from "react";
import { TABS } from "../../utils/constants";
import Icon from "supercons";

type WebNavPropsType = {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
};

function WebNav({ tab, setTab }: WebNavPropsType) {
  const baseItemClasses =
    "font-primary flex cursor-pointer  items-center gap-4 rounded-lg px-6 py-4 font-medium transition-all duration-300";

  const activeClasses = "bg-primary text-primary-content";
  const inactiveClasses = "hover:bg-primary/30 ";
  return (
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
  );
}

export default WebNav;
