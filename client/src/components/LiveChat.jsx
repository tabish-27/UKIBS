import React, { useState } from "react";
import { FaComments, FaPaperPlane } from "react-icons/fa";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const phoneNumber = "918181819449"; // WhatsApp number
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { type: "user", text: input }]);
    setInput("");
    // Auto reply for demo
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Thanks for reaching out! Click here to chat on WhatsApp.",
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-0 ml-15 w-72 sm:w-96 h-96 bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden z-[10000] animate-fadeIn">
          {/* Header */}
          <div className="bg-[#F8069D] text-white p-3 font-bold flex justify-between items-center">
            <span>Chat With Us...</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white font-bold text-lg hover:text-black transition"
            >
              ✕
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.length === 0 && (
              <p className="text-black text-sm">
                Hi! How can we help you today?
              </p>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.type === "user" ? "justify-end" : "justify-start"
                } flex`}
              >
                {msg.type === "bot" ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-black p-2 rounded-xl text-sm max-w-[80%] hover:bg-black transition"
                  >
                    {msg.text}
                  </a>
                ) : (
                  <div className="bg-[#F8069D] text-white p-2 rounded-xl text-sm max-w-[80%]">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-2 border-t border-black flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#F8069D]"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-[#F8069D] text-white px-4 py-1 rounded-full hover:bg-pink-600 transition flex items-center justify-center"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div className="fixed bottom-0 left-2 flex flex-col items-center z-[10001]">
        {!isOpen && (
          <>
            {/* PC Text + Arrow */}
            <div className="hidden md:flex flex-col items-center mb-2">
              <span className="text-[#F8069D] font-bold text-sm animate-bounce select-none mb-1">
                Click to Live Chat
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#F8069D] animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14m0 0l-6-6m6 6l6-6"
                />
              </svg>
            </div>

            {/* Mobile Text (full black) */}
            <span className="md:hidden text-black font-bold text-sm mb-1 animate-bounce select-none text-center">
              Click to Live Chat
            </span>
          </>
        )}

        {/* Chat Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:bg-[#F8069D] mb-4 md:mb-18 md:text-white p-4 rounded-full shadow-xl 
               md:hover:bg-black md:hover:text-white transition 
               bg-white text-[#F8069D] hover:bg-white hover:text-[#F8069D] animate-none"
        >
          <FaComments className="text-xl" />
        </button>
      </div>
    </>
  );
};

export default LiveChat;
