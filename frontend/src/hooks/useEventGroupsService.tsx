import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import eventsChanged from "../helpers/eventsChanged";
import { fetchEvents } from "../services/calendarEventsService";
import EventGroupsService from "../services/EventGroupsService";
import EventBus from "../utils/EventBus";
import toYMDISODateString from "../utils/toYMDISODateString";
import { useDataRefresh } from "./useDataRefresh";

type EventsChangeListener = (eventGroupsService: EventGroupsService) => void;

type EventGroupsServiceType = {
    setFromToTimeFrame: (from: Date, to: Date) => void,
    getEventGroupsService: () => EventGroupsService,
    addEventsChangedListener: (callback: EventsChangeListener) => { id: number },
    removeEventsChangedListener: (id: number) => void,
};

const EventGroupsServiceContext = createContext<EventGroupsServiceType>({
    setFromToTimeFrame: () => {},
    getEventGroupsService: () => new EventGroupsService([]),
    addEventsChangedListener: () => ({ id: 0 }),
    removeEventsChangedListener: () => {}
});

export function EventGroupsServiceProvider({ children }: { children: ReactNode }) {
    const eventChangeListeners = useRef(new EventBus<EventGroupsService>());
    const [eventGroupsService, setEventGroupsService] = useState<EventGroupsService>(new EventGroupsService([]));
    const [fromTo, setFromToData] = useState<[from: Date, to: Date]>([new Date(), new Date()]);

    const { addDataRefreshListener, removeDataRefreshListener } = useDataRefresh();

    const getData = (from: Date, to: Date) => { 
        if (toYMDISODateString(from) === toYMDISODateString(to))
            return;
        fetchEvents(from, to)
            .then(events => {
                const groupService = new EventGroupsService(events);
                setEventGroupsService(groupService);
            });
    }

    // on time frame change update Events
    useEffect(() => { getData(...fromTo) }, [fromTo]);
    
    const setFromToTimeFrame = (from: Date, to: Date) => { 
        setFromToData([from, to]);
    };

    const refreshEventsData = useCallback(async () => {
        const events = await fetchEvents(...fromTo);
        if (!eventsChanged(eventGroupsService.getEvents(), new Map(events.map(e => [e.uid, e]))))
            return;
       
        setEventGroupsService(new EventGroupsService(events));
    }, [fromTo, setEventGroupsService]);

    const addEventsChangedListener = (callback: EventsChangeListener) => {
        return eventChangeListeners.current.addListener(callback)
    };

    const removeEventsChangedListener = (id: number) => {
        eventChangeListeners.current.removeListener(id);
    }
    // keep data fresh every x seconds
    useEffect(() => {
        const { "id": dataRefreshId } = addDataRefreshListener(refreshEventsData);

        return () => {
            removeDataRefreshListener(dataRefreshId);
        }
    }, [addDataRefreshListener, removeDataRefreshListener, refreshEventsData]);
    
    useEffect(() => { eventChangeListeners.current.emit(eventGroupsService) }, [eventGroupsService, eventChangeListeners])

    const getEventGroupsService = useCallback(() => eventGroupsService, [eventGroupsService]);
    return (
        <EventGroupsServiceContext.Provider value={{ setFromToTimeFrame, addEventsChangedListener, removeEventsChangedListener, getEventGroupsService }}>{ children }</EventGroupsServiceContext.Provider>
    );  
}

export function useEventGroupsService() {
    return useContext(EventGroupsServiceContext);
}
