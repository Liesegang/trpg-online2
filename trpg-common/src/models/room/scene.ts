import { MapItem } from "./map_item";

export interface Scene {
  id: string;
  name: string;
  mapItems: { [id: string]: MapItem };
}
