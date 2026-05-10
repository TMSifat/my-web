'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Mail, Calendar, User, MessageSquare, Trash2, Loader2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactMessage {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  message: string;
}

export default function AdminMessages() {
  const supabase = createClient();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessages(messages.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 bg-[#0a0a0a] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#E1E0CC] uppercase tracking-tighter">Customer Messages</h1>
          <p className="text-primary/40 text-sm font-bold uppercase tracking-widest mt-2">Manage your inbox from CrunchBite Studio</p>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#101010] border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-[#E1E0CC] focus:outline-none focus:border-primary/50 transition-all w-full md:w-80"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="bg-[#101010] border border-white/5 rounded-[2rem] p-12 text-center">
          <MessageSquare className="mx-auto text-primary/10 mb-4" size={64} />
          <p className="text-primary/40 font-bold uppercase tracking-widest italic">No messages found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {filteredMessages.map((msg) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#101010] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative group"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-6 flex-1">
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Sender</p>
                          <p className="text-[#E1E0CC] font-bold">{msg.full_name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <Mail size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Email</p>
                          <p className="text-[#E1E0CC] font-bold">{msg.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Received</p>
                          <p className="text-[#E1E0CC] font-bold">
                            {new Date(msg.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-3">Message Content</p>
                      <p className="text-[#E1E0CC] leading-relaxed italic font-serif text-lg">
                        "{msg.message}"
                      </p>
                    </div>
                  </div>

                  <div className="flex md:flex-col justify-end gap-3">
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-red-500/5"
                      title="Delete message"
                    >
                      <Trash2 size={20} />
                    </button>
                    <a
                      href={`mailto:${msg.email}`}
                      className="p-4 bg-primary/10 text-primary rounded-2xl hover:bg-primary hover:text-black transition-all shadow-xl shadow-primary/5"
                      title="Reply by email"
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
