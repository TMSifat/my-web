// components/ui/menu-item-card.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

// --- PROPS INTERFACE ---
export interface MenuItemCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onContextMenu' | 'onPointerDown' | 'onPointerMove' | 'onPointerUp'> {
  imageUrl: string;
  isVegetarian: boolean;
  name: string;
  price: number;
  originalPrice: number;
  quantity: string;
  prepTimeInMinutes: number;
  onAdd: () => void;
}

const MenuItemCard = React.forwardRef<HTMLDivElement, MenuItemCardProps>(
  (
    {
      className,
      imageUrl,
      isVegetarian,
      name,
      price,
      originalPrice,
      quantity,
      prepTimeInMinutes,
      onAdd,
      ...props
    },
    ref
  ) => {
    const savings = originalPrice - price;

    // --- ANIMATION VARIANTS ---
    const cardVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      hover: { scale: 1.03, transition: { duration: 0.2 } },
    };
    
    const buttonVariants = {
      tap: { scale: 0.95 },
    };

    const vegIconVariants = {
       initial: { scale: 0 },
       animate: { scale: 1, transition: { delay: 0.3, type: "spring" as const, stiffness: 200 } },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative flex flex-col w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/5 bg-[#101010] text-card-foreground shadow-2xl group transition-all duration-500",
          className
        )}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        layout
        {...props}
      >
        {/* --- IMAGE & ADD BUTTON CONTAINER --- */}
        <div className="relative overflow-hidden rounded-t-xl bg-muted">
          <img
            src={imageUrl}
            alt={name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80";
            }}
            className="object-cover w-full h-48 transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* --- VEGETARIAN ICON --- */}
          <motion.div 
            className="absolute top-3 right-3"
            variants={vegIconVariants}
            aria-label={isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
          >
            <div className={cn(
              "w-5 h-5 border flex items-center justify-center rounded-md",
              isVegetarian ? "border-green-600 bg-background" : "border-red-600 bg-background"
            )}>
              <div className={cn(
                "w-3 h-3 rounded-full",
                isVegetarian ? "bg-green-600" : "bg-red-600"
              )} />
            </div>
          </motion.div>

          {/* --- ADD BUTTON (FIXED) --- */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex justify-center">
             {/* The button is now initially hidden and appears on group-hover */}
            <motion.button
              onClick={onAdd}
              variants={buttonVariants}
              whileTap="tap"
              className="px-8 py-2 text-sm font-bold uppercase transition-all duration-300 transform translate-y-4 border rounded-lg shadow-lg opacity-0 bg-background/80 text-foreground backdrop-blur-sm border-border/50 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Add ${name} to cart`}
            >
              Add
            </motion.button>
          </div>
        </div>

        {/* --- CONTENT SECTION (FIXED PADDING) --- */}
        <div className="flex flex-col flex-grow p-6 text-left">
          {/* --- PRICING --- */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#E1E0CC]">₹{price}</span>
            <span className="text-sm line-through text-primary/40">₹{originalPrice}</span>
            {savings > 0 && (
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest px-2 py-0.5 bg-green-500/10 rounded-full">SAVE ₹{savings}</span>
            )}
          </div>
          
          {/* --- QUANTITY --- */}
          <p className="mt-1 text-[10px] uppercase tracking-widest font-bold text-primary/40">{quantity}</p>
          
          {/* --- ITEM NAME --- */}
          <h3 className="mt-3 text-lg font-medium leading-tight text-[#E1E0CC]">{name}</h3>
          
          {/* --- PREP TIME --- */}
          <div className="flex items-center gap-1.5 mt-auto pt-4 text-[10px] uppercase tracking-widest font-bold text-primary/30">
            <Clock className="w-3 h-3" />
            <span>{prepTimeInMinutes} mins</span>
          </div>
        </div>
      </motion.div>
    );
  }
);

MenuItemCard.displayName = "MenuItemCard";

export { MenuItemCard };
