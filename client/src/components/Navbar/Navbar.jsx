import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart, User, LogOut, Plus, LayoutDashboard,
  Package, Users, Sparkles, Menu, X
} from "lucide-react";
import { Button } from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../features/authSlice";
import toast from "react-hot-toast";

function Navbar() {
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const { cartData } = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/add-product', label: 'Add Product', icon: Plus },
    { path: '/admin/products', label: 'Manage Products', icon: Package },
    { path: '/admin/users', label: 'Manage Users', icon: Users },
  ];

  const handleLogout = async () => {
    setShowUserMenu(false);
    setMobileOpen(false);
    try {
      const result = await dispatch(logOutUser()).unwrap();
      toast.success(result.message || "Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Log out failed");
    }
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(44,24,16,0.06)] border-b border-[#E8D4D0]/60"
            : "bg-white/80 backdrop-blur-md border-b border-[#E8D4D0]/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E7A9A2] to-[#D4A398] flex items-center justify-center shadow-[0_4px_12px_rgba(231,169,162,0.25)] group-hover:shadow-[0_6px_20px_rgba(231,169,162,0.4)] transition-all duration-300">
                <Sparkles size={18} className="text-[#2C1810]" />
              </div>
              <span className="text-xl font-semibold text-[#2C1810] tracking-wider font-['Outfit']">
                STY<span className="text-[#E7A9A2] font-bold">QLO</span>
              </span>
            </Link>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  {!user?.isAdmin && (
                    <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-[#F1DBD5]/50 transition-all duration-250 group">
                      <ShoppingCart size={22} className="text-[#2C1810] group-hover:text-[#E7A9A2] transition-colors" />
                      {cartData?.length > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 bg-[#E7A9A2] text-[#2C1810] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm border border-white">
                          {cartData.length > 9 ? '9+' : cartData.length}
                        </span>
                      )}
                    </Link>
                  )}

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-full hover:bg-[#F1DBD5]/50 transition-all duration-250 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E7A9A2] to-[#D4A398] flex items-center justify-center text-[#2C1810] text-xs font-bold shadow-sm">
                        {user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <span className="hidden sm:block text-sm font-semibold text-[#2C1810] max-w-[120px] truncate">
                        {user?.fullName?.split(' ')[0]}
                      </span>
                    </button>

                    {showUserMenu && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-3xl shadow-[0_12px_36px_rgba(44,24,16,0.08)] border border-[#E8D4D0] z-50 overflow-hidden animate-fade-in-up">
                          <div className="px-4 py-3 border-b border-[#F1DBD5]/60 bg-[#FBF8F5]">
                            <p className="text-[10px] text-[#8A6B65] font-bold uppercase tracking-wider">Signed in as</p>
                            <p className="text-sm font-semibold text-[#2C1810] truncate">{user?.fullName}</p>
                          </div>

                          <div className="py-1.5">
                            <NavLink
                              onClick={() => setShowUserMenu(false)}
                              to={`${user?.isAdmin ? `/admin/${user?._id}/profile` : `/${user?._id}/profile`}`}
                              className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                                  isActive
                                    ? 'bg-[#F1DBD5]/60 text-[#2C1810] font-semibold'
                                    : 'text-[#2C1810] hover:bg-[#FBF8F5] hover:text-[#E7A9A2]'
                                }`
                              }
                            >
                              <User size={16} />
                              <span>My Profile</span>
                            </NavLink>

                            {user?.isAdmin && menuItems.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  onClick={() => setShowUserMenu(false)}
                                  key={item.path}
                                  to={item.path}
                                  className="lg:hidden flex items-center gap-3 px-4 py-2.5 text-sm text-[#2C1810] hover:bg-[#FBF8F5] hover:text-[#E7A9A2] transition-colors"
                                >
                                  <Icon size={16} />
                                  <span>{item.label}</span>
                                </Link>
                              );
                            })}
                          </div>

                          <div className="border-t border-[#F1DBD5]/60 py-1.5 bg-[#FBF8F5]/50">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50/50 transition-colors"
                            >
                              <LogOut size={16} />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="text-[#2C1810]">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="primary" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile: cart + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              {isLoggedIn && !user?.isAdmin && (
                <Link to="/cart" className="relative p-2 rounded-full hover:bg-[#F1DBD5]/50 transition-colors">
                  <ShoppingCart size={22} className="text-[#2C1810]" />
                  {cartData?.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-[#E7A9A2] text-[#2C1810] text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                      {cartData.length}
                    </span>
                  )}
                </Link>
              )}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-full hover:bg-[#F1DBD5]/50 transition-colors text-[#2C1810]"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#E8D4D0] bg-white/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-1">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-[#FBF8F5] rounded-2xl border border-[#E8D4D0]/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E7A9A2] to-[#D4A398] flex items-center justify-center text-[#2C1810] text-sm font-bold">
                      {user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#2C1810]">{user?.fullName}</p>
                      <p className="text-xs text-[#8A6B65]">{user?.email}</p>
                    </div>
                  </div>

                  <Link
                    to={`${user?.isAdmin ? `/admin/${user?._id}/profile` : `/${user?._id}/profile`}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm text-[#2C1810] hover:bg-[#F1DBD5]/50 hover:text-[#2C1810] transition-colors"
                  >
                    <User size={18} />
                    <span>My Profile</span>
                  </Link>

                  {user?.isAdmin && menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm text-[#2C1810] hover:bg-[#F1DBD5]/50 hover:text-[#2C1810] transition-colors"
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm text-red-500 hover:bg-red-50/50 transition-colors mt-2"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full justify-center">Sign In</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)}>
                    <Button variant="primary" className="w-full justify-center">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
