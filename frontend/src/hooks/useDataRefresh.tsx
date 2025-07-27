import { useEffect, useRef, createContext, useContext } from "react";

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
  const dataRefresh = useRef<Map<number, DataRefresh>>(new Map<number, DataRefresh>());

  const addDataRefreshListener = (callback: () => void) => {
    const id = dataRefresh.current.size + 1;
    const newDataRefresh = { id, callback };
    dataRefresh.current = new Map(dataRefresh.current).set(id, newDataRefresh)

    return { id };
  }

  const removeDataRefreshListener = (id: number) => {

    const newDataRefresh = new Map(dataRefresh.current);
    newDataRefresh.delete(id);
    dataRefresh.current = newDataRefresh;
    
  }

  useEffect(() => {
    const fireEvents = () => {
      dataRefresh.current.forEach((data) => {
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