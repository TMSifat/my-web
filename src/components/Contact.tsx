'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Globe, Share2, Loader2, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function Contact() {
  const supabase = createClient();
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    full_name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;
      
      setSubmitted(true);
      setFormData({ full_name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-inset bg-black overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-orange-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.05 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none"
          >
            <h2 className="text-[15vw] font-black uppercase tracking-tighter leading-none text-[#E1E0CC]">
              Contact
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-4 block">Get in touch</span>
            <h3 className="text-4xl md:text-6xl font-medium text-[#E1E0CC] font-serif italic">
              We'd love to hear from you
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-[#101010] border border-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-primary/40 mb-2">Our Studio</h4>
                  <p className="text-[#E1E0CC] text-lg font-medium leading-relaxed">
                    Bashundhara R/A, <br />
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-[#101010] border border-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-primary/40 mb-2">Call Us</h4>
                  <p className="text-[#E1E0CC] text-lg font-medium">+880 1795108689</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-[#101010] border border-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-primary/40 mb-2">Email Us</h4>
                  <p className="text-[#E1E0CC] text-lg font-medium">hello@crunchbite.com</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-white/5">
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary/40 mb-6">Follow the crunch</h4>
              <div className="flex gap-4">
                {[MessageCircle, Globe, Share2].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="w-12 h-12 bg-[#101010] border border-white/5 rounded-full flex items-center justify-center text-primary hover:text-white transition-all"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#101010] border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 ml-4">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-[#E1E0CC] focus:outline-none focus:border-primary/50 transition-all placeholder:text-primary/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 ml-4">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-[#E1E0CC] focus:outline-none focus:border-primary/50 transition-all placeholder:text-primary/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 ml-4">Your Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-[#E1E0CC] focus:outline-none focus:border-primary/50 transition-all placeholder:text-primary/10 resize-none"
                />
              </div>

              <button
                disabled={loading || submitted}
                className={`w-full font-black py-5 rounded-2xl shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-sm ${
                  submitted ? 'bg-green-500 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20'
                } disabled:opacity-70`}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : submitted ? (
                  <>
                    Message Sent
                    <CheckCircle2 size={18} />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
