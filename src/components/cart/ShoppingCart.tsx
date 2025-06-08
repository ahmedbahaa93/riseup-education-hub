import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export const CartDrawer: React.FC = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    // Navigate to checkout page
    window.location.href = '/checkout';
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="w-4 h-4" />
        {items.length > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            {items.length}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="h-full rounded-none border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Shopping Cart
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex flex-col h-full">
                {items.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 space-y-4 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <img 
                            src={item.image || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.title}</h4>
                            <p className="text-blue-600 font-bold">${item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-4 pt-4">
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total: ${total.toFixed(2)}</span>
                        <Button variant="outline" onClick={clearCart}>
                          Clear Cart
                        </Button>
                      </div>
                      <Button className="w-full" onClick={handleCheckout}>
                        Proceed to Checkout
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};