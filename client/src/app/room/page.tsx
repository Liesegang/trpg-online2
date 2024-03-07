"use client";

import DockLayout from "rc-dock";
import { DockMode } from "rc-dock";
import "rc-dock/dist/rc-dock.css";

import RoomCanvas from "./components/RoomCanvas";
import TransformableItem from "./components/TransformableItem";
import ChatWindow from "./components/ChatWindow";
import TerminalWindow from "./components/TerminalWindow";

const defaultLayout = {
  dockbox: {
    mode: "vertical" as DockMode,
    children: [
      {
        mode: "horizontal" as DockMode,
        children: [
          {
            tabs: [
              {
                id: "main",
                title: "main",
                content: (
                  <RoomCanvas>
                    <TransformableItem itemId="1">
                      <p>Item 1</p>
                    </TransformableItem>
                    <TransformableItem itemId="2">
                      <p>Item 2</p>
                    </TransformableItem>
                  </RoomCanvas>
                ),
              },
            ],
            size: 800,
          },
          {
            tabs: [
              { id: "chat1", title: "Chat1", content: <ChatWindow />, closable: true },
              { id: "chat2", title: "Chat2", content: <ChatWindow />, closable: true },
              { id: "chat3", title: "Chat3", content: <ChatWindow />, closable: true },
            ],
            size: 200,
          },
        ],
        size: 800,
      },
      {
        tabs: [{ id: "terminal", title: "Terminal", content: <TerminalWindow />, closable: true }],
        size: 200,
      },
    ],
  },
};

const Room = () => {
  return (
    <div className="h-screen">
      <DockLayout
        defaultLayout={defaultLayout}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </div>
  );
};

export default Room;
