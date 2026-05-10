'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { MenuItemCard } from './ui/menu-item-card';
import { useCartStore } from '@/store/useCartStore';

export interface MenuItem {
  id: string;
  name: string;
  category: 'Burgers' | 'Chicken' | 'Sides' | 'Beverages';
  price: number;
  description: string;
  image: string;
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchMenu() {
      const { data } = await supabase.from('products').select('*').order('id');
      if (data) {
        setMenuItems(data as MenuItem[]);
      }
      setLoading(false);
    }
    fetchMenu();
  }, []);

  const categories = ['All', 'Burgers', 'Chicken', 'Sides', 'Beverages'];

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">
            Our <span className="text-orange-500">Menu</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Experience the perfect crunch with our premium selection of handcrafted meals.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-2xl font-black transition-all uppercase tracking-tight text-sm ${
                activeCategory === category
                  ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-orange-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item) => (
              <MenuItemCard 
                key={item.id}
                imageUrl={item.image}
                isVegetarian={item.category === 'Sides' || item.category === 'Beverages' || item.name.toLowerCase().includes('veg')}
                name={item.name}
                price={item.price}
                originalPrice={Math.round(item.price * 1.5)}
                quantity={item.category === 'Beverages' ? '450 ml' : '1 Portion'}
                prepTimeInMinutes={item.category === 'Burgers' ? 12 : 5}
                onAdd={() => handleAddToCart(item)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
