'use client';

import { Plus } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { MenuItem } from '@/data/menu';

export default function ProductCard({ item }: { item: MenuItem }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-primary shadow-sm">
          ${item.price.toFixed(2)}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            {item.category}
          </span>
          <h3 className="text-xl font-bold text-foreground mt-1 line-clamp-1">{item.name}</h3>
        </div>
        
        <p className="text-gray-500 text-sm flex-grow line-clamp-2 mb-4">
          {item.description}
        </p>
        
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-foreground hover:bg-primary text-white py-3 rounded-xl font-bold transition-colors min-h-[44px]"
          aria-label={`Add ${item.name} to cart`}
        >
          <Plus className="h-5 w-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
