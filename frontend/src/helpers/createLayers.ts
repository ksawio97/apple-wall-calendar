import EventModel from "../models/EventModel";

export default function createLayers(events: EventModel[]): EventModel[][] {
  const sorted = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
  const layers: EventModel[][] = [];

  for (const event of sorted) {
    let placed = false;

    for (const layer of layers) {
      const lastEventInLayer = layer[layer.length - 1];
      if (lastEventInLayer.end.getTime() <= event.start.getTime()) {
        layer.push(event);
        placed = true;
        break;
      }
    }

    if (!placed) {
      layers.push([event]);
    }
  }
  
  return layers;
}