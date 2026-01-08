export default function ChatWindow({ messages, onSend }) {
    return (
      <div className="flex flex-col h-full w-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={`p-3 rounded max-w-xl ${
                m.role === "user" ? "bg-blue-200 self-end" : "bg-gray-200 self-start"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>
  
        <div className="p-3 border-t flex gap-2">
          <textarea 
            className="flex-1 border p-2 rounded"
            placeholder="Ask something..."
          />
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={onSend}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
  