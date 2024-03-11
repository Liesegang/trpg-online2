import { MapItem } from './map_item';
import { Player } from './player';
import { Scene } from './scene';

export interface Room
{
  id: string;
  name: string;
  players: Player[];
  scenes: Scene[];
  overlays: MapItem[];
}
