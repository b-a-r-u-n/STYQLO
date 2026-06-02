import React, { useState } from 'react';
import { Input } from '../../components';
import { Button } from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/authSlice';
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "", email: "", password: "", confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) { toast.error("Full name is required"); return; }
    if (!formData.email.trim()) { toast.error("Email is required"); return; }
    if (!formData.password.trim()) { toast.error("Password is required"); return; }
    if (formData.password.trim().length < 6) { toast.error("Password must be at least 6 characters"); return; }
    if (!formData.confirmPassword.trim()) { toast.error("Please confirm your password"); return; }
    if (formData.password.trim() !== formData.confirmPassword.trim()) { toast.error("Passwords do not match"); return; }

    setLoading(true);
    try {
      const response = await dispatch(registerUser(formData)).unwrap();
      navigate("/login");
      toast.success(response.message || "Account created successfully!");
      setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error?.message || "Sign up failed");
      setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
    } finally {
      setLoading(false);
    }
  };

  const perks = [
    "Access to exclusive deals",
    "Bargain on any product",
    "Fast WhatsApp checkout",
    "Save multiple addresses",
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F5] flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2C1810] via-[#3D2418] to-[#5C322A] flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-1/4 -left-16 w-64 h-64 rounded-full bg-[#E7A9A2]/15 blur-3xl" />
        <div className="absolute bottom-1/4 -right-16 w-64 h-64 rounded-full bg-[#D4A398]/15 blur-3xl" />

        <div className="relative z-10 text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E7A9A2] to-[#D4A398] flex items-center justify-center mx-auto mb-6 shadow-[0_8px_32px_rgba(231,169,162,0.3)]">
            <Sparkles size={28} className="text-[#2C1810]" />
          </div>
          <h2 className="text-3xl font-medium tracking-wide text-white mb-3 leading-tight font-['Outfit']">
            Join LocalKart<br />Today
          </h2>
          <p className="text-[#D4A398] leading-relaxed text-sm mb-8 font-light">
            Create your account and start exploring premium local products at the best prices.
          </p>

          <div className="space-y-3 text-left">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#F1DBD5]/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={13} className="text-[#E7A9A2]" />
                </div>
                <span className="text-[#D4A398] text-sm font-light">{perk}</span>
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
            <h1 className="text-3xl font-medium tracking-wide text-[#2C1810] mb-2 font-['Outfit']">Create Account</h1>
            <p className="text-[#8A6B65]">Join thousands of happy shoppers today.</p>
          </div>

          <div className="bg-white rounded-3xl border border-[#E8D4D0]/60 shadow-[0_12px_48px_rgba(44,24,16,0.04)] p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                placeholder="John Doe"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Min. 6 characters"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Repeat your password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 rounded border-[#E8D4D0] accent-[#E7A9A2]"
                  required
                />
                <span className="text-sm text-[#8A6B65] leading-relaxed">
                  I agree to the{' '}
                  <a href="#" className="text-[#E7A9A2] hover:text-[#E29A8F] font-semibold">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#E7A9A2] hover:text-[#E29A8F] font-semibold">Privacy Policy</a>
                </span>
              </label>

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
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account <ArrowRight size={18} />
                  </span>
                )}
              </Button>

              <p className="text-center text-sm text-[#8A6B65]">
                Already have an account?{' '}
                <Link to="/login" className="text-[#E7A9A2] hover:text-[#E29A8F] font-semibold">
                  Sign in
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

export default SignupPage;
