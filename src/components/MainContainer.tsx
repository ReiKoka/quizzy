import { ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
}

function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="h-full w-full max-w-7xl grow self-center overflow-hidden px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5">
      <div className="border-primary h-full w-full overflow-hidden rounded-2xl border p-4">
        {children}
      </div>
    </div>
  );
}

export default MainContainer;
