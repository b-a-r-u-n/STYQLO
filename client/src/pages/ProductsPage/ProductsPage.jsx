import React, { useEffect } from 'react';
import { Button, FeatureStrip, ProductCard } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../features/productSlice';
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Sparkles } from 'lucide-react';

const ProductsPage = () => {
  const { products, loading } = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllProducts()).unwrap();
      } catch (error) {
        toast.error(error || "Failed to fetch products");
      }
    };
    fetchData();
  }, []);

  if (loading && !products.length) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-luxury mx-auto mb-4" />
          <p className="text-sm text-[#9B7B75] font-medium">Loading collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F5]">
      {products.length > 0 ? (
        <>
          {/* Hero Carousel */}
          <div className="bg-[#2C1810] pt-4 pb-8">
            <div className="max-w-7xl mx-auto px-4">
              <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                loop
                speed={1000}
                autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                className="rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.25)] border border-white/5"
              >
                {products.slice(-5).reverse().map((product) => (
                  <SwiperSlide key={product._id}>
                    <div className="relative w-full h-[240px] md:h-[400px] lg:h-[460px] bg-gradient-to-r from-[#2C1810] via-[#3D2418] to-[#5C322A] overflow-hidden">
                      {/* Background image */}
                      <img
                        src={product?.images?.[0]?.url}
                        className="absolute right-0 top-0 h-full w-1/2 md:w-2/5 object-contain object-right opacity-95"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2C1810] via-[#2C1810]/85 to-transparent" />

                      {/* Decorative glow */}
                      <div className="absolute right-1/3 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#E7A9A2]/15 rounded-full blur-3xl" />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-16 max-w-xl">
                        {/* Badges */}
                        <div className="flex items-center gap-2 mb-3 md:mb-4">
                          <span className="bg-[#E7A9A2] text-[#2C1810] text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm tracking-wider">
                            <Sparkles size={11} /> NEW ARRIVAL
                          </span>
                          <span className="bg-white/10 backdrop-blur-sm text-white text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full border border-white/10 tracking-wide">
                            {Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100)}% OFF
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide leading-tight mb-2 md:mb-3 line-clamp-2 font-['Outfit']">
                          {product.name}
                        </h2>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-4 md:mb-6">
                          <span className="text-lg md:text-2xl font-bold text-[#E7A9A2] font-['Outfit']">
                            ₹{product.discountPrice}
                          </span>
                          <span className="text-xs md:text-base text-white/40 line-through font-light">
                            ₹{product.originalPrice}
                          </span>
                        </div>

                        {/* CTA */}
                        <Link to={`/product/${product._id}`}>
                          <button className="inline-flex items-center gap-2 bg-[#E7A9A2] hover:bg-[#E29A8F] text-[#2C1810] text-xs md:text-sm font-bold px-6 md:px-8 py-3 md:py-3.5 rounded-full shadow-[0_4px_16px_rgba(231,169,162,0.35)] hover:shadow-[0_8px_24px_rgba(231,169,162,0.5)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                            Shop Now <ArrowRight size={14} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Feature Strip */}
              <FeatureStrip />
            </div>
          </div>

          {/* Products Section */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#E7A9A2] mb-1">Our Collection</p>
                <h2 className="text-2xl md:text-3xl font-medium tracking-wide text-[#2C1810] font-['Outfit']">All Products</h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8A6B65] uppercase tracking-wider">
                <Package size={14} />
                <span>{products.length} items</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[#E7A9A2]/30 via-[#E8D4D0] to-transparent mb-8" />

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 rounded-3xl bg-[#F1DBD5]/50 flex items-center justify-center mx-auto mb-5 border border-[#E8D4D0]/60">
              <Package size={36} className="text-[#E7A9A2]" />
            </div>
            <h2 className="text-2xl font-semibold text-[#2C1810] mb-2 font-['Outfit']">No Products Yet</h2>
            <p className="text-[#8A6B65] mb-6 leading-relaxed text-sm">
              Our collection is being curated. Check back soon for premium products.
            </p>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
