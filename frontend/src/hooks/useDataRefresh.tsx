import { useEffect, useState, createContext, useContext } from "react";

export const DATA_REFRESH_INTERVAL= 1000 * 30 // 30 seconds


type DataRefresh = {
  id: number;
  callback: () => void;
}

type DataRefreshContextType = {
  addDataRefreshListener: (callback: () => void) => { id: number };
  removeDataRefreshListener: (id: number) => void;
}

const DataRefreshContext = createContext<DataRefreshContextType>({
  addDataRefreshListener: () => ({ id: 0 }),
  removeDataRefreshListener: () => {}
});

export function DataRefreshProvider({ children }: { children: React.ReactNode }) {
  const [dataRefresh, setDataRefresh] = useState<Map<number, DataRefresh>>(new Map<number, DataRefresh>());

  const addDataRefreshListener = (callback: () => void) => {
    const id = dataRefresh.size + 1;
    const newDataRefresh = { id, callback };
    setDataRefresh((prev) => new Map(prev).set(id, newDataRefresh));

    return { id };
  }

  const removeDataRefreshListener = (id: number) => {
    setDataRefresh((prev) => {
      const newDataRefresh = new Map(prev);
      newDataRefresh.delete(id);
      return newDataRefresh;
    });
  }

  useEffect(() => {
    const fireEvents = () => {
      dataRefresh.forEach((data) => {
        data.callback();
      });
    };
    const id = setInterval(fireEvents, DATA_REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, [dataRefresh]);

  return (<DataRefreshContext.Provider value={{addDataRefreshListener, removeDataRefreshListener}}>{children}</DataRefreshContext.Provider>);
}

export function useDataRefresh() {
  return useContext(DataRefreshContext);
}