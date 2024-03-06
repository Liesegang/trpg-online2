'use client';

import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';

import RoomCanvas from "./components/RoomCanvas";
import TransformableItem from "./components/TransformableItem";
import ChatWindow from "./components/ChatWindow";

const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
  a: <RoomCanvas>
    <TransformableItem itemId="1">
      <p>Item 1</p>
    </TransformableItem>
    <TransformableItem itemId="2">
      <p>Item 2</p>
    </TransformableItem>
  </RoomCanvas>,
  b: <ChatWindow />,
  c: <ChatWindow />,
};

const TITLE_MAP: { [viewId: string]: string } = {
  a: "Map",
  b: "Chat",
  c: "Character",
};

const Room = () => {
  return (
    <div className="h-screen">
      <Mosaic<string>
        renderTile={(id, path) => (
          <MosaicWindow path={path} createNode={() => "new"} title={TITLE_MAP[id]}>
            {ELEMENT_MAP[id]}
          </MosaicWindow>
        )}
        initialValue={{
          direction: 'row',
          first: 'a',
          second: {
            direction: 'column',
            first: 'b',
            second: 'c',
          },
          splitPercentage: 40,
        }}
      />
    </div>
  );
}

export default Room;
