import { Dispatch, SetStateAction } from "react";
import Logo from "../assets/images/logo.svg?react";

import ThemeToggle from "./ui/ThemeToggle";
import { useMediaQuery } from "usehooks-ts";
import MobileNav from "./ui/MobileNav";
import WebNav from "./ui/WebNav";

type NavPropsType = {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
};

function Nav({ tab, setTab }: NavPropsType) {
  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <nav className="w-full max-w-7xl self-center p-3 sm:p-4 lg:p-5">
      <div className="border-primary flex items-center justify-between rounded-2xl border p-4">
        <div className="flex items-center gap-4">
          <Logo className="text-primary h-fit w-12 lg:w-16" />
          <p className="font-secondary text-primary hidden text-xl font-medium uppercase md:block lg:text-2xl">
            quizzthing
          </p>
        </div>

        {matches ? (
          <>
            <WebNav tab={tab} setTab={setTab} />
            <ThemeToggle />
          </>
        ) : (
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <MobileNav tab={tab} setTab={setTab} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
