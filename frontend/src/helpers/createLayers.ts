import EventModel from "../models/EventModel";
import UID from "../types/UID";
import isOnTheSameDate from "../utils/isOnTheSameDate";

export default function createLayers(events: EventModel[]): UID[][] {
  const sorted = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
  const layers: EventModel[][] = [];

  for (const event of sorted) {
    let placed = false;

    for (const layer of layers) {
      const lastEventInLayer = layer[layer.length - 1];
      
      if (!(lastEventInLayer.end.getTime() > event.start.getTime() || isOnTheSameDate(lastEventInLayer.end, event.start))) {
        layer.push(event);
        placed = true;
        break;
      }
    }

    if (!placed) {
      layers.push([event]);
    }
  }
  
  return layers.map(l => l.map(e => e.uid));
}
