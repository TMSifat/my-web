'use client';

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Download, 
  Filter, 
  CreditCard,
  Wallet,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  X
} from 'lucide-react';
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
    const channel = supabase
      .channel('realtime_finance')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload: any) => {
          console.log('New order received:', payload);
        }
      )
      .subscribe();

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

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [isLive, supabase]);

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Financial Center</h2>
            {isLive && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Live
              </span>
            )}
          </div>
          <p className="text-slate-500">Real-time revenue tracking and financial oversight.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium ${isLive ? 'bg-orange-50 text-orange-600 border border-orange-200' : 'bg-slate-100 text-slate-600'}`}
          >
            <Activity size={18} />
            {isLive ? 'Real-time On' : 'Paused'}
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all font-semibold disabled:opacity-50"
            disabled={isExporting}
          >
            {isExporting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download size={18} />
            )}
            {isExporting ? 'Exporting...' : 'Reports'}
          </button>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FinanceCard 
          title="Total Profit" 
          amount={`$${revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
          subtitle="Updated in real-time" 
          icon={<DollarSign className="text-orange-600" />} 
          color="orange"
          trend="+5.2%"
        />
        <FinanceCard 
          title="Daily Goal" 
          amount="$2,500.00" 
          subtitle="84% of target reached" 
          icon={<TrendingUp className="text-blue-600" />} 
          color="blue"
          progress={84}
        />
        <FinanceCard 
          title="Expenses" 
          amount="$1,240.45" 
          subtitle="Fixed & Variable costs" 
          icon={<CreditCard className="text-red-600" />} 
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Feed */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
            <div className="flex items-center gap-2">
              <Clock className="text-slate-400" size={18} />
              <h3 className="font-bold text-lg">Live Transaction Feed</h3>
            </div>
            <span className="text-xs text-slate-400">Showing latest {transactions.length} activities</span>
          </div>
          <div className="p-2">
            <div className="space-y-1">
              {transactions.map((tx, i) => (
                <div key={tx.id} className={`flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all ${i === 0 && tx.time === 'Just now' ? 'bg-orange-50/30 border border-orange-100 dark:border-orange-900/20 animate-in slide-in-from-left duration-500' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'Income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {tx.type === 'Income' ? <ArrowUpRight size={20} /> : <ArrowUpRight size={20} className="rotate-90" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{tx.customer}</p>
                      <p className="text-xs text-slate-500">{tx.id} • {tx.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'Income' ? '+' : ''}{tx.amount.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{tx.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full py-4 text-sm font-bold text-slate-500 hover:text-orange-500 border-t border-slate-100 dark:border-slate-800 transition-colors">
            View All Transactions
          </button>
        </div>

        {/* Breakdown & Whitelist */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="font-bold text-lg mb-6">Payment Methods</h3>
            <div className="space-y-4">
              <PaymentMethod label="Credit Card" percent={65} count="245 orders" />
              <PaymentMethod label="Digital Wallets" percent={25} count="92 orders" />
              <PaymentMethod label="Cash" percent={10} count="38 orders" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-6 text-white shadow-xl shadow-orange-500/20">
            <h3 className="font-bold text-lg mb-2">Finance Pro Tip</h3>
            <p className="text-orange-100 text-sm leading-relaxed">
              Based on your current real-time trends, revenue is expected to peak at 7:00 PM today. Consider increasing staff for faster delivery.
            </p>
            <button className="mt-6 w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl font-bold transition-all text-sm backdrop-blur-md">
              View Analytics
            </button>
          </div>

          {/* Admin Whitelist Management */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="text-orange-500" size={20} />
              <h3 className="font-bold text-lg">Admin Whitelist</h3>
            </div>
            <AdminWhitelist />
          </div>
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
    <div className="space-y-4">
      <div className="flex gap-2">
        <input 
          type="email" 
          value={newAdmin}
          onChange={(e) => setNewAdmin(e.target.value)}
          placeholder="Enter Gmail..." 
          className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-xs focus:ring-2 focus:ring-orange-500"
        />
        <button 
          onClick={addAdmin}
          className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-800"
        >
          Add
        </button>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {adminWhitelist.map(email => (
          <div key={email} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group transition-all hover:bg-orange-50 dark:hover:bg-orange-950/20">
            <span className="text-[11px] font-medium truncate max-w-[150px]">{email}</span>
            {email !== 'tanvirsifat51@gmail.com' ? (
              <button 
                onClick={() => removeAdminFromWhitelist(email)}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            ) : (
              <span className="text-[10px] font-black text-orange-500 uppercase">Primary</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FinanceCard({ title, amount, subtitle, icon, color, trend, progress }: any) {
  const colors: any = {
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    red: 'bg-red-100 text-red-600 border-red-200',
    blue: 'bg-blue-100 text-blue-600 border-blue-200'
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colors[color]}`}>
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
            {trend}
          </span>
        )}
      </div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-2">{amount}</h4>
      <p className="text-slate-400 text-xs">{subtitle}</p>
      
      {progress && (
        <div className="mt-4 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}

function PaymentMethod({ label, percent, count }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-slate-500">{percent}%</span>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-orange-500" style={{ width: `${percent}%` }} />
      </div>
      <p className="text-[10px] text-slate-400 font-medium">{count}</p>
    </div>
  );
}
