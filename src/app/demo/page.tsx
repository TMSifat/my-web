// src/app/demo/page.tsx
"use client";

import { MenuItemCard } from "@/components/ui/menu-item-card";

const menuItems = [
  {
    imageUrl: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=1260&auto=format&fit=crop",
    isVegetarian: true,
    name: "Strawberry Lemonade",
    price: 139,
    originalPrice: 279,
    quantity: "450 ml",
    prepTimeInMinutes: 5,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=1336&auto=format&fit=crop",
    isVegetarian: true,
    name: "Vietnamese Cold Coffee",
    price: 189,
    originalPrice: 529,
    quantity: "450 ml",
    prepTimeInMinutes: 5,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop",
    isVegetarian: true,
    name: "Chole & Chapati",
    price: 149,
    originalPrice: 419,
    quantity: "Serves 1",
    prepTimeInMinutes: 5,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1589113110390-272e616f731e?q=80&w=1470&auto=format&fit=crop",
    isVegetarian: true,
    name: "Bhelpuri",
    price: 119,
    originalPrice: 229,
    quantity: "1 Portion",
    prepTimeInMinutes: 5,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1398&auto=format&fit=crop",
    isVegetarian: false,
    name: "The Beast Burger",
    price: 299,
    originalPrice: 499,
    quantity: "Serves 1",
    prepTimeInMinutes: 12,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1473&auto=format&fit=crop",
    isVegetarian: false,
    name: "Crispy Chicken Tenders",
    price: 249,
    originalPrice: 399,
    quantity: "6 Pieces",
    prepTimeInMinutes: 8,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=1374&auto=format&fit=crop",
    isVegetarian: true,
    name: "Spicy Peri Peri Fries",
    price: 129,
    originalPrice: 199,
    quantity: "Large",
    prepTimeInMinutes: 5,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1480&auto=format&fit=crop",
    isVegetarian: true,
    name: "Truffle Mushroom Pasta",
    price: 349,
    originalPrice: 599,
    quantity: "Serves 1",
    prepTimeInMinutes: 15,
  },
];

export default function MenuItemCardDemo() {
  const handleAddItem = (itemName: string) => {
    console.log(`Added ${itemName} to cart!`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-8 bg-slate-50 dark:bg-slate-950">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">Premium <span className="text-orange-500">Menu</span></h1>
        <p className="text-slate-500 max-w-xl mx-auto">Explore our new interactive menu cards featuring real-time animations and vegetarian indicators.</p>
      </div>
      
      <div className="grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {menuItems.map((item, index) => (
          <MenuItemCard
            key={index}
            imageUrl={item.imageUrl}
            isVegetarian={item.isVegetarian}
            name={item.name}
            price={item.price}
            originalPrice={item.originalPrice}
            quantity={item.quantity}
            prepTimeInMinutes={item.prepTimeInMinutes}
            onAdd={() => handleAddItem(item.name)}
          />
        ))}
      </div>
    </div>
  );
}
