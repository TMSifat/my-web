'use client';

import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight,
  Zap,
  TrendingUp,
  BarChart3,
  Activity,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-4xl font-black text-[#E1E0CC] uppercase tracking-tighter">Analytics & Insights</h2>
        <p className="text-primary/40 text-sm font-bold uppercase tracking-widest mt-2">Deep dive into business performance and velocity.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnalyticsCard 
          title="Conversion Rate" 
          value="4.8%" 
          change="+0.6%" 
          trend="up"
          description="Traffic to Order ratio"
          icon={<Target size={18} />}
        />
        <AnalyticsCard 
          title="Avg. Order Value" 
          value="$28.50" 
          change="+2.1%" 
          trend="up"
          description="Per session revenue"
          icon={<Activity size={18} />}
        />
        <AnalyticsCard 
          title="Bounce Rate" 
          value="32%" 
          change="-1.2%" 
          trend="down"
          description="Session retention metric"
          icon={<Zap size={18} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#101010] rounded-[2.5rem] border border-white/5 p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
          
          <h3 className="font-black text-xl uppercase tracking-tighter text-[#E1E0CC] mb-12 flex items-center gap-3">
            <TrendingUp size={24} className="text-primary" />
            Growth Velocity
          </h3>
          
          <div className="h-72 flex items-end justify-between gap-5 relative z-10">
            {[30, 45, 25, 60, 40, 85, 55].map((h, i) => (
              <div key={i} className="flex-1 group relative">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-2xl relative shadow-lg shadow-primary/10 group-hover:to-white transition-all cursor-pointer"
                />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">
                  {h}%
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-8 text-[10px] font-black text-primary/20 uppercase tracking-[0.3em] relative z-10">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#101010] rounded-[2.5rem] border border-white/5 p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
          
          <div>
            <h3 className="font-black text-xl uppercase tracking-tighter text-[#E1E0CC] mb-3 flex items-center gap-3">
              <BarChart3 size={24} className="text-yellow-500" />
              Efficiency Index
            </h3>
            <p className="text-primary/40 text-[10px] font-bold uppercase tracking-widest mb-12">Performance vs Satisfaction metrics.</p>
          </div>
          
          <div className="space-y-10 relative z-10">
            <EfficiencyItem label="Order Fulfillment" score={92} />
            <EfficiencyItem label="Logistics Speed" score={85} />
            <EfficiencyItem label="Customer Loyalty" score={78} />
          </div>

          <div className="mt-12 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center gap-6 relative z-10 group hover:border-primary/20 transition-all">
            <div className="w-16 h-16 rounded-[1.25rem] bg-primary text-black flex items-center justify-center font-black text-2xl shadow-xl shadow-primary/20 group-hover:scale-110 transition-all">
              A+
            </div>
            <div>
              <p className="font-black text-[#E1E0CC] uppercase tracking-tighter text-lg italic font-serif">Peak Performance</p>
              <p className="text-primary/40 text-[10px] font-bold uppercase tracking-widest mt-1">Top 5% of regional competitors.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AnalyticsCard({ title, value, change, trend, description, icon }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[#101010] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-700" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10 text-primary/40">
        {icon}
        <p className="text-[10px] font-black uppercase tracking-[0.2em]">{title}</p>
      </div>

      <div className="flex items-end gap-4 mb-4 relative z-10">
        <h4 className="text-5xl font-black text-[#E1E0CC] tracking-tighter leading-none">{value}</h4>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black border ${trend === 'up' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
          {change}
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        </div>
      </div>
      
      <p className="text-primary/20 text-[10px] font-bold uppercase tracking-widest relative z-10">{description}</p>
    </motion.div>
  );
}

function EfficiencyItem({ label, score }: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span className="text-primary/40">{label}</span>
        <span className="text-primary">{score}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-primary shadow-lg shadow-primary/20" 
        />
      </div>
    </div>
  );
}
