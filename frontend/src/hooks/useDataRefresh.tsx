import { useEffect, useRef, createContext, useContext } from "react";
import EventBus from "../utils/EventBus";

export const DATA_REFRESH_INTERVAL= 1000 * 30 // 30 seconds
type Callback = () => void;

type DataRefreshContextType = {
  addDataRefreshListener: (callback: Callback) => { id: number };
  removeDataRefreshListener: (id: number) => void;
}

const DataRefreshContext = createContext<DataRefreshContextType>({
  addDataRefreshListener: () => ({ id: 0 }),
  removeDataRefreshListener: () => {}
});

export function DataRefreshProvider({ children }: { children: React.ReactNode }) {
    const dataRefresh = useRef(new EventBus()) 
    
    const addDataRefreshListener = (callback: Callback) => {
        return dataRefresh.current.addListener(callback); 
    };

    const removeDataRefreshListener = (id: number) => {
        dataRefresh.current.removeListener(id);
    };

    useEffect(() => {
        const fireEvents = () => {
            dataRefresh.current.emit(undefined);
        };
        const id = setInterval(fireEvents, DATA_REFRESH_INTERVAL);
        return () => clearInterval(id);
    }, []);

    return (<DataRefreshContext.Provider value={{addDataRefreshListener, removeDataRefreshListener}}>{children}</DataRefreshContext.Provider>);
}

export function useDataRefresh() {
    return useContext(DataRefreshContext);
}
