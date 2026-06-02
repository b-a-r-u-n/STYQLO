import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminRedirect, Footer, Navbar } from '../../components';
import { useSelector } from 'react-redux';
import { Sparkles } from 'lucide-react';

const PublicLayout = () => {
  const { loading } = useSelector(state => state.cart);
  const { loading: authLoading } = useSelector(state => state.auth);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C8756A] to-[#D4A398] flex items-center justify-center mx-auto mb-4 shadow-[0_8px_32px_rgba(200,117,106,0.35)] animate-pulse">
            <Sparkles size={28} className="text-white" />
          </div>
          <div className="spinner-luxury mx-auto mb-3" />
          <p className="text-sm text-[#9B7B75] font-medium">Loading STYQLO...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF8F5]">
      <AdminRedirect />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
