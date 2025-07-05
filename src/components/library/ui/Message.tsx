import { motion } from 'framer-motion';
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

export default Message;
