import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductCarousel = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [paused, images.length]);

  if (!images.length) return (
    <div className="bg-[#FBF8F5] rounded-3xl h-96 flex items-center justify-center text-[#8A6B65]">
      No images available
    </div>
  );

  return (
    <div
      className="bg-white rounded-3xl border border-[#E8D4D0]/60 shadow-[0_4px_20px_rgba(44,24,16,0.04)] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main Image */}
      <div className="relative bg-[#FBF8F5] h-80 md:h-96 lg:h-[420px] overflow-hidden">
        <img
          src={images[current]?.url}
          alt="product"
          className="w-full h-full object-contain p-6 transition-all duration-700"
          loading="lazy"
        />

        {/* Nav Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent(current === 0 ? images.length - 1 : current - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-[#E8D4D0]/60 flex items-center justify-center text-[#2C1810] hover:text-[#E7A9A2] hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrent(current === images.length - 1 ? 0 : current + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-[#E8D4D0]/60 flex items-center justify-center text-[#2C1810] hover:text-[#E7A9A2] hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  current === index
                    ? "w-4 h-2 bg-[#E7A9A2]"
                    : "w-2 h-2 bg-[#D4A398]/50 hover:bg-[#E7A9A2]"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2.5 p-4 overflow-x-auto border-t border-[#E8D4D0]/30 bg-[#FBF8F5]/30">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all duration-350 cursor-pointer bg-[#FBF8F5] ${
                current === index
                  ? "border-[#E7A9A2] shadow-[0_0_0_2px_rgba(231,169,162,0.2)]"
                  : "border-[#E8D4D0]/60 hover:border-[#D4A398]"
              }`}
            >
              <img
                src={img.url}
                className="w-full h-full object-contain p-1"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
