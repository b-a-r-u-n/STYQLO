import { LayoutDashboard, Package, Plus, Sparkles, Users } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/add-product', label: 'Add Product', icon: Plus },
    { path: '/admin/products', label: 'Manage Products', icon: Package },
    { path: '/admin/users', label: 'Manage Users', icon: Users },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#E8D4D0] min-h-screen flex-shrink-0 shadow-[2px_0_16px_rgba(44,24,16,0.02)]">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-[#E8D4D0]/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E7A9A2] to-[#D4A398] flex items-center justify-center shadow-sm">
            <Sparkles size={15} className="text-[#2C1810]" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A6B65]">Admin Panel</p>
            <p className="text-sm font-bold text-[#2C1810] font-['Outfit']">STYQLO</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-5 space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4A398] px-3 mb-3">Navigation</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? 'bg-[#F1DBD5]/60 text-[#2C1810] font-semibold shadow-[0_4px_12px_rgba(231,169,162,0.15)]'
                  : 'text-[#8A6B65] hover:bg-[#FBF8F5] hover:text-[#2C1810]'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-[#E7A9A2] text-[#2C1810] shadow-sm'
                  : 'bg-[#FBF8F5] text-[#8A6B65] group-hover:bg-[#F1DBD5]/60 group-hover:text-[#E7A9A2]'
              }`}>
                <Icon size={16} />
              </div>
              <span className="text-sm">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E7A9A2]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#E8D4D0]/60">
        <div className="bg-[#FBF8F5] rounded-2xl p-3 text-center border border-[#E8D4D0]/30">
          <p className="text-xs text-[#8A6B65] font-semibold">STYQLO Admin</p>
          <p className="text-[10px] text-[#D4A398] mt-0.5 font-light">v1.0.0</p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
