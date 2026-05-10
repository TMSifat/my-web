'use client';

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl font-black text-[#E1E0CC] uppercase tracking-tighter">Overview</h2>
        <p className="text-primary/40 text-sm font-bold uppercase tracking-widest mt-2">Here's what's happening at CrunchBite today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$12,845.50" 
          change="+12.5%" 
          trend="up" 
          icon={<DollarSign size={20} />}
        />
        <StatCard 
          title="Total Orders" 
          value="456" 
          change="+8.2%" 
          trend="up" 
          icon={<ShoppingBag size={20} />}
        />
        <StatCard 
          title="New Customers" 
          value="89" 
          change="-3.1%" 
          trend="down" 
          icon={<Users size={20} />}
        />
        <StatCard 
          title="Avg. Preparation" 
          value="14.2 min" 
          change="+2.4%" 
          trend="up" 
          icon={<Clock size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-[#101010] rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden"
        >
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-black uppercase tracking-widest text-sm text-[#E1E0CC]">Recent Orders</h3>
            <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-primary/40 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-8 py-5">Order ID</th>
                  <th className="px-8 py-5">Customer</th>
                  <th className="px-8 py-5">Items</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <OrderRow id="#CB-1092" name="Alice Smith" items="2 Burgers, 1 Fries" status="Delivered" amount="$24.50" />
                <OrderRow id="#CB-1093" name="Bob Johnson" items="1 Chicken Sandwich" status="Preparing" amount="$12.99" />
                <OrderRow id="#CB-1094" name="Charlie Brown" items="3 Shakes, 2 Burgers" status="Pending" amount="$45.20" />
                <OrderRow id="#CB-1095" name="David Wilson" items="1 Salad, 1 Soda" status="Delivered" amount="$15.75" />
                <OrderRow id="#CB-1096" name="Eve Davis" items="2 Pizza Slices" status="Delivered" amount="$18.00" />
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#101010] rounded-[2rem] border border-white/5 shadow-2xl p-8"
        >
          <h3 className="font-black uppercase tracking-widest text-sm text-[#E1E0CC] mb-8">Top Selling Items</h3>
          <div className="space-y-8">
            <TopProduct name="Classic Crunch Burger" sales="1,240" percentage={85} color="bg-orange-500" />
            <TopProduct name="Spicy Chicken Sandwich" sales="980" percentage={65} color="bg-red-500" />
            <TopProduct name="Loaded Fries" sales="850" percentage={55} color="bg-yellow-500" />
            <TopProduct name="Vanilla Bean Shake" sales="720" percentage={45} color="bg-blue-500" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[#101010] p-8 rounded-[2rem] border border-white/5 shadow-2xl transition-all"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        </div>
      </div>
      <div>
        <p className="text-primary/40 text-[10px] font-black uppercase tracking-widest">{title}</p>
        <h4 className="text-3xl font-black text-[#E1E0CC] mt-2 tracking-tighter">{value}</h4>
      </div>
    </motion.div>
  );
}

function OrderRow({ id, name, items, status, amount }: any) {
  const statusColors: any = {
    'Delivered': 'bg-green-500/10 text-green-500 border-green-500/20',
    'Preparing': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'Pending': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
  };

  return (
    <tr className="hover:bg-white/5 transition-colors group">
      <td className="px-8 py-5 text-sm font-bold text-[#E1E0CC]">{id}</td>
      <td className="px-8 py-5 text-sm text-primary/60 font-medium">{name}</td>
      <td className="px-8 py-5 text-sm text-primary/40 font-medium">{items}</td>
      <td className="px-8 py-5">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColors[status]}`}>
          {status}
        </span>
      </td>
      <td className="px-8 py-5 text-sm font-black text-right text-primary">{amount}</td>
    </tr>
  );
}

function TopProduct({ name, sales, percentage, color }: any) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-bold text-xs text-[#E1E0CC] uppercase tracking-wide">{name}</span>
        <span className="text-primary/40 text-[10px] font-black uppercase tracking-widest">{sales} sold</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color} shadow-lg`} 
        />
      </div>
    </div>
  );
}
