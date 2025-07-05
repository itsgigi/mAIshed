import { useState, useRef } from "react";

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

export default InputMessage;