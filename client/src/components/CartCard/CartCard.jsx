import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { removeFromCart, updateCartItem } from '../../features/cartSlice'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const CartCard = ({ item }) => {
  const { loading } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantity = async ({ num, size }) => {
    let netQuantity = quantity + num;
    if (netQuantity === 0) {
      toast.error("Minimum quantity is 1");
      setQuantity(1);
      return;
    }
    if (netQuantity === 101) {
      toast.error("Maximum quantity is 100");
      setQuantity(100);
      return;
    }
    setQuantity(netQuantity);
    try {
      await dispatch(updateCartItem({ productId: item.productId._id, quantity: netQuantity, size })).unwrap();
    } catch (error) {
      toast.error(error.message || "Failed to update cart");
    }
  };

  const handleRemove = async (productId, size) => {
    try {
      const result = await dispatch(removeFromCart(productId, size)).unwrap();
      toast.success(result.message || "Removed from cart");
    } catch (error) {
      toast.error(error.message || "Failed to remove item");
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E8D4D0]/60 shadow-[0_4px_20px_rgba(44,24,16,0.04)] p-4 md:p-5 hover:shadow-[0_12px_36px_rgba(231,169,162,0.15)] transition-all duration-350">
      <div className="flex gap-4">
        {/* Image */}
        <Link to={`/product/${item?.productId?._id}`} className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-[#FBF8F5] border border-[#E8D4D0]/65">
            <img
              src={item?.productId?.images[0]?.url}
              alt={item?.productId?.name}
              className="w-full h-full object-contain p-2"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <Link to={`/product/${item?.productId?._id}`}>
            <h3 className="text-xs md:text-sm font-semibold text-[#2C1810] line-clamp-2 leading-snug hover:text-[#E7A9A2] transition-colors mb-1 font-['Outfit']">
              {item?.productId?.name}
            </h3>
          </Link>

          {item?.size && (
            <span className="inline-block text-[10px] font-bold text-[#8A6B65] bg-[#F1DBD5]/50 px-2.5 py-0.5 rounded-full mb-2">
              Size: {item.size}
            </span>
          )}

          <p className="text-sm font-bold text-[#2C1810] mb-3 font-['Outfit']">
            ₹{item?.productId?.discountPrice}
          </p>

          {/* Quantity + Remove */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#FBF8F5] border border-[#E8D4D0]/80 rounded-full overflow-hidden">
              <button
                className="px-3 py-1.5 hover:bg-[#F1DBD5]/50 text-[#2C1810] transition-colors cursor-pointer"
                onClick={() => handleQuantity({ num: -1, size: item?.size })}
              >
                <Minus size={13} />
              </button>
              <span className="px-3 py-1.5 text-xs font-bold text-[#2C1810] border-x border-[#E8D4D0]/80 min-w-[2.5rem] text-center font-['Outfit']">
                {quantity}
              </span>
              <button
                className="px-3 py-1.5 hover:bg-[#F1DBD5]/50 text-[#2C1810] transition-colors cursor-pointer"
                onClick={() => handleQuantity({ num: 1, size: item?.size })}
              >
                <Plus size={13} />
              </button>
            </div>

            <button
              onClick={() => handleRemove({ productId: item.productId._id, size: item?.size })}
              className="p-2 rounded-full text-[#8A6B65] hover:text-red-500 hover:bg-red-50/50 transition-all duration-200 cursor-pointer"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {/* Line Total */}
        <div className="flex-shrink-0 text-right">
          <p className="text-base md:text-lg font-bold text-[#2C1810]">
            ₹{item.productId.discountPrice * quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
