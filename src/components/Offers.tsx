"use client";

import React from 'react';
import { Tag, Clock, Zap } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Offers() {
  const addItem = useCartStore((state) => state.addItem);

  const handleClaimOffer = (id: string, name: string, price: number, image: string) => {
    addItem({ id, name, price, image });
  };

  return (
    <section id="offers" className="py-24 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-[#E1E0CC] mb-4 uppercase tracking-tighter">
            Special <span className="text-orange-500">Offers</span>
          </h2>
          <p className="text-primary/60 text-lg max-w-2xl mx-auto italic font-serif">
            Grab your favorite crunch at unbeatable prices. Limited time deals just for you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Offer Card 1 */}
          <div className="bg-[#101010] rounded-[2.5rem] p-10 border border-white/5 shadow-2xl flex flex-col md:flex-row gap-8 items-center group hover:-translate-y-2 transition-all duration-500">
            <div className="w-40 h-40 bg-orange-950/30 rounded-3xl flex items-center justify-center p-6 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" 
                alt="Burger Offer" 
                className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase">
                Hot
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-orange-500 font-bold text-xs mb-2 uppercase tracking-widest">
                <Tag size={16} />
                Lunch Deal
              </div>
              <h3 className="text-2xl font-black text-[#E1E0CC] mb-4 uppercase tracking-tight">Double Crunch BOGOF</h3>
              <p className="text-primary/40 text-sm mb-6">Buy one Double Decker Beast and get the second one absolutely free! Every Monday to Friday.</p>
              <button 
                onClick={() => handleClaimOffer('m2', 'Double Crunch BOGOF', 12.99, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80')}
                className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl shadow-lg shadow-orange-500/20 transition-all uppercase tracking-tighter text-sm"
              >
                Claim Now
              </button>
            </div>
          </div>

          {/* Offer Card 2 */}
          <div className="bg-[#101010] rounded-[2.5rem] p-10 border border-white/5 shadow-2xl flex flex-col md:flex-row gap-8 items-center group hover:-translate-y-2 transition-all duration-500">
            <div className="w-40 h-40 bg-blue-950/30 rounded-3xl flex items-center justify-center p-6 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80" 
                alt="Family Deal" 
                className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase">
                Save
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-blue-400 font-bold text-xs mb-2 uppercase tracking-widest">
                <Zap size={16} />
                Family Combo
              </div>
              <h3 className="text-2xl font-black text-[#E1E0CC] mb-4 uppercase tracking-tight">Family Feast XL</h3>
              <p className="text-primary/40 text-sm mb-6">2 Signature Burgers, 2 Spicy Chicken Sandwiches, 4 Fries, and 4 Drinks for only $49.99.</p>
              <button 
                onClick={() => handleClaimOffer('m4', 'Family Feast XL', 49.99, 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80')}
                className="px-8 py-3 bg-white text-black hover:bg-primary transition-all font-black rounded-2xl shadow-lg shadow-white/10 uppercase tracking-tighter text-sm"
              >
                Order Bundle
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
