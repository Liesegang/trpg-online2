const ChatWindow: React.FC = () => {
  // Mock chat UI
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-gray-200 p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <img src="https://randomuser.me/api/portraits" alt="User" className="w-8 h-8 rounded-full" width="200" height="200" />
            <div className="flex-1 bg-white rounded-lg p-2">
              <p className="text-sm">Hello there!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <img src="https://randomuser.me/api/portraits" alt="User" className="w-8 h-8 rounded-full" width="200" height="200" />
            <div className="flex-1 bg-white rounded-lg p-2">
              <p className="text-sm">How are you?</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <img src="https://randomuser.me/api/portraits" alt="User" className="w-8 h-8 rounded-full" width="200" height="200" />
            <div className="flex-1 bg-white rounded-lg p-2">
              <p className="text-sm">I'm doing great!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 p-4">
        <input type="text" className="flex-1 bg-gray-200 p-2 rounded-lg" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
