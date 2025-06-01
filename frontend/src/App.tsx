import { useState } from "react";
import WeeksGrid from "./components/Calendar/WeeksGrid";
import useOnDayChange from "./hooks/useOnDayChange";

function App() {
  // we save today to update WeeksGrid everyday
  const [today, setToday] = useState(new Date());
  
  useOnDayChange((now) => {
    setToday(now);
  });

  return (
      <div className="flex gap-4 p-4">
        <WeeksGrid currDay={today} weeksBefore={1} weeksAfter={1}></WeeksGrid>
      </div>
  );
}

export default App;
