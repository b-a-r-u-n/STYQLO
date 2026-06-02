import { Truck, ShieldCheck, RotateCcw, Star } from "lucide-react";

const features = [
  { icon: <Truck size={20} />, title: "Free Delivery", sub: "On orders above ₹500" },
  { icon: <ShieldCheck size={20} />, title: "Secure Payment", sub: "100% protected" },
  { icon: <RotateCcw size={20} />, title: "Easy Returns", sub: "Hassle-free policy" },
  { icon: <Star size={20} />, title: "Premium Quality", sub: "Curated products" },
];

const FeatureStrip = () => {
  return (
    <div className="mt-4 px-2 w-full max-w-7xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-[#E8D4D0]/60 shadow-[0_4px_24px_rgba(231,169,162,0.06)] px-5 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F1DBD5]/50 flex items-center justify-center text-[#E7A9A2] flex-shrink-0 group-hover:bg-[#E7A9A2] group-hover:text-[#2C1810] transition-all duration-300">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#2C1810] tracking-wide leading-tight">{item.title}</p>
                <p className="text-[11px] text-[#8A6B65] leading-tight mt-0.5 hidden sm:block">{item.sub}</p>
              </div>
              {index < features.length - 1 && (
                <div className="hidden md:block h-8 w-px bg-[#E8D4D0]/60 ml-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureStrip;
