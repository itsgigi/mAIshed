export const blinkinDotCode = `interface BlinkinDotProps {
  color?: string
}

const BlinkinDot = ({color = '#19c37d'}: BlinkinDotProps) => {
  return (
    <span style={{
      display: 'inline-block',
      width: 10,
      height: 10,
      borderRadius: '50%',
      backgroundColor: color, // ChatGPT green
      animation: 'blinkinDot 1s infinite',
      margin: 2,
      verticalAlign: 'middle',
    }} />
  )
}

export default BlinkinDot

// Add the animation to the global stylesheet (index.css):
// @keyframes blinkinDot {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0.2; }
// }
`;

export const messageCode = `import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaRegCopy } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";

interface MessageProps {
  message: string;
  showTime?: boolean;
  fontsize?: string | number;
  color?: string;
  copyToClipboard?: boolean;
}

const Message = ({ message, showTime = false, fontsize = "16px", color = "#333", copyToClipboard = true }: MessageProps) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Optionally handle error
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="px-5 py-3 rounded-lg bg-gray-100 inline-block shadow break-words min-h-18 relative"
      style={{ fontSize: fontsize, color: color }}
      onMouseEnter={() => copyToClipboard && setIsHovered(true)}
      onMouseLeave={() => copyToClipboard && setIsHovered(false)}
    >
      {isHovered && copyToClipboard && (
        <motion.button
          onClick={handleCopy}
          className="absolute bottom-2 left-2 bg-white border border-gray-300 rounded-full p-1 w-5 h-5 flex items-center justify-center shadow-sm hover:bg-gray-200 transition-colors"
          style={{ zIndex: 2 }}
          aria-label="Copy message"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {copied ? (
            <span role="img" aria-label="Copied" className="text-base"><FaRegCircleCheck fontSize={12}/></span>
          ) : (
            <span role="img" aria-label="Copy" className="text-base"><FaRegCopy fontSize={12}/></span>
          )}
        </motion.button>
      )}
      <div>{message}</div>
      { showTime && (
        <div className="text-xs text-gray-500 mt-2 text-right">{timeString}</div>
      )}
    </motion.div>
  );
};

export default Message;`;

export const inputMessageCode = `import { useState, useRef } from "react";

interface InputMessageProps {
  color?: string;
  encryptEffect?: boolean;
}

const InputMessage = ({color = "#007bff", encryptEffect = false}: InputMessageProps) => {
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Send");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const CHARS = "!@#$%^&*():{};|,.<>/?";
  const CYCLES_PER_LETTER = 2;
  const SHUFFLE_TIME = 70;
  const TARGET_TEXT = "Send";

  const scramble = () => {
    if (!encryptEffect) return;
    
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setButtonText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    if (!encryptEffect) return;
    
    clearInterval(intervalRef.current || undefined);
    setButtonText(TARGET_TEXT);
  };

  const handleSend = () => {
    if (message.trim()) {
      // Here you would handle sending the message
      setMessage("");
    }
  };

  const handleMouseEnter = () => {
    scramble();
  };

  const handleMouseLeave = () => {
    stopScramble();
  };

  return (
    <div style={{ display: "flex", alignItems: "center", padding: "8px", border: "1px solid #ccc", borderRadius: "24px", background: "#fff" }}>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ flex: 1, border: "none", outline: "none", fontSize: "16px", padding: "8px", borderRadius: "24px" }}
        onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
      />
      <button
        onClick={handleSend}
        onMouseEnter={encryptEffect ? handleMouseEnter : undefined}
        onMouseLeave={encryptEffect ? handleMouseLeave : undefined}
        style={{ marginLeft: "8px", padding: "8px 16px", border: "none", borderRadius: "24px", background: color, color: "#fff", fontWeight: "bold", cursor: "pointer" }}
        disabled={!message.trim()}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default InputMessage;`;

export const chatListCode = `import { useState } from 'react';
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
      { id: newId, name: \`New Chat \${newId}\`, lastMessage: '', active: false },
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
            className={\`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition bg-white hover:bg-gray-100 \${chat.active ? 'border border-blue-400 bg-blue-50' : ''}\`}
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

export default ChatList;`;

export const speedDialCode = `import { useState } from 'react'
import { FiPlus, FiEdit2, FiShare2, FiTrash2 } from 'react-icons/fi'

const actions = [
  { icon: <FiEdit2 />, name: 'Edit' },
  { icon: <FiShare2 />, name: 'Share' },
  { icon: <FiTrash2 />, name: 'Delete' },
]

const SpeedDial = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Actions */}
      <div className="flex flex-col items-end mb-2 space-y-3">
        {actions.map((action, idx) => (
          <button
            key={action.name}
            className={\`flex items-center px-3 py-2 rounded-lg shadow-lg bg-white text-gray-700 hover:bg-gray-100 transition-opacity duration-300
              \${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
            \`}
            style={{
              transitionDelay: open ? \`\${idx * 60}ms\` : \`\${(actions.length - idx) * 40}ms\`,
            }}
            tabIndex={open ? 0 : -1}
            aria-label={action.name}
          >
            <span className="mr-2 text-lg">{action.icon}</span>
            <span className="text-sm font-medium whitespace-nowrap bg-gray-800 text-white rounded px-2 py-1 ml-2 opacity-80">
              {action.name}
            </span>
          </button>
        ))}
      </div>
      {/* FAB */}
      <button
        className={\`w-16 h-16 rounded-full flex items-center justify-center bg-blue-600 text-white shadow-2xl hover:bg-blue-700 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400
          \${open ? 'rotate-45' : ''}
        \`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Speed Dial"
      >
        <FiPlus size={32} />
      </button>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40  bg-opacity-0 cursor-default"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default SpeedDial`; 