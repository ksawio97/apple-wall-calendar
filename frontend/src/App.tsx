import { useEffect, useState } from "react";
import EventModel from "./models/EventModel";
import WeekBox from "./components/Days/WeekBox";
import DayModel from "./models/DayModel";

function App() {
  const [days, setDays] = useState<DayModel[]>([]);

  useEffect(() => {
    // sample
    const event1 = new EventModel(
        "evt_001",
        "Team Meeting",
        new Date(2025, 0, 1, 9),
        new Date(2025, 0, 1, 10)
    );

    const event2 = new EventModel(
        "evt_002",
        "Lunch Break",
        new Date(2025, 0, 1, 12),
        new Date(2025, 0, 1, 13)
    );

    const day1 = new DayModel(
        new Date(2025, 0, 1),
        [event1, event2]
    );

    const event3 = new EventModel(
        "evt_003",
        "Project Review",
        new Date(2025, 0, 2, 14),
        new Date(2025, 0, 2, 16)
    );

    const day2 = new DayModel(
        new Date(2025, 0, 2),
        [event3]
    );

    setDays([day1, day2]);
  }, []);
  
  return (
      <div className="flex gap-4 p-4">
        {/* <EventsGroup events={events}></EventsGroup> */}
        <WeekBox days={days}></WeekBox>
      </div>
  );
}

export default App;
