import { ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
}

function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="h-full w-full max-w-7xl grow self-center px-6 pb-6">
      <div className="border-primary dark:border-secondary h-full w-full overflow-hidden rounded-2xl border p-4">
        {children}
      </div>
    </div>
  );
}

export default MainContainer;
