'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Utensils } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);
  const totalItems = getTotalItems();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/#menu' },
    { name: 'Offers', href: '/#offers' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tighter">
              <Utensils className="h-8 w-8 text-secondary" />
              <span>Crunch<span className="text-secondary">Bite</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary px-3 py-2 rounded-md font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side (Cart + Mobile Toggle) */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDrawer}
              className="relative p-2 text-foreground hover:text-primary transition-colors focus:outline-none"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground hover:text-primary focus:outline-none"
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
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
