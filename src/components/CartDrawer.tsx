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
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
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
      <div className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="px-4 py-6 bg-gray-50 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            Your Order
          </h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <ShoppingBag className="h-16 w-16 opacity-20" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <button 
                onClick={() => setDrawerOpen(false)}
                className="mt-4 px-6 py-2 bg-primary text-white font-medium rounded-full hover:bg-red-600 transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-white border rounded-xl shadow-sm">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-foreground line-clamp-1">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-foreground hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-foreground hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && !checkoutSuccess && (
          <div className="border-t bg-white p-6 space-y-4">
            <div className="flex justify-between text-lg font-bold text-foreground">
              <span>Subtotal</span>
              <span>${getSubtotal().toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Taxes and shipping calculated at checkout
            </p>
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full flex items-center justify-center py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all transform active:scale-[0.98]"
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
          <div className="border-t bg-white p-6 flex flex-col items-center justify-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 animate-in zoom-in" />
            <h3 className="text-xl font-bold text-green-600">Order Placed Successfully!</h3>
            <p className="text-gray-500 text-center text-sm">
              Your delicious food is being prepared. We've sent a receipt to your email.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
