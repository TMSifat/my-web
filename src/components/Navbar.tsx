'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Utensils, UserCircle, LogIn, LogOut } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAdminStore } from '@/store/useAdminStore';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);
  const totalItems = getTotalItems();
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const adminWhitelist = useAdminStore((state) => state.adminWhitelist);
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/#menu' },
    { name: 'Offers', href: '/#offers' },
    { name: 'Contact', href: '/#contact' },
    ...(user && adminWhitelist.includes(user.email || '') ? [{ name: 'Admin', href: '/admin' }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-inset py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary font-black text-2xl tracking-tighter uppercase italic font-serif">
          Crunch<span className="text-orange-500">Bite</span>
        </Link>

        {/* Desktop Navigation Pill */}
        <div className="hidden md:flex bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 items-center gap-10 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest text-primary/70 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right side (Cart + Auth) */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDrawer}
            className="relative p-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full text-primary hover:bg-orange-500 hover:text-white transition-all shadow-xl"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-orange-600 text-[10px] font-black text-white rounded-full ring-2 ring-black">
                {totalItems}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full pl-4 pr-1 py-1">
              <span className="text-[10px] font-bold text-primary/60 uppercase tracking-tighter hidden lg:block">{user.email?.split('@')[0]}</span>
              <button
                onClick={handleLogout}
                className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-all"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-primary text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl"
            >
              Join
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full text-primary"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 z-[-1] flex flex-col items-center justify-center gap-8 p-10 animate-in fade-in duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-tighter text-primary/50 hover:text-primary transition-all"
            >
              {link.name}
            </Link>
          ))}
          {!user && (
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 bg-primary text-black px-12 py-4 rounded-full text-lg font-black uppercase"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
