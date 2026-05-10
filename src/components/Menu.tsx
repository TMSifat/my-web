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
    <section id="menu" className="py-24 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#ea580c15_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left mb-16">
          <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest block mb-4">
            Curated selection
          </span>
          <h2 className="text-4xl md:text-6xl font-medium text-[#E1E0CC] mb-4 tracking-tighter uppercase">
            Signature <span className="font-serif italic text-primary">Flavors</span>
          </h2>
          <p className="text-primary/60 text-base md:text-lg max-w-xl leading-snug">
            Every item is a masterpiece of crunch and taste, engineered for the ultimate culinary immersion.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-start gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-widest border ${
                activeCategory === category
                  ? 'bg-primary text-black border-primary shadow-2xl shadow-primary/20'
                  : 'bg-transparent text-primary/40 border-primary/10 hover:border-primary/40 hover:text-primary/70'
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
