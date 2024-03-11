import { Character } from "@/models/character";

export interface MapItem {
  id: string;
  name: string;
  type: MapItemType;
  position: { x: number; y: number };
  rotation: number;
  scale: { x: number; y: number };
  selectable: boolean;
}

export type MapItemType = "background" | "pin" | "text" | "character";

export interface BackgroundItem extends MapItem {
  type: 'background';
  src: string;
}

export interface PinItem extends MapItem {
  type: 'pin';
  src: string;
}

export interface TextItem extends MapItem {
  type: 'pin';
  text: string;
}

export interface CharacterItem extends MapItem {
  type: 'pin';
  character: Character;
}
