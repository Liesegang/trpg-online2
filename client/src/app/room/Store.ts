import { atom } from 'jotai';

export const scaleAtom = atom(1);
export const selectionAtom = atom<string[]>([]);
