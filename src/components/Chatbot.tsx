'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! Welcome to CrunchBite Studio. I am Crunch Bot! How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Bot Response
    setTimeout(() => {
      let botResponse = '';
      const input = text.toLowerCase();

      if (input.includes('menu') || input.includes('food')) {
        botResponse = "You can explore our signature Double Decker Beast and Spicy Chicken Sandwiches in the Menu section below!";
      } else if (input.includes('offer') || input.includes('deal') || input.includes('bogof')) {
        botResponse = "We have an amazing BOGOF offer on Mondays and Fridays! Check out the Special Offers section for the Family Feast XL too.";
      } else if (input.includes('delivery') || input.includes('time')) {
        botResponse = "Our average delivery time is 25-35 minutes within the city circle.";
      } else if (input.includes('hi') || input.includes('hello')) {
        botResponse = "Hello! I am Crunch Bot. Ready to experience the ultimate crunch? What can I get for you?";
      } else {
        botResponse = "That sounds interesting! Let me get a human specialist to help you with that, or you can check our contact section.";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    "What's on the menu?",
    "Show me offers",
    "Delivery time?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-6 bg-[#101010] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Bot className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[#E1E0CC] font-bold text-sm uppercase tracking-widest">Crunch Bot</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary/40 hover:text-primary transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-noise opacity-90">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-primary/10' : 'bg-orange-500'}`}>
                      {msg.sender === 'user' ? <User size={14} className="text-primary" /> : <Bot size={14} className="text-white" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-primary text-black font-medium rounded-tr-none' : 'bg-[#151515] text-[#E1E0CC] border border-white/5 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 bg-[#151515] p-4 rounded-2xl rounded-tl-none border border-white/5">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#101010] border-t border-white/5 space-y-4">
              {/* Quick Actions */}
              {messages.length < 4 && (
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => handleSend(action)}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-primary/60 hover:bg-primary hover:text-black hover:border-primary transition-all uppercase font-bold tracking-widest"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                className="relative flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Crunch Bot..."
                  className="flex-1 bg-black border border-white/10 rounded-full px-5 py-3 text-sm text-[#E1E0CC] placeholder:text-primary/20 focus:outline-none focus:border-primary/50 transition-all"
                />
                <button
                  type="submit"
                  className="p-3 bg-primary text-black rounded-full hover:bg-white transition-all shadow-lg"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-orange-500/40 relative group"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <span className="absolute right-20 bg-black/80 backdrop-blur-md text-[#E1E0CC] text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with Crunch Bot
          </span>
        )}
      </motion.button>
    </div>
  );
}
