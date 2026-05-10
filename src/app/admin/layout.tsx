'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Settings, 
  LogOut,
  ShoppingBag,
  BarChart3,
  MessageSquare
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useAdminStore } from '@/store/useAdminStore';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const pathname = usePathname();
  const adminName = useAdminStore((state) => state.adminName);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen bg-[#020202] text-[#E1E0CC]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#050505] border-r border-white/5 flex flex-col relative z-20">
        <div className="p-8 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black uppercase tracking-tighter text-[#E1E0CC] whitespace-nowrap">
              CrunchBite
            </span>
          </Link>
          <p className="text-[10px] text-primary/40 mt-2 uppercase tracking-[0.3em] font-black">Studio Admin</p>
        </div>

        <nav className="flex-1 p-6 space-y-3">
          <NavItem href="/admin" icon={<LayoutDashboard size={20} />} label="Overview" active={pathname === '/admin'} />
          <NavItem href="/admin/messages" icon={<MessageSquare size={20} />} label="Messages" active={pathname === '/admin/messages'} />
          <NavItem href="/admin/finance" icon={<DollarSign size={20} />} label="Finance" active={pathname === '/admin/finance'} />
          <NavItem href="/admin/users" icon={<Users size={20} />} label="Customers" active={pathname === '/admin/users'} />
          <NavItem href="/admin/analytics" icon={<BarChart3 size={20} />} label="Analytics" active={pathname === '/admin/analytics'} />
          
          <div className="pt-6 pb-2">
            <div className="h-px bg-white/5 mx-2" />
          </div>
          
          <NavItem href="/admin/settings" icon={<Settings size={20} />} label="Settings" active={pathname === '/admin/settings'} />
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-5 py-4 text-primary/40 hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all duration-300 group"
          >
            <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="font-bold uppercase text-[10px] tracking-widest">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a] relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <header className="h-20 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <h1 className="text-xs font-black text-primary/60 uppercase tracking-[0.2em]">Crunch Control System</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#E1E0CC]">{adminName}</p>
              <p className="text-[10px] text-primary/40 uppercase tracking-widest font-black">Authorized Admin</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-white/5 flex items-center justify-center text-primary font-black shadow-inner">
              {adminName.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </header>
        
        <div className="relative min-h-[calc(100vh-5rem)]">
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
      className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
        active 
          ? 'bg-primary text-black shadow-xl shadow-primary/20' 
          : 'text-primary/40 hover:bg-white/5 hover:text-primary'
      }`}
    >
      <span className={`${active ? 'text-black' : 'text-primary/40 group-hover:text-primary group-hover:scale-110 transition-all'}`}>
        {icon}
      </span>
      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${active ? 'text-black' : ''}`}>{label}</span>
      
      {active && (
        <motion.div 
          layoutId="nav-active"
          className="absolute inset-0 bg-white/10 pointer-events-none"
        />
      )}
    </Link>
  );
}
