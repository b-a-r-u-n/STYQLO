import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Badge, BargainModal, ProductCarousel } from '../../components';
import { ArrowLeft, MessageCircle, Minus, Plus, RotateCcw, Shield, ShoppingCart, Star, Truck } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../../features/productSlice';
import toast from 'react-hot-toast';
import { addToCart, handleBuy } from '../../features/cartSlice';

const ProductDetailsPage = () => {
  const location = useLocation();
  const { product, loading } = useSelector(state => state.product);
  const { isLoggedIn } = useSelector(state => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sizeOrder = ["S", "M", "L", "XL", "XXL"];
  const [rating] = useState((Math.random() * 1.5 + 3.5).toFixed(1));

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getSingleProduct(id)).unwrap();
      } catch (error) {
        toast.error(error.message || "Failed to fetch product details");
      }
    };
    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleQuantity = (num) => {
    const newQ = quantity + num;
    if (newQ < 1) { toast.error("Minimum quantity is 1"); return; }
    if (newQ > 100) { toast.error("Maximum quantity is 100"); return; }
    setQuantity(newQ);
  };

  const handleAdd = async () => {
    if (!isLoggedIn) {
      toast.error("Please sign in to add items to cart");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (product?.sizes?.length > 0 && !selectedSize) { toast.error("Please select a size"); return; }
    try {
      const result = await dispatch(addToCart({ productId: product?._id, quantity, size: selectedSize })).unwrap();
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
    if (product?.sizes?.length > 0 && !selectedSize) { toast.error("Please select a size before bargaining"); return; }
    setModalOpen(true);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      toast.error("Please sign in to purchase");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (product?.sizes?.length > 0 && !selectedSize) { toast.error("Please select a size"); return; }
    dispatch(handleBuy({ product, quantity, size: selectedSize }));
    navigate("/checkout");
  };

  const getDisplayStock = () => {
    if (!product?.sizes || product?.sizes?.length === 0) return product?.stock;
    if (!selectedSize) return product?.stock;
    const selected = product?.sizes?.find(s => (s.size || s) === selectedSize);
    return selected?.stock ?? 0;
  };

  const displayStock = getDisplayStock();
  const discountPercent = product ? Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-luxury mx-auto mb-4" />
          <p className="text-sm text-[#9B7B75] font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F5]">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {/* Back */}
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-sm text-[#8A6B65] hover:text-[#E7A9A2] mb-6 transition-colors group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Carousel */}
          <ProductCarousel images={product?.images} />

          {/* Details */}
          <div className="space-y-5">
            {/* Title */}
            <div>
              <h1 className="text-2xl md:text-3xl font-medium tracking-wide text-[#2C1810] leading-tight mb-3 font-['Outfit']">
                {product?.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : i < rating ? "text-amber-400 fill-amber-400 opacity-50" : "text-[#E8D4D0]"}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#2C1810]">{rating}</span>
                <span className="text-sm text-[#8A6B65]">(verified)</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-[#FBF8F5] rounded-3xl p-5 border border-[#E8D4D0]/60 shadow-[0_4px_24px_rgba(231,169,162,0.04)]">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-bold text-[#2C1810] font-['Outfit']">₹{product?.discountPrice}</span>
                {product?.originalPrice && (
                  <span className="text-lg text-[#8A6B65] line-through font-light">₹{product?.originalPrice}</span>
                )}
              </div>
              {discountPercent > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="luxury">Save {discountPercent}%</Badge>
                  <span className="text-xs text-[#8A6B65]">Limited time offer</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-[#6E3F39] leading-relaxed text-sm md:text-base font-light">{product?.description}</p>

            {/* Sizes */}
            {product?.sizes?.length > 0 && (
              <div>
                <p className="text-xs font-bold text-[#2C1810] uppercase tracking-wider mb-2.5">
                  Select Size
                  {selectedSize && <span className="ml-2 text-[#E7A9A2] font-semibold">— {selectedSize}</span>}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {[...product.sizes]
                    .sort((a, b) => sizeOrder.indexOf((a.size || a).toUpperCase()) - sizeOrder.indexOf((b.size || b).toUpperCase()))
                    .map((sizeObj, index) => {
                      const size = sizeObj.size || sizeObj;
                      const isOutOfStock = sizeObj.stock === 0;
                      return (
                        <button
                          key={index}
                          disabled={isOutOfStock}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-2xl text-xs font-bold border-2 transition-all duration-200 cursor-pointer
                            ${selectedSize === size
                              ? "bg-[#2C1810] text-white border-[#2C1810] shadow-sm"
                              : "bg-white text-[#2C1810] border-[#E8D4D0] hover:border-[#E7A9A2] hover:text-[#E7A9A2]"
                            }
                            ${isOutOfStock ? "opacity-35 cursor-not-allowed line-through" : ""}`}
                        >
                          {size}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Stock */}
            <div>
              <Badge variant={displayStock > 0 ? 'success' : 'error'}>
                {displayStock > 0
                  ? selectedSize ? `${displayStock} in stock` : `In Stock (${displayStock} available)`
                  : selectedSize ? `${selectedSize} — Out of Stock` : 'Out of Stock'}
              </Badge>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white border-2 border-[#E8D4D0]/80 rounded-full overflow-hidden">
                <button
                  className="px-4 py-3 hover:bg-[#F1DBD5]/50 text-[#2C1810] transition-colors cursor-pointer"
                  onClick={() => handleQuantity(-1)}
                >
                  <Minus size={16} />
                </button>
                <span className="px-5 py-3 text-base font-bold text-[#2C1810] border-x-2 border-[#E8D4D0]/80 min-w-[3rem] text-center font-['Outfit']">
                  {quantity}
                </span>
                <button
                  className="px-4 py-3 hover:bg-[#F1DBD5]/50 text-[#2C1810] transition-colors cursor-pointer"
                  onClick={() => handleQuantity(1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <Button variant="primary" className="flex-1 justify-center py-3.5" onClick={handleAdd}>
                <ShoppingCart size={18} />
                Add to Cart
              </Button>
            </div>

            {/* Buy Now */}
            <Button variant="secondary" className="w-full justify-center py-3.5" size="lg" onClick={handleBuyNow}>
              Buy Now — ₹{product?.discountPrice * quantity}
            </Button>

            {/* Bargain */}
            <button
              onClick={handleBargaining}
              className="w-full flex items-center justify-center gap-2 bg-[#F1DBD5]/40 hover:bg-[#F1DBD5]/70 text-[#2C1810] font-bold py-3.5 rounded-full border-2 border-[#E8D4D0] hover:border-[#E7A9A2] transition-all duration-250 cursor-pointer text-xs"
            >
              <MessageCircle size={18} />
              Make an Offer (Bargain)
            </button>

            {product && (
              <BargainModal
                product={product}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                isMobile={isMobile}
                selectedSize={selectedSize}
              />
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: <Truck size={20} />, label: "Free Shipping", sub: "Above ₹500" },
                { icon: <RotateCcw size={20} />, label: "Easy Returns", sub: "7-day policy" },
                { icon: <Shield size={20} />, label: "Secure Pay", sub: "100% safe" },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="bg-white rounded-2xl border border-[#E8D4D0]/60 p-3.5 text-center shadow-[0_4px_16px_rgba(44,24,16,0.02)]">
                  <div className="w-9 h-9 rounded-xl bg-[#F1DBD5]/60 flex items-center justify-center text-[#E7A9A2] mx-auto mb-2">
                    {icon}
                  </div>
                  <p className="text-xs font-bold text-[#2C1810]">{label}</p>
                  <p className="text-[10px] text-[#8A6B65] mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
