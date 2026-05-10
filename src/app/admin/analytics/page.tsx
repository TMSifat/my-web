import React from 'react';
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics & Insights</h2>
        <p className="text-slate-500">Deep dive into your business performance and customer behavior.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnalyticsCard 
          title="Conversion Rate" 
          value="4.8%" 
          change="+0.6%" 
          trend="up"
          description="Visitors to orders"
        />
        <AnalyticsCard 
          title="Avg. Order Value" 
          value="$28.50" 
          change="+2.1%" 
          trend="up"
          description="Per customer session"
        />
        <AnalyticsCard 
          title="Bounce Rate" 
          value="32%" 
          change="-1.2%" 
          trend="down"
          description="Percentage of single-page visits"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <h3 className="font-bold text-xl mb-8 flex items-center gap-2">
            <TrendingUp size={24} className="text-orange-500" />
            Growth Velocity
          </h3>
          <div className="h-64 flex items-end justify-between gap-4">
            {[30, 45, 25, 60, 40, 85, 55].map((h, i) => (
              <div key={i} className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-xl relative group">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-xl group-hover:from-orange-500 group-hover:to-orange-300 transition-all"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
              <Zap size={24} className="text-yellow-500" />
              Efficiency Score
            </h3>
            <p className="text-slate-500 text-sm mb-8">Performance based on prep time vs customer satisfaction.</p>
          </div>
          
          <div className="space-y-6">
            <EfficiencyItem label="Order Processing" score={92} />
            <EfficiencyItem label="Delivery Speed" score={85} />
            <EfficiencyItem label="Customer Feedback" score={78} />
          </div>

          <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
              A+
            </div>
            <div>
              <p className="font-bold text-sm">Excellent Performance</p>
              <p className="text-xs text-slate-500">You are in the top 5% of local restaurants.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsCard({ title, value, change, trend, description }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
      <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">{title}</p>
      <div className="flex items-end gap-3 mb-2">
        <h4 className="text-4xl font-black text-slate-900 dark:text-white">{value}</h4>
        <span className={`text-sm font-bold flex items-center mb-2 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
          {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        </span>
      </div>
      <p className="text-xs text-slate-400 font-medium">{description}</p>
    </div>
  );
}

function EfficiencyItem({ label, score }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-bold uppercase tracking-wide">
        <span className="text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-orange-500">{score}%</span>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-orange-500" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
