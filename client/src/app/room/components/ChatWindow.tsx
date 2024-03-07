import React from "react";
import { useState } from "react";

class ChatMessage {
  constructor(
    public message: string,
    public thumbnail: string
  ) {}
}

const ChatWindow: React.FC = () => {
  const [chats, setChats] = useState<ChatMessage[]>([
    new ChatMessage("Hello, there!", "https://randomuser.me/api/portraits/thumb/men/75.jpg"),
    new ChatMessage("Hi!", "https://randomuser.me/api/portraits/thumb/women/35.jpg"),
    new ChatMessage("How are you?", "https://randomuser.me/api/portraits/thumb/men/75.jpg"),
    new ChatMessage("I'm doing great!", "https://randomuser.me/api/portraits/thumb/women/35.jpg"),
  ]);
  const messageInputRef = React.createRef<HTMLInputElement>();

  const sendChat = () => {
    if (messageInputRef.current) {
      const message = new ChatMessage(
        messageInputRef.current.value,
        "https://randomuser.me/api/portraits/men/75.jpg"
      );
      setChats([...chats, message]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-gray-200 p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {chats.map((chat, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <img
                src={chat.thumbnail}
                alt="User"
                className="w-8 h-8 rounded-full"
                width="200"
                height="200"
              />
              <div className="flex-1 bg-white rounded-lg p-2">
                <p className="text-sm">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>
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
