import React from "react";
import { useState } from "react";
import { io } from "socket.io-client";

class ChatMessage {
  constructor(
    public username: string,
    public message: string
  ) {}
}

const ChatWindow: React.FC = () => {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const messageInputRef = React.createRef<HTMLInputElement>();
  const usernameRef = React.createRef<HTMLInputElement>();
  const socket = io({ path: "/api/socket.io" });

  socket.on("onMessage", (message: ChatMessage) => {
    setChats([...chats, message]);
  });

  const sendChat = () => {
    if (messageInputRef.current && usernameRef.current) {
      const message = new ChatMessage(
        usernameRef.current.value,
        messageInputRef.current.value,
      );
      console.log(message);
      socket.emit("newMessage", message);
      messageInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-gray-200 p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {chats.map((chat, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <div className="font-bold">{chat.username}:</div>
              <div className="flex-1 bg-white rounded-lg p-2">
                <p className="text-sm">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2 p-4">
        <input
          ref={usernameRef}
          type="text"
          className="flex-1 bg-gray-200 p-2 rounded-lg"
          placeholder="Username"
        />
      </div>
      <div className="flex items-center space-x-2 p-4">
        <input
          ref={messageInputRef}
          type="text"
          className="flex-1 bg-gray-200 p-2 rounded-lg"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendChat();
            }
          }}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={sendChat}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
