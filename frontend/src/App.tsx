import { useState } from "react";
import WeeksGrid from "./components/Calendar/WeeksGrid";
import useOnDayChange from "./hooks/useOnDayChange";
import Panel from "./components/Panel/Panel";
import { useEffect } from "react";

function App() {
  // we save today to update WeeksGrid everyday
  const [today, setToday] = useState(new Date());
  
  useOnDayChange((now) => {
    setToday(now);
  });

  return (
    <div className="bg-surface h-full">
        <Panel></Panel>
        <div className="flex gap-4 px-4 w-full h-full">
        <WeeksGrid currDay={today} weeksBefore={0} weeksAfter={1}></WeeksGrid>
      </div>
    </div>

  );
}

export default App;
