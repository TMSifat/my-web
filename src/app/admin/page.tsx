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

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Overview</h2>
        <p className="text-slate-500">Here's what's happening at CrunchBite today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$12,845.50" 
          change="+12.5%" 
          trend="up" 
          icon={<DollarSign className="text-green-600" />}
          bgColor="bg-green-50"
        />
        <StatCard 
          title="Total Orders" 
          value="456" 
          change="+8.2%" 
          trend="up" 
          icon={<ShoppingBag className="text-blue-600" />}
          bgColor="bg-blue-50"
        />
        <StatCard 
          title="New Customers" 
          value="89" 
          change="-3.1%" 
          trend="down" 
          icon={<Users className="text-purple-600" />}
          bgColor="bg-purple-50"
        />
        <StatCard 
          title="Avg. Preparation" 
          value="14.2 min" 
          change="+2.4%" 
          trend="up" 
          icon={<Clock className="text-orange-600" />}
          bgColor="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-lg">Recent Orders</h3>
            <button className="text-orange-500 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Items</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <OrderRow id="#CB-1092" name="Alice Smith" items="2 Burgers, 1 Fries" status="Delivered" amount="$24.50" />
                <OrderRow id="#CB-1093" name="Bob Johnson" items="1 Chicken Sandwich" status="Preparing" amount="$12.99" />
                <OrderRow id="#CB-1094" name="Charlie Brown" items="3 Shakes, 2 Burgers" status="Pending" amount="$45.20" />
                <OrderRow id="#CB-1095" name="David Wilson" items="1 Salad, 1 Soda" status="Delivered" amount="$15.75" />
                <OrderRow id="#CB-1096" name="Eve Davis" items="2 Pizza Slices" status="Delivered" amount="$18.00" />
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="font-bold text-lg mb-6">Top Selling Items</h3>
          <div className="space-y-6">
            <TopProduct name="Classic Crunch Burger" sales="1,240" percentage={85} color="bg-orange-500" />
            <TopProduct name="Spicy Chicken Sandwich" sales="980" percentage={65} color="bg-red-500" />
            <TopProduct name="Loaded Fries" sales="850" percentage={55} color="bg-yellow-500" />
            <TopProduct name="Vanilla Bean Shake" sales="720" percentage={45} color="bg-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon, bgColor }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className={`${bgColor} w-12 h-12 rounded-2xl flex items-center justify-center`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
          {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</h4>
      </div>
    </div>
  );
}

function OrderRow({ id, name, items, status, amount }: any) {
  const statusColors: any = {
    'Delivered': 'bg-green-100 text-green-700',
    'Preparing': 'bg-blue-100 text-blue-700',
    'Pending': 'bg-yellow-100 text-yellow-700'
  };

  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
      <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{id}</td>
      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{name}</td>
      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{items}</td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[status]}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm font-bold text-right text-slate-900 dark:text-white">{amount}</td>
    </tr>
  );
}

function TopProduct({ name, sales, percentage, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-300">{name}</span>
        <span className="text-slate-500">{sales} sold</span>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
