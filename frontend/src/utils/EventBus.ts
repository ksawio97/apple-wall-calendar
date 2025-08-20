type EventCallback<FT> = (payload: FT) => void;
// its not releated to Events in calendar
export default class EventBus<T> {
    private listeners: Map<number, EventCallback<T>> = new Map();
    private counter = 0;

    emit(payload: T) {
        this.listeners.forEach((cb) => cb(payload));
    }

    addListener(callback: EventCallback<T>) {
        const id = this.counter++;
        this.listeners.set(id, callback);
            
        return { id };
    }

    removeListener(id: number) {
        if (this.listeners.has(id)) {
            this.listeners.delete(id);
        }
    }
}
