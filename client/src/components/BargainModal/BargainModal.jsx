import { Modal } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { MessageCircle, X, Sparkles } from 'lucide-react';

const BargainModal = ({ product, modalOpen, setModalOpen, isMobile, selectedSize }) => {
  const { user } = useSelector(state => state.auth);
  const [offerPrice, setOfferPrice] = useState("");
  const [selectedPercent, setSelectedPercent] = useState(null);

  const generateBargainMessage = () => {
    let message = `🤝 *PRICE NEGOTIATION REQUEST*\n\n`;
    message += `━━━━━━━━━━━━━━━\n\n`;
    message += `📦 *Product Details*\n\n`;
    message += `🛍️ *${product?.name}*\n`;
    if (selectedSize) message += `   └ Size: ${selectedSize}\n`;
    message += `   └ Original Price: ₹${product?.originalPrice}\n`;
    message += `   └ Discount Price: ₹${product?.discountPrice}\n\n`;
    message += `━━━━━━━━━━━━━━━\n\n`;
    message += `💰 *My Offer*\n`;
    message += `👉 Proposed Price: *₹${offerPrice}*\n\n`;
    const discountPercent = Math.floor(((product.discountPrice - offerPrice) / product.discountPrice) * 100);
    message += `📉 Discount Asked: ${discountPercent}%\n\n`;
    message += `━━━━━━━━━━━━━━━\n\n`;
    message += `🙋 *Customer Details*\n`;
    message += `👤 ${user?.fullName}\n`;
    message += `📞 ${user?.phoneNumber}\n\n`;
    message += `━━━━━━━━━━━━━━━\n\n`;
    message += `💬 Hi, I'm interested in this product. Can you accept my offer? 😊\n\n`;
    message += `⚡ Waiting for your response!\n`;
    return message;
  };

  const handleSubmit = () => {
    if (!offerPrice || offerPrice <= 0) { toast.error("Please enter a valid offer price"); return; }
    if (offerPrice > product.discountPrice) { toast.error("Offer price cannot exceed the listed price"); return; }
    if (offerPrice < product.discountPrice * 0.4) { toast.error("Offer price is too low"); return; }
    if (offerPrice === product.discountPrice) { toast.error("Offer must be lower than the listed price"); return; }
    const message = generateBargainMessage();
    const url = `https://api.whatsapp.com/send?phone=${import.meta.env.VITE_NUMBER}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setModalOpen(false);
  };

  const handlePrice = (num) => {
    let discountPrice = Math.floor(product.discountPrice * (num / 100));
    setOfferPrice(discountPrice);
    setSelectedPercent(num);
  };

  return (
    <Modal
      centered
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
      overlayProps={{ backgroundOpacity: 0.4, blur: 8 }}
      size={isMobile ? "100%" : "480px"}
      withCloseButton={false}
      styles={{
        content: {
          background: '#FFFFFF',
          border: '1px solid #E8D4D0',
          boxShadow: '0 24px 64px rgba(44, 24, 16, 0.08)',
          borderRadius: '32px',
        },
        body: { padding: 0 },
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F1DBD5]/60 flex items-center justify-center">
              <MessageCircle size={18} className="text-[#E7A9A2]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#2C1810] font-['Outfit']">Make an Offer</h2>
              <p className="text-xs text-[#8A6B65]">Negotiate your best price</p>
            </div>
          </div>
          <button
            onClick={() => setModalOpen(false)}
            className="w-8 h-8 rounded-full bg-[#FBF8F5] hover:bg-[#F1DBD5]/50 flex items-center justify-center text-[#8A6B65] hover:text-[#2C1810] transition-all cursor-pointer border border-[#E8D4D0]/30"
          >
            <X size={16} />
          </button>
        </div>

        {/* Product Preview */}
        <div className="flex gap-3 bg-[#FBF8F5] rounded-3xl p-3.5 mb-5 border border-[#E8D4D0]/50">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white border border-[#E8D4D0]/60 flex-shrink-0">
            <img src={product?.images[0]?.url} className="w-full h-full object-contain p-1" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#2C1810] line-clamp-2 leading-snug font-['Outfit']">{product.name}</p>
            {selectedSize && (
              <span className="text-[10px] font-bold text-[#8A6B65] bg-white px-2.5 py-0.5 rounded-full border border-[#E8D4D0]/60 mt-1 inline-block">
                Size: {selectedSize}
              </span>
            )}
            <p className="text-sm font-bold text-[#E7A9A2] mt-1 font-['Outfit']">₹{product.discountPrice}</p>
          </div>
        </div>

        {/* Quick Suggestions */}
        <div className="mb-4">
          <p className="text-[10px] font-bold text-[#8A6B65] uppercase tracking-widest mb-2.5">Quick Suggestions</p>
          <div className="flex gap-2">
            {[80, 70, 60].map((percent) => (
              <button
                key={percent}
                onClick={() => handlePrice(percent)}
                className={`flex-1 py-2 rounded-2xl text-xs font-bold border transition-all duration-250 cursor-pointer ${
                  selectedPercent === percent
                    ? "bg-[#E7A9A2] text-[#2C1810] border-[#E7A9A2] shadow-[0_4px_12px_rgba(231,169,162,0.3)]"
                    : "bg-[#FBF8F5] text-[#2C1810] border-[#E8D4D0]/80 hover:border-[#E7A9A2] hover:text-[#E7A9A2]"
                }`}
              >
                {percent}% of price
                <br />
                <span className="font-normal opacity-75">₹{Math.floor(product.discountPrice * percent / 100)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-[#2C1810] uppercase tracking-wider mb-2">Your Offer Price</label>
          <div className="flex items-center bg-[#FBF8F5] border border-[#E8D4D0] rounded-2xl px-4 focus-within:border-[#E7A9A2] focus-within:ring-2 focus-within:ring-[#E7A9A2]/20 transition-all">
            <span className="text-[#8A6B65] font-semibold mr-2">₹</span>
            <input
              type="number"
              className="flex-1 py-3 bg-transparent outline-none text-[#2C1810] font-semibold placeholder-[#D4A398]/60"
              placeholder="Enter your offer"
              value={offerPrice}
              onChange={(e) => { setOfferPrice(Number(e.target.value)); setSelectedPercent(null); }}
            />
          </div>
          <p className="text-[11px] text-[#8A6B65] mt-1.5">
            Offer range: ₹{Math.floor(product.discountPrice * 0.4)} – ₹{product.discountPrice - 1}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            className="w-full bg-[#E7A9A2] text-[#2C1810] hover:bg-[#E29A8F] py-3 rounded-full font-bold text-sm shadow-[0_4px_16px_rgba(231,169,162,0.3)] hover:shadow-[0_8px_24px_rgba(231,169,162,0.45)] hover:-translate-y-0.5 transition-all duration-250 cursor-pointer flex items-center justify-center gap-2"
            onClick={handleSubmit}
          >
            <Sparkles size={16} />
            Send Offer via WhatsApp
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className="w-full bg-[#FBF8F5] hover:bg-[#F1DBD5]/50 text-[#8A6B65] hover:text-[#2C1810] py-3 rounded-full font-semibold text-sm border border-[#E8D4D0] transition-all duration-250 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BargainModal;
