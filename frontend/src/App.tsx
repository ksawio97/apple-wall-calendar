import { useEffect, useState } from "react";
import WeekBox from "./components/Days/WeekBox";
import DayModel from "./models/DayModel";
import getWeekDays from "./utils/getWeekDays";
import { fetchEvents } from "./services/calendarEventsService";
import assignEventsToDays from "./helpers/assignEventsToDays";

function App() {
  const [days, setDays] = useState<DayModel[]>([]);

  useEffect(() => { 
    fetchEvents()
      .then((events) => {
          const weekDays  = getWeekDays(new Date()).map((day) => new DayModel(day, []));
          assignEventsToDays(weekDays, events);
          return weekDays
      })
      .then((weekDays) => {
        setDays(weekDays);
      })
    // set week days
  }, []);
  
  return (
      <div className="flex gap-4 p-4">
        {/* <EventsGroup events={events}></EventsGroup> */}
        <WeekBox days={days}></WeekBox>
      </div>
  );
}

export default App;
