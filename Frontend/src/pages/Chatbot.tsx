import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bot, Send, ArrowLeft } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: `Hi there! I'm Chori, your caring menstrual wellness companion. I'm here to answer any questions you have about periods, symptoms, hygiene, or anything else you'd like to know. What would you like to chat about today? 🌸`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (!isTyping) return;
    const interval = setInterval(() => {
      setTypingDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, [isTyping]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = { sender: "user", text: input.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:5000/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: userMessage.text }),
        });

        const data = await response.json();
        setIsTyping(false);

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: data.answer || "Sorry, I couldn't understand that.",
          },
        ]);
      } catch (err) {
        console.error(err);
        setIsTyping(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: "Failed to fetch response from Chori backend.",
          },
        ]);
      }
    }, 400);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const quickPrompts = [
    "What helps with cramps?",
    "Is my cycle normal?",
    "How to track my period?",
    "Period hygiene tips",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-purple-50 to-teal-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="text-rose-600 font-medium hover:underline flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Ask Chori
            </h1>
          </div>
          <div className="w-20" />
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] px-4 py-3 rounded-lg shadow ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white ml-auto rounded-br-none"
                  : "bg-white text-gray-800 mr-auto rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="text-gray-500 italic bg-gray-100 rounded-lg px-4 py-2 w-fit shadow">
              Chori is typing{typingDots}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input & Quick Prompts */}
      <div className="bg-white/80 backdrop-blur-sm px-4 py-3 border-t">
        <div className="max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Ask me anything about periods, symptoms, or menstrual health..."
            className="w-full border border-rose-200 rounded-full px-4 py-2 text-sm focus:outline-none mb-3"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div className="flex flex-wrap gap-2 mb-3 text-sm text-gray-600">
            <span>Quick questions to get started:</span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setInput(prompt)}
                className="border border-rose-300 text-rose-600 px-3 py-1 rounded-full hover:bg-rose-50 text-xs"
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              className="p-2 rounded-full bg-gradient-to-r from-rose-500 to-purple-500 text-white hover:from-rose-600 hover:to-purple-600"
              onClick={handleSendMessage}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
