import { useMemo, useState } from "react";
import useOnDayChange from "./hooks/useOnDayChange";
import Panel from "./components/Panel/Panel";
import WeeksGridContainer from "./components/Calendar/WeeksGridContainer";

function App() {
  // we save today to update WeeksGrid everyday
  const [today, setToday] = useState(new Date());
  
  useOnDayChange((now) => {
    setToday(now);
  });

  const gridInfo = useMemo(() => ({
    currDay: today,
    weeksBefore: 0,
    weeksAfter: 1,
  }), [today]);
  
  return (
    <div className="bg-surface h-full">
        <Panel></Panel>
        <div className="flex gap-4 px-4 w-full h-full">
        <WeeksGridContainer gridInfo={gridInfo}></WeeksGridContainer>
      </div>
    </div>

  );
}

export default App;
