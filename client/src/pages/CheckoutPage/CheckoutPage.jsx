import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Input } from '../../components';
import { ArrowLeft, MapPin, Phone, ShoppingBag, Truck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getSingleUser } from '../../features/userSlice';
import { clearBuy, clearCart, handlePrice } from '../../features/cartSlice';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userLocal, loading } = useSelector(state => state.user);
  const { user } = useSelector(state => state.auth);
  const { cartData, totalSubPrice, shippingPrice, totalPrice, buyItem } = useSelector(state => state.cart);

  useEffect(() => {
    if (!cartData.length) return;
    const subTotal = cartData.reduce((acc, item) => acc + item.quantity * item.productId.discountPrice, 0);
    const shipping = subTotal < 500 ? 99 : 0;
    dispatch(handlePrice({ subTotal, shipping }));
  }, [cartData, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getSingleUser(user._id)).unwrap();
      } catch (error) {
        toast.error(error?.message || "Please log in to access checkout");
      }
    };
    fetchData();
  }, []);

  const [inputData, setInputData] = useState({
    fullName: "", phoneNumber: "", street: "", city: "", state: "", pinCode: ""
  });

  const handleInputChange = (e) => setInputData({ ...inputData, [e.target.name]: e.target.value });

  const handleClick = (address) => {
    setInputData({
      fullName: address.fullName || "",
      phoneNumber: address.phoneNumber || "",
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      pinCode: address.pinCode || "",
    });
  };

  const generateWhatsAppMessage = () => {
    let message = `🛍️ *NEW ORDER RECEIVED*\n\n━━━━━━━━━━━━━━━\n\n📦 *Order Items*\n\n`;
    if (buyItem) {
      message += `1️⃣ *${buyItem?.name}*\n`;
      if (buyItem.size) message += `   └ Size: ${buyItem?.size}\n`;
      message += `   └ Qty: ${buyItem?.quantity} × ₹${buyItem?.discountPrice}\n\n`;
      let subTotal = buyItem.discountPrice * buyItem.quantity;
      let shipping = buyItem.discountPrice < 500 ? 99 : 0;
      message += `━━━━━━━━━━━━━━━\n\n💰 *Order Summary*\n🧾 Subtotal: ₹${subTotal}\n🚚 Shipping: ₹${shipping}\n🔸 *Total: ₹${subTotal + shipping}*\n\n`;
    } else {
      cartData.forEach((item, index) => {
        message += `${index + 1}️⃣ *${item.productId.name}*\n`;
        if (item.size) message += `   └ Size: ${item.size}\n`;
        message += `   └ Qty: ${item.quantity} × ₹${item.productId.discountPrice}\n\n`;
      });
      message += `━━━━━━━━━━━━━━━\n\n💰 *Order Summary*\n🧾 Subtotal: ₹${totalSubPrice}\n🚚 Shipping: ₹${shippingPrice}\n🔸 *Total: ₹${totalPrice}*\n\n`;
    }
    message += `━━━━━━━━━━━━━━━\n\n📍 *Delivery Details*\n👤 ${inputData.fullName}\n🏠 ${inputData.street}\n📍 ${inputData.city}, ${inputData.state} - ${inputData.pinCode}\n📞 ${inputData.phoneNumber}\n\n━━━━━━━━━━━━━━━\n\n⚡ *Payment Mode*: Cash on Delivery\n\n`;
    return message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.phoneNumber) { toast.error("Phone number is required"); return; }
    if (!inputData.street.trim()) { toast.error("Street address is required"); return; }
    if (!inputData.city.trim()) { toast.error("City is required"); return; }
    if (!inputData.state.trim()) { toast.error("State is required"); return; }
    if (!inputData.pinCode) { toast.error("PIN code is required"); return; }

    const message = generateWhatsAppMessage();
    const url = `https://api.whatsapp.com/send?phone=${import.meta.env.VITE_NUMBER}&text=${encodeURIComponent(message)}`;

    if (buyItem) {
      toast.success("Order placed! Redirecting to WhatsApp...");
      window.open(url, "_blank");
      dispatch(clearBuy());
      navigate("/products");
    } else {
      try {
        toast.success("Order placed! Redirecting to WhatsApp...");
        window.open(url, "_blank");
        await dispatch(clearCart()).unwrap();
        navigate("/products");
      } catch (error) {
        toast.error("Failed to process order. Please try again.");
      }
    }
  };

  if (loading || !userLocal) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
        <div className="spinner-luxury" />
      </div>
    );
  }

  const orderTotal = buyItem
    ? buyItem.discountPrice * buyItem.quantity + (buyItem.discountPrice < 500 ? 99 : 0)
    : totalPrice;

  return (
    <div className="min-h-screen bg-[#FBF8F5]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-[#8A6B65] hover:text-[#E7A9A2] transition-colors group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
          <div className="h-4 w-px bg-[#E8D4D0]/60" />
          <h1 className="text-2xl md:text-3xl font-medium tracking-wide text-[#2C1810] font-['Outfit']">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Shipping Form */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-3xl border border-[#E8D4D0]/60 shadow-[0_12px_48px_rgba(44,24,16,0.04)] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#F1DBD5]/60 flex items-center justify-center">
                  <Truck size={20} className="text-[#E7A9A2]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#2C1810] font-['Outfit']">Shipping Address</h2>
                  <p className="text-xs text-[#8A6B65]">Where should we deliver your order?</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" name="fullName" type="text" placeholder="John Doe" value={inputData.fullName} onChange={handleInputChange} required />
                <Input label="Phone Number" name="phoneNumber" type="number" placeholder="1234567890" value={inputData.phoneNumber} onChange={handleInputChange} required />
                <div className="sm:col-span-2">
                  <Input label="Street Address" name="street" type="text" placeholder="123 Main Street, Apartment 4B" value={inputData.street} onChange={handleInputChange} required />
                </div>
                <Input label="City" name="city" type="text" placeholder="New Delhi" value={inputData.city} onChange={handleInputChange} required />
                <Input label="State" name="state" type="text" placeholder="Delhi" value={inputData.state} onChange={handleInputChange} required />
                <Input label="PIN Code" name="pinCode" type="number" placeholder="110001" value={inputData.pinCode} onChange={handleInputChange} required />
              </div>
            </div>

            {/* Saved Addresses */}
            {userLocal.address?.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#E8D4D0]/60 shadow-[0_12px_48px_rgba(44,24,16,0.04)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F1DBD5]/60 flex items-center justify-center">
                    <MapPin size={20} className="text-[#E7A9A2]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#2C1810] font-['Outfit']">Saved Addresses</h2>
                    <p className="text-xs text-[#8A6B65]">Click to auto-fill the form above</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                  {userLocal.address.map((address) => (
                    <button
                      type="button"
                      key={address._id}
                      onClick={() => handleClick(address)}
                      className="text-left border-2 border-[#E8D4D0] rounded-2xl p-4 hover:border-[#E7A9A2] hover:bg-[#FBF8F5] transition-all duration-250 cursor-pointer group"
                    >
                      {address.isDefault && (
                        <Badge variant="info" className="mb-2">Default</Badge>
                      )}
                      <p className="text-sm font-bold text-[#2C1810] group-hover:text-[#E7A9A2] transition-colors">{address.fullName}</p>
                      <p className="text-xs text-[#8A6B65] mt-1 leading-relaxed">
                        {address.street}, {address.city}, {address.state} {address.pinCode}
                      </p>
                      <p className="text-xs text-[#8A6B65] flex items-center gap-1 mt-1.5 font-light">
                        <Phone size={11} /> {address.phoneNumber}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-white rounded-3xl border border-[#E8D4D0]/60 shadow-[0_12px_48px_rgba(44,24,16,0.04)] p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#F1DBD5]/60 flex items-center justify-center">
                  <ShoppingBag size={20} className="text-[#E7A9A2]" />
                </div>
                <h2 className="text-base font-bold text-[#2C1810] font-['Outfit']">Order Summary</h2>
              </div>

              {/* Items */}
              <div className="space-y-3 mb-5 max-h-48 overflow-y-auto">
                {buyItem ? (
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-xl bg-[#FBF8F5] border border-[#E8D4D0]/60 flex-shrink-0 overflow-hidden">
                      <img src={buyItem.images?.[0]?.url} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#2C1810] line-clamp-1">{buyItem.name}</p>
                      {buyItem.size && <p className="text-[10px] text-[#8A6B65]">Size: {buyItem.size}</p>}
                      <p className="text-xs text-[#8A6B65]">Qty: {buyItem.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-[#2C1810] font-['Outfit']">₹{buyItem.discountPrice * buyItem.quantity}</p>
                  </div>
                ) : (
                  cartData.map((item) => (
                    <div key={item._id} className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-xl bg-[#FBF8F5] border border-[#E8D4D0]/60 flex-shrink-0 overflow-hidden">
                        <img src={item.productId.images?.[0]?.url} className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#2C1810] line-clamp-1">{item.productId.name}</p>
                        {item.size && <p className="text-[10px] text-[#8A6B65]">Size: {item.size}</p>}
                        <p className="text-xs text-[#8A6B65]">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-[#2C1810] font-['Outfit']">₹{item.productId.discountPrice * item.quantity}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Totals */}
              <div className="border-t border-[#E8D4D0]/60 pt-4 space-y-2.5 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8A6B65]">Subtotal</span>
                  <span className="font-semibold text-[#2C1810] font-['Outfit']">
                    ₹{buyItem ? buyItem.discountPrice * buyItem.quantity : totalSubPrice}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8A6B65]">Shipping</span>
                  <span className={`font-semibold ${(buyItem ? buyItem.discountPrice < 500 ? 99 : 0 : shippingPrice) === 0 ? 'text-emerald-600 font-bold' : 'text-[#2C1810]'}`}>
                    {(buyItem ? (buyItem.discountPrice < 500 ? 99 : 0) : shippingPrice) === 0 ? 'FREE' : `₹${buyItem ? 99 : shippingPrice}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#E8D4D0]/60 pt-2.5">
                  <span className="font-bold text-[#2C1810]">Total</span>
                  <span className="text-xl font-bold text-[#2C1810] font-['Outfit']">₹{orderTotal}</span>
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full justify-center py-3.5" size="lg">
                Place Order via WhatsApp
              </Button>

              <p className="text-center text-xs text-[#8A6B65] mt-3 flex items-center justify-center gap-1 font-light">
                <span>🔒</span> Cash on Delivery · Secure Checkout
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
