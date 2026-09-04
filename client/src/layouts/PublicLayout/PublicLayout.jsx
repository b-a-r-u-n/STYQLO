import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { AdminRedirect, Footer, Navbar } from "../../components";
import { useSelector } from "react-redux";
import { Sparkles } from "lucide-react";

const PublicLayout = () => {
  const { loading } = useSelector((state) => state.cart);
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
        <div className="text-center">
          <div
            className="flex justify-center items-center mb-2"
          >
            <img
              src="/image/S_logo.png"
              alt="STYQLO"
              className="h-full lg:w-14 md:w-12 w-8 object-contain"
            />
          </div>
          <div className="spinner-luxury mx-auto mb-3" />
          <p className="text-sm text-[#9B7B75] font-medium">
            Loading STYQLO...
          </p>
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
      <ScrollRestoration />
    </div>
  );
};

export default PublicLayout;
