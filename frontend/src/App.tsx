import WeeksGrid from "./components/Calendar/WeeksGrid";

function App() {
  
  return (
      <div className="flex gap-4 p-4">
        <WeeksGrid currDay={new Date()} weeksBefore={1} weeksAfter={1}></WeeksGrid>
      </div>
  );
}

export default App;
