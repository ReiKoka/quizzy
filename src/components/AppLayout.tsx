import { useState } from "react";
import Nav from "./Nav";
import { TABS } from "../utils/constants";

import MainContainer from "./MainContainer";
import Quiz from "./Quiz";
import Results from "./Results";

function AppLayout() {
  const [tab, setTab] = useState(TABS?.QUIZ);
  return (
    <div className="font-primary flex h-svh w-dvw flex-col overflow-hidden">
      <Nav tab={tab} setTab={setTab} />
      <MainContainer>{tab === "quiz" ? <Quiz /> : <Results />}</MainContainer>
    </div>
  );
}

export default AppLayout;
