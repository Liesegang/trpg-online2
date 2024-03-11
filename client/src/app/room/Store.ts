import { atom } from 'jotai';

import { syncedStore, getYjsDoc } from '@syncedstore/core';
import { WebsocketProvider } from 'y-websocket';

import { MapItem, Room } from 'trpg-common';

export const scaleAtom = atom(1);
export const selectionAtom = atom<string[]>([]);

export const store = syncedStore({
  mapItems: {} as {[id: string]: MapItem},
  fragment: 'xml',
});

const doc = getYjsDoc(store);
export const websocketProvider = new WebsocketProvider('ws://localhost/api/sync', 'room', doc);

export const disconnect = () => websocketProvider.disconnect();
export const connect = () => websocketProvider.connect();
