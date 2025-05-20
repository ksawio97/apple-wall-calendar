import { useEffect, useState } from "react";
import EventModel from "./models/EventModel";
import EventsGroup from "./components/Events/EventsGroup";

function App() {
  const [events, setEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    setEvents([new EventModel('sdasdas', 'test', '', ''), new EventModel('likjhegeuil', 'test1', '', '')])
  }, []);
  
  return (
    <h1 className='underline'>
      <div className="flex gap-4 p-4">
        <EventsGroup events={events}></EventsGroup>
      </div>
    </h1>
  );
}

export default App;
