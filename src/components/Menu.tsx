'use client';

import { useState } from 'react';
import { menuItems } from '@/data/menu';
import ProductCard from './ProductCard';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Burgers', 'Chicken', 'Sides', 'Beverages'];

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Our <span className="text-primary">Menu</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Explore our delicious selection of perfectly crafted meals, sides, and refreshing drinks.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-bold transition-all min-h-[44px] ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-md shadow-red-500/20'
                  : 'bg-white text-foreground border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
