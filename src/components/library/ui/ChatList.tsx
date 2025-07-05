import { useState } from 'react';
import { FiMoreVertical, FiPlus, FiShare2, FiEdit2, FiArchive, FiTrash2 } from 'react-icons/fi';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  active?: boolean;
}

const mockChats: Chat[] = [
  { id: '1', name: 'Chat with AI', lastMessage: 'How can I help you?', active: true },
  { id: '2', name: 'Work Notes', lastMessage: 'Remember to send the report.' },
  { id: '3', name: 'Ideas', lastMessage: 'Brainstorming session at 5pm.' },
];

const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const handleMenuToggle = (id: string) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  const handleMenuAction = (action: string, chatId: string) => {
    // Implement actions: share, rename, archive, delete
    setMenuOpenId(null);
    if (action === 'delete') {
      setChats(chats.filter(chat => chat.id !== chatId));
    }
    // Add more actions as needed
  };

  const handleNewChat = () => {
    const newId = (chats.length + 1).toString();
    setChats([
      { id: newId, name: `New Chat ${newId}`, lastMessage: '', active: false },
      ...chats.map(chat => ({ ...chat, active: false })),
    ]);
  };

  const handleChatSelect = (id: string) => {
    setChats(chats => chats.map(chat => ({ ...chat, active: chat.id === id })));
  };

  return (
    <div className="w-72 bg-white rounded-xl shadow-lg p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 p-3">
        <h2 className="text-lg font-bold text-gray-800">Chats</h2>
        <button
          className="rounded-full bg-gray-100 hover:bg-gray-200 transition"
          onClick={handleNewChat}
          title="New Chat"
        >
          <FiPlus size={20} />
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto space-y-1">
        {chats.map(chat => (
          <li
            key={chat.id}
            className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition bg-white hover:bg-gray-100 ${chat.active ? 'border border-blue-400 bg-blue-50' : ''}`}
            onClick={() => handleChatSelect(chat.id)}
          >
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">{chat.name}</div>
              <div className="text-xs text-gray-500 truncate">{chat.lastMessage}</div>
            </div>
            <div className="relative ml-2">
              <button
                className="p-1 rounded-full hover:bg-gray-200 transition"
                onClick={e => { e.stopPropagation(); handleMenuToggle(chat.id); }}
                title="Chat settings"
              >
                <FiMoreVertical size={18} />
              </button>
              {menuOpenId === chat.id && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleMenuAction('share', chat.id)}
                  >
                    <FiShare2 className="mr-2" /> Share
                  </button>
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleMenuAction('rename', chat.id)}
                  >
                    <FiEdit2 className="mr-2" /> Rename
                  </button>
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleMenuAction('archive', chat.id)}
                  >
                    <FiArchive className="mr-2" /> Archive
                  </button>
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => handleMenuAction('delete', chat.id)}
                  >
                    <FiTrash2 className="mr-2" /> Delete
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
