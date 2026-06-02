import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { Button } from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addToCart } from '../../features/cartSlice';
import BargainModal from '../BargainModal/BargainModal';

const ProductCard = ({ product }) => {
  const { isLoggedIn } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sizeOrder = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const discountPercent = Math.round(
    ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100
  );

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please sign in to add items to cart");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (product?.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    try {
      const result = await dispatch(addToCart({ productId: product._id, size: selectedSize })).unwrap();
      toast.success(result.message || "Added to cart");
    } catch (error) {
      toast.error(error.message || "Failed to add to cart");
    }
  };

  const handleBargaining = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please sign in to bargain");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size before bargaining");
      return;
    }
    setModalOpen(true);
  };

  return (
    <div
      className="group bg-white rounded-3xl border border-[#E8D4D0]/60 shadow-[0_4px_20px_rgba(44,24,16,0.04)] hover:shadow-[0_12px_36px_rgba(231,169,162,0.18)] hover:-translate-y-1.5 transition-all duration-400 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/product/${product._id}`} className="block relative overflow-hidden bg-[#FBF8F5] border-b border-[#E8D4D0]/30">
        <div className="relative h-44 sm:h-52 md:h-60">
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105 p-4"
            loading="lazy"
          />
        </div>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-[#E7A9A2] text-[#2C1810] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm tracking-wider">
              -{discountPercent}%
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-xs sm:text-sm font-medium text-[#2C1810] line-clamp-2 leading-snug mb-2 hover:text-[#E7A9A2] transition-colors duration-250 font-['Outfit']">
            {product.name}
          </h3>
        </Link>

        {/* Sizes */}
        {product.sizes.length > 0 && (
          <div className="flex gap-1.5 mb-3 flex-wrap">
            {[...product.sizes]
              .sort((a, b) => {
                const sA = (a.size || a).toUpperCase();
                const sB = (b.size || b).toUpperCase();
                return sizeOrder.indexOf(sA) - sizeOrder.indexOf(sB);
              })
              .map((sizeObj, index) => {
                const size = sizeObj.size || sizeObj;
                const isOutOfStock = sizeObj.stock === 0;
                return (
                  <button
                    key={index}
                    disabled={isOutOfStock}
                    onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all duration-200 cursor-pointer
                      ${selectedSize === size
                        ? "bg-[#2C1810] text-white border-[#2C1810]"
                        : "bg-white text-[#2C1810] border-[#E8D4D0] hover:border-[#E7A9A2] hover:text-[#E7A9A2]"
                      }
                      ${isOutOfStock ? "opacity-35 cursor-not-allowed line-through" : ""}`}
                  >
                    {size}
                  </button>
                );
              })}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-base font-bold text-[#2C1810] font-['Outfit']">₹{product.discountPrice}</span>
          {product.originalPrice && (
            <span className="text-xs text-[#8A6B65] line-through font-light">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            variant="primary"
            size="sm"
            className="w-full text-xs font-semibold py-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={13} />
            Add to Cart
          </Button>

          <button
            onClick={handleBargaining}
            className="w-full flex items-center justify-center gap-1.5 bg-[#F1DBD5]/40 hover:bg-[#F1DBD5]/80 text-[#2C1810] text-xs font-bold py-2 rounded-full border border-[#E8D4D0] hover:border-[#E7A9A2] transition-all duration-250 cursor-pointer"
          >
            <MessageCircle size={13} />
            Bargain
          </button>
        </div>

        <BargainModal
          product={product}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          isMobile={isMobile}
          selectedSize={selectedSize}
        />
      </div>
    </div>
  );
};

export default ProductCard;
