import { ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
}

function MainContainer({ children }: MainContainerProps) {
  return <div className="h-full w-full max-w-7xl self-center grow px-6 pb-6">{children}</div>;
}

export default MainContainer;
