import { Mail, MapPin, Phone, Sparkles, Heart } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2C1810] text-white mt-auto">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-[#C8756A] via-[#D4A398] to-[#C8756A]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C8756A] to-[#D4A398] flex items-center justify-center shadow-lg flex-shrink-0">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Local<span className="text-[#D4A398]">Kart</span>
              </span>
            </div>
            <p className="text-[#C4A09A] text-sm leading-relaxed mb-5">
              Your curated destination for premium local products. Quality, elegance, and trust — delivered to your door.
            </p>
            {/* Social icons using inline SVGs to avoid lucide version issues */}
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#C8756A] flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#C8756A] flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4A398] mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/products", label: "All Products" },
                { to: "/categories", label: "Categories" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[#C4A09A] hover:text-white text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4A398] mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/help-center", label: "Help Center" },
                { to: "/track-order", label: "Track Order" },
                { to: "/returns-refunds", label: "Returns & Refunds" },
                { to: "/shipping-info", label: "Shipping Info" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[#C4A09A] hover:text-white text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4A398] mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[#C4A09A]">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-[#D4A398]" />
                <span>New Delhi, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#C4A09A]">
                <Phone size={15} className="flex-shrink-0 text-[#D4A398]" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#C4A09A]">
                <Mail size={15} className="flex-shrink-0 text-[#D4A398]" />
                <span>support@localkart.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#9B7B75] flex items-center gap-1.5">
            &copy; {new Date().getFullYear()} LocalKart. Made with{' '}
            <Heart size={12} className="text-[#C8756A] fill-[#C8756A]" />
            {' '}in India
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a key={item} href="#" className="text-xs text-[#9B7B75] hover:text-[#D4A398] transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
