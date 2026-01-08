export default function Sidebar({ uploads, chats, onNewChat }) {
    return (
      <div className="w-72 h-screen bg-gray-900 text-white p-4 flex flex-col">
        <div className="font-bold text-xl mb-4">OpsMind AI</div>
  
        <button 
          className="bg-gray-700 px-3 py-2 rounded mb-4 w-full hover:bg-gray-600"
          onClick={onNewChat}
        >
          + New Chat
        </button>
  
        <div className="text-xs text-gray-400 mt-2">Uploaded PDFs</div>
        <div className="max-h-40 overflow-y-auto mt-1 mb-4">
          {uploads.map(u => (
            <div key={u._id} className="text-sm truncate text-gray-300 py-1">
              📄 {u.filename}
            </div>
          ))}
        </div>
  
        <div className="text-xs text-gray-400">Chats</div>
        <div className="flex-1 overflow-y-auto mt-1">
          {chats.map(c => (
            <div key={c._id} className="text-sm truncate text-gray-300 py-1">
              💬 {c.messages[0]?.content?.substring(0, 30) || "New Chat"}
            </div>
          ))}
        </div>
      </div>
    );
  }
  