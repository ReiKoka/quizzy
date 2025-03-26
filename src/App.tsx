import { useState } from "react";
import Nav from "./components/Nav";
import { TABS } from "./utils/constants";

function App() {
  const [tab, setTab] = useState(TABS?.QUIZ);

  return (
    <div className="font-primary flex h-svh w-dvw flex-col gap-7 overflow-hidden">
      <Nav tab={tab} setTab={setTab} />
    </div>
  );
}

export default App;
