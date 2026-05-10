'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, Loader2, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export default function CartDrawer() {
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const setDrawerOpen = useCartStore((state) => state.setDrawerOpen);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const [user, setUser] = useState<User | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });
  }, []);

  const handleCheckout = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    if (items.length === 0) return;

    setIsCheckingOut(true);
    try {
      // 1. Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: getSubtotal()
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Insert order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Success state
      setCheckoutSuccess(true);
      setTimeout(() => {
        clearCart();
        setCheckoutSuccess(false);
        setDrawerOpen(false);
      }, 3000);
    } catch (error: any) {
      console.error('Checkout failed:', error);
      alert(`Checkout failed: ${error.message || 'Unknown error'}`);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
        onClick={() => setDrawerOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-[#0a0a0a] border-l border-white/5 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="px-6 py-8 bg-[#101010] border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-medium text-[#E1E0CC] flex items-center gap-3 uppercase tracking-widest">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Order
          </h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 text-primary/40 hover:text-primary transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-primary/20 space-y-4">
              <ShoppingBag className="h-20 w-20 opacity-10" />
              <p className="text-lg font-serif italic">Your cart is empty</p>
              <button 
                onClick={() => setDrawerOpen(false)}
                className="mt-6 px-8 py-2 bg-primary/10 border border-primary/20 text-primary font-bold rounded-full hover:bg-primary hover:text-black transition-all uppercase text-xs tracking-widest"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-[#101010] border border-white/5 rounded-[1.5rem] shadow-sm group">
                <div className="w-20 h-20 bg-black rounded-xl overflow-hidden flex-shrink-0 border border-white/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-[#E1E0CC] line-clamp-1 text-sm uppercase tracking-tight">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-primary/20 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-primary font-bold mt-1 text-base">₹{item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#E1E0CC] hover:bg-primary hover:text-black hover:border-primary transition-all"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="font-bold w-4 text-center text-[#E1E0CC] text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#E1E0CC] hover:bg-primary hover:text-black hover:border-primary transition-all"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && !checkoutSuccess && (
          <div className="border-t border-white/5 bg-[#101010] p-8 space-y-6">
            <div className="flex justify-between text-xl font-medium text-[#E1E0CC] uppercase tracking-tighter">
              <span>Subtotal</span>
              <span className="text-primary font-bold">₹{getSubtotal().toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-primary/30 text-center uppercase tracking-widest font-bold">
              Taxes and shipping calculated at checkout
            </p>
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full flex items-center justify-center py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-black rounded-2xl shadow-2xl shadow-orange-500/20 transition-all transform active:scale-[0.98] uppercase tracking-widest text-sm"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                user ? 'Proceed to Checkout' : 'Login to Checkout'
              )}
            </button>
          </div>
        )}
        
        {/* Success State */}
        {checkoutSuccess && (
          <div className="border-t border-white/5 bg-[#101010] p-8 flex flex-col items-center justify-center space-y-6">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-500 animate-in zoom-in" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium text-green-500 uppercase tracking-tight">Order Placed!</h3>
              <p className="text-primary/40 text-center text-xs mt-2 leading-relaxed">
                Your delicious food is being prepared. <br/>Check your email for the receipt.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
