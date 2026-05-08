'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Utensils, UserCircle, LogIn, LogOut } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/#menu' },
    { name: 'Offers', href: '/#offers' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tighter">
              <Utensils className="h-8 w-8 text-orange-500" />
              <span>Crunch<span className="text-orange-500">Bite</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side (Cart + Auth + Mobile Toggle) */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDrawer}
              className="relative p-2 text-gray-800 hover:text-orange-500 transition-colors focus:outline-none"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-500 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center">
              {user ? (
                <div className="flex items-center gap-4 ml-4 border-l pl-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <UserCircle className="h-5 w-5" />
                    <span className="hidden lg:block truncate max-w-[120px]">{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="ml-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-orange-500 text-white hover:bg-orange-600 h-9 px-4 py-2"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-800 hover:text-orange-500 focus:outline-none p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-2">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-orange-500 hover:bg-orange-50"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t mt-2 pt-2 pb-1">
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-500 flex items-center gap-2">
                    <UserCircle className="h-5 w-5" />
                    {user.email}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-orange-600 hover:bg-orange-50 flex items-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
