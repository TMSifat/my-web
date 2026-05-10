'use client';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Settings, 
  LogOut,
  ShoppingBag,
  BarChart3
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useAdminStore } from '@/store/useAdminStore';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const adminName = useAdminStore((state) => state.adminName);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
              CrunchBite
            </span>
          </Link>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem href="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem href="/admin/finance" icon={<DollarSign size={20} />} label="Finance" />
          <NavItem href="/admin/users" icon={<Users size={20} />} label="User Management" />
          <NavItem href="/admin/analytics" icon={<BarChart3 size={20} />} label="Analytics" />
          <div className="pt-4 pb-2">
            <div className="h-px bg-slate-200 dark:bg-slate-800 mx-2" />
          </div>
          <NavItem href="/admin/settings" icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-slate-800 dark:text-white uppercase tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{adminName}</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border border-orange-200">
              {adminName.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      <span className={`${active ? 'text-white' : 'text-slate-500 group-hover:text-orange-500'}`}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
