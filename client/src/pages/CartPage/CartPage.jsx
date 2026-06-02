import React, { useEffect } from 'react';
import { CartCard } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { ArrowLeft, ShoppingBag, Tag, Truck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { handlePrice } from '../../features/cartSlice';

const CartPage = () => {
  const { loading, cartData, totalPrice, totalSubPrice, shippingPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartData.length) return;
    const subTotal = cartData.reduce((acc, item) => acc + item.quantity * item.productId.discountPrice, 0);
    const shipping = subTotal < 500 ? 99 : 0;
    dispatch(handlePrice({ subTotal, shipping }));
  }, [cartData, dispatch]);

  if (loading && !cartData.length) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
        <div className="spinner-luxury" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F5]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-sm text-[#8A6B65] hover:text-[#E7A9A2] transition-colors group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Continue Shopping
          </button>
          <div className="h-4 w-px bg-[#E8D4D0]/60" />
          <div>
            <h1 className="text-2xl md:text-3xl font-medium tracking-wide text-[#2C1810] font-['Outfit']">Shopping Cart</h1>
            {cartData.length > 0 && (
              <p className="text-xs text-[#8A6B65] mt-0.5">{cartData.length} item{cartData.length !== 1 ? 's' : ''}</p>
            )}
          </div>
        </div>

        {cartData.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-3xl bg-[#F1DBD5]/60 flex items-center justify-center mb-6 border border-[#E8D4D0]/60">
              <ShoppingBag size={40} className="text-[#E7A9A2]" />
            </div>
            <h2 className="text-2xl font-semibold text-[#2C1810] mb-2 font-['Outfit']">Your cart is empty</h2>
            <p className="text-[#8A6B65] mb-8 max-w-sm leading-relaxed text-sm">
              Looks like you haven't added anything yet. Explore our collection and find something you love.
            </p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Explore Collection
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {cartData.map((item) => (
                <CartCard key={item._id} item={item} />
              ))}

              {/* Free shipping notice */}
              {shippingPrice > 0 && (
                <div className="bg-[#FBF8F5] rounded-3xl border border-[#E8D4D0]/60 p-4 flex items-center gap-3">
                  <Truck size={18} className="text-[#E7A9A2] flex-shrink-0" />
                  <p className="text-sm text-[#6E3F39]">
                    Add <span className="font-bold text-[#E7A9A2]">₹{500 - totalSubPrice}</span> more for free shipping!
                  </p>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-3xl border border-[#E8D4D0]/60 shadow-[0_12px_48px_rgba(44,24,16,0.04)] p-6 sticky top-24">
                <h2 className="text-lg font-bold text-[#2C1810] mb-5 font-['Outfit']">Order Summary</h2>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8A6B65]">Subtotal ({cartData.length} items)</span>
                    <span className="font-semibold text-[#2C1810] font-['Outfit']">₹{totalSubPrice?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8A6B65] flex items-center gap-1.5">
                      <Truck size={14} /> Shipping
                    </span>
                    <span className={`font-semibold ${shippingPrice === 0 ? 'text-emerald-600 font-bold' : 'text-[#2C1810]'}`}>
                      {shippingPrice === 0 ? 'FREE' : `₹${shippingPrice}`}
                    </span>
                  </div>

                  {shippingPrice === 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50/60 rounded-xl px-3 py-2 border border-emerald-100">
                      <Tag size={12} />
                      Free shipping applied!
                    </div>
                  )}

                  <div className="border-t border-[#E8D4D0]/60 pt-3 flex justify-between">
                    <span className="font-bold text-[#2C1810]">Total</span>
                    <span className="text-xl font-bold text-[#2C1810] font-['Outfit']">₹{totalPrice?.toFixed(2)}</span>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button variant="primary" className="w-full justify-center mb-3 py-3.5" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="ghost" className="w-full justify-center text-[#8A6B65] py-3">
                    Continue Shopping
                  </Button>
                </Link>

                {/* Trust */}
                <div className="mt-5 pt-4 border-t border-[#E8D4D0]/60 flex items-center justify-center gap-1.5 text-xs text-[#8A6B65]">
                  <span>🔒</span>
                  <span>Secure checkout via WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
