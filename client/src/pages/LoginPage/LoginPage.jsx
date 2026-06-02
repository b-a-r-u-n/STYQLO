import React, { useState } from 'react';
import { Input } from '../../components';
import { Button } from '../../components/Button/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { logInUser } from '../../features/authSlice';
import { Sparkles, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) { toast.error("Email is required"); return; }
    if (!formData.password.trim()) { toast.error("Password is required"); return; }

    setLoading(true);
    try {
      const result = await dispatch(logInUser(formData)).unwrap();
      if (result?.data?.isAdmin) navigate("/admin");
      else navigate(location.state?.from || "/products");
      toast.success(result.message || "Welcome back!");
      setFormData({ email: "", password: "" });
    } catch (error) {
      toast.error(error?.message || "Sign in failed");
      setFormData({ email: "", password: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F5] flex">
      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2C1810] via-[#3D2418] to-[#5C322A] flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-1/4 -left-16 w-64 h-64 rounded-full bg-[#E7A9A2]/15 blur-3xl" />
        <div className="absolute bottom-1/4 -right-16 w-64 h-64 rounded-full bg-[#D4A398]/15 blur-3xl" />

        <div className="relative z-10 text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E7A9A2] to-[#D4A398] flex items-center justify-center mx-auto mb-6 shadow-[0_8px_32px_rgba(231,169,162,0.3)]">
            <Sparkles size={28} className="text-[#2C1810]" />
          </div>
          <h2 className="text-3xl font-medium tracking-wide text-white mb-3 leading-tight font-['Outfit']">
            Welcome to<br />STYQLO
          </h2>
          <p className="text-[#D4A398] leading-relaxed text-sm font-light">
            Your curated destination for premium local products. Quality, elegance, and trust — delivered to your door.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 text-left">
            {[
              { emoji: "✨", title: "Premium Quality", desc: "Curated products" },
              { emoji: "🚚", title: "Fast Delivery", desc: "Free above ₹500" },
              { emoji: "🔒", title: "Secure Orders", desc: "Via WhatsApp" },
              { emoji: "💬", title: "Bargain Deals", desc: "Negotiate prices" },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                <span className="text-lg">{emoji}</span>
                <p className="text-white text-xs font-bold mt-1.5 font-['Outfit']">{title}</p>
                <p className="text-[#D4A398] text-[10px] mt-0.5 font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E7A9A2] to-[#D4A398] flex items-center justify-center shadow-lg">
              <Sparkles size={20} className="text-[#2C1810]" />
            </div>
            <span className="text-2xl font-bold tracking-wider text-[#2C1810] font-['Outfit']">Local<span className="text-[#E7A9A2]">Kart</span></span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-medium tracking-wide text-[#2C1810] mb-2 font-['Outfit']">Sign In</h1>
            <p className="text-[#8A6B65]">Welcome back! Enter your details to continue.</p>
          </div>

          <div className="bg-white rounded-3xl border border-[#E8D4D0]/60 shadow-[0_12px_48px_rgba(44,24,16,0.04)] p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                name="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                name="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#E8D4D0] accent-[#E7A9A2]"
                  />
                  <span className="text-sm text-[#8A6B65]">Remember me</span>
                </label>
                <button type="button" className="text-sm text-[#E7A9A2] hover:text-[#E29A8F] font-medium cursor-not-allowed opacity-60">
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center py-3.5"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#2C1810] border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In <ArrowRight size={18} />
                  </span>
                )}
              </Button>

              <p className="text-center text-sm text-[#8A6B65]">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#E7A9A2] hover:text-[#E29A8F] font-semibold">
                  Create one
                </Link>
              </p>
            </form>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-[#8A6B65] hover:text-[#E7A9A2] transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
