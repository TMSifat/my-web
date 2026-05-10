'use client';

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Download, 
  Activity, 
  CreditCard,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  X,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';
import { useAdminStore } from '@/store/useAdminStore';

export default function FinancePage() {
  const [isLive, setIsLive] = useState(true);
  const [revenue, setRevenue] = useState(45280);
  const [transactions, setTransactions] = useState([
    { id: 'TX-9012', customer: 'Alice Smith', amount: 24.50, time: 'Just now', type: 'Income' },
    { id: 'TX-9011', customer: 'Bob Johnson', amount: 12.99, time: '2 mins ago', type: 'Income' },
    { id: 'TX-9010', customer: 'Fresh Veggies Co.', amount: -150.00, time: '15 mins ago', type: 'Expense' },
  ]);

  const supabase = createClient();

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive && Math.random() > 0.7) {
        const newAmount = (Math.random() * 50 + 10);
        setRevenue(prev => prev + newAmount);
        setTransactions(prev => [
          { 
            id: `TX-${Math.floor(Math.random() * 10000)}`, 
            customer: ['John D.', 'Sarah K.', 'Mike R.', 'Emma W.'][Math.floor(Math.random() * 4)], 
            amount: parseFloat(newAmount.toFixed(2)), 
            time: 'Just now', 
            type: 'Income' 
          },
          ...prev.slice(0, 4)
        ]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-black text-[#E1E0CC] uppercase tracking-tighter">Finance Center</h2>
            {isLive && (
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse border border-green-500/20">
                Live
              </span>
            )}
          </div>
          <p className="text-primary/40 text-sm font-bold uppercase tracking-widest">Real-time revenue tracking and fiscal oversight.</p>
        </motion.div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border ${isLive ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white/5 text-primary/40 border-white/5'}`}
          >
            <Activity size={16} />
            {isLive ? 'Streaming On' : 'Paused'}
          </button>
          <button 
            className="flex items-center gap-3 px-6 py-4 bg-primary text-black rounded-2xl hover:scale-105 shadow-xl shadow-primary/20 transition-all font-black text-[10px] uppercase tracking-widest active:scale-95"
          >
            <Download size={16} />
            Reports
          </button>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FinanceCard 
          title="Total Profit" 
          amount={`$${revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
          subtitle="Real-time aggregation" 
          icon={<DollarSign size={20} />} 
          trend="+5.2%"
        />
        <FinanceCard 
          title="Daily Goal" 
          amount="$2,500.00" 
          subtitle="84% of target reached" 
          icon={<TrendingUp size={20} />} 
          progress={84}
        />
        <FinanceCard 
          title="Expenses" 
          amount="$1,240.45" 
          subtitle="Fixed & Variable costs" 
          icon={<CreditCard size={20} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Live Feed */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-[#101010] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden"
        >
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <Clock className="text-primary/40" size={18} />
              <h3 className="font-black uppercase tracking-widest text-sm text-[#E1E0CC]">Transaction Stream</h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/20">Active Session</span>
          </div>
          
          <div className="p-4">
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {transactions.map((tx) => (
                  <motion.div 
                    key={tx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-6 rounded-2xl hover:bg-white/[0.03] transition-all group border border-transparent hover:border-white/5"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${tx.type === 'Income' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                        {tx.type === 'Income' ? <ArrowUpRight size={20} /> : <ArrowUpRight size={20} className="rotate-90" />}
                      </div>
                      <div>
                        <p className="font-black text-[#E1E0CC] tracking-tight">{tx.customer}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mt-1">{tx.id} • {tx.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-black tracking-tighter ${tx.type === 'Income' ? 'text-green-500' : 'text-red-500'}`}>
                        {tx.type === 'Income' ? '+' : ''}{tx.amount.toFixed(2)}
                      </p>
                      <p className="text-[10px] text-primary/20 uppercase font-black tracking-[0.2em] mt-1">{tx.type}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <button className="w-full py-6 text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 hover:text-primary border-t border-white/5 transition-all bg-white/[0.01]">
            Analyze History
          </button>
        </motion.div>

        {/* Sidebar Controls */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#101010] rounded-[2.5rem] border border-white/5 shadow-2xl p-8"
          >
            <h3 className="font-black uppercase tracking-widest text-sm text-[#E1E0CC] mb-8">Revenue Breakdown</h3>
            <div className="space-y-6">
              <PaymentMethod label="Digital Payments" percent={65} />
              <PaymentMethod label="Card Processing" percent={25} />
              <PaymentMethod label="Manual/Cash" percent={10} />
            </div>
          </motion.div>
          
          <div className="bg-primary rounded-[2.5rem] p-8 text-black shadow-2xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-700" />
            <h3 className="font-black uppercase tracking-tighter text-xl mb-3">Finance Insight</h3>
            <p className="text-black/60 text-[11px] font-bold leading-relaxed uppercase tracking-wide">
              Peak traffic detected at 7:00 PM. Automated staffing adjustments recommended for maximum ROI.
            </p>
            <button className="mt-8 w-full py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl">
              Optimize Now
            </button>
          </div>

          {/* Admin Whitelist */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#101010] rounded-[2.5rem] border border-white/5 shadow-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck className="text-primary" size={20} />
              <h3 className="font-black uppercase tracking-widest text-sm text-[#E1E0CC]">Security Whitelist</h3>
            </div>
            <AdminWhitelist />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AdminWhitelist() {
  const { adminWhitelist, addAdminToWhitelist, removeAdminFromWhitelist } = useAdminStore();
  const [newAdmin, setNewAdmin] = useState('');

  const addAdmin = () => {
    if (newAdmin && !adminWhitelist.includes(newAdmin)) {
      addAdminToWhitelist(newAdmin);
      setNewAdmin('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1.5 bg-black rounded-2xl border border-white/5 focus-within:border-primary/30 transition-all">
        <input 
          type="email" 
          value={newAdmin}
          onChange={(e) => setNewAdmin(e.target.value)}
          placeholder="Invite Admin..." 
          className="flex-1 px-4 py-2 bg-transparent border-none rounded-xl text-xs focus:outline-none text-[#E1E0CC] placeholder:text-primary/10"
        />
        <button 
          onClick={addAdmin}
          className="p-3 bg-primary text-black rounded-xl hover:scale-105 transition-all"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {adminWhitelist.map(email => (
          <div key={email} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group transition-all hover:border-primary/20">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 truncate max-w-[120px]">{email}</span>
            {email !== 'tanvirsifat51@gmail.com' ? (
              <button 
                onClick={() => removeAdminFromWhitelist(email)}
                className="text-primary/20 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            ) : (
              <span className="text-[8px] font-black text-primary uppercase tracking-widest border border-primary/20 px-2 py-1 rounded-md">Root</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FinanceCard({ title, amount, subtitle, icon, progress, trend }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[#101010] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -mr-8 -mt-8 group-hover:bg-primary/10 transition-all duration-700" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="w-14 h-14 bg-primary/10 rounded-[1.25rem] flex items-center justify-center text-primary shadow-inner border border-primary/10">
          {icon}
        </div>
        {trend && (
          <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 tracking-widest">
            {trend}
          </span>
        )}
      </div>
      
      <div className="relative z-10">
        <p className="text-primary/40 text-[10px] font-black uppercase tracking-[0.2em]">{title}</p>
        <h4 className="text-3xl font-black text-[#E1E0CC] mt-2 tracking-tighter">{amount}</h4>
        <p className="text-primary/20 text-[10px] font-bold uppercase tracking-widest mt-2">{subtitle}</p>
        
        {progress && (
          <div className="mt-6 h-1 bg-white/5 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-primary shadow-lg shadow-primary/20" 
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function PaymentMethod({ label, percent }: any) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-black text-[10px] text-[#E1E0CC] uppercase tracking-widest">{label}</span>
        <span className="text-primary/40 text-[10px] font-black tracking-widest">{percent}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-primary" 
        />
      </div>
    </div>
  );
}
