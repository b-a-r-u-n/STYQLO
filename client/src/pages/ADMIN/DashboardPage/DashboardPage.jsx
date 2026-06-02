import { Package, Users, TrendingUp, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../features/userSlice';
import { getAllProducts } from '../../../features/productSlice';
import toast from 'react-hot-toast';

const StatCard = ({ icon, label, value, color, bg, trend }) => (
  <div className="bg-white rounded-2xl border border-[#EDD5CF] shadow-[0_2px_16px_rgba(44,24,16,0.06)] p-6 hover:shadow-[0_8px_32px_rgba(200,117,106,0.12)] transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
        <span className={color}>{icon}</span>
      </div>
      {trend && (
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          {trend}
        </span>
      )}
    </div>
    <p className="text-3xl font-bold text-[#2C1810] mb-1">{value}</p>
    <p className="text-sm text-[#9B7B75] font-medium">{label}</p>
  </div>
);

const DashboardPage = () => {
  const { user } = useSelector(state => state.auth);
  const { products } = useSelector(state => state.product);
  const { users } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getAllUsers()).unwrap(),
          dispatch(getAllProducts()).unwrap(),
        ]);
      } catch (error) {
        toast.error(error?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
        <div className="spinner-luxury" />
      </div>
    );
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-[#FBF8F5] p-6 md:p-8">
      {/* Welcome */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#C8756A] mb-1">{greeting}</p>
        <h1 className="text-2xl md:text-3xl font-bold text-[#2C1810]">
          Welcome back, {user?.fullName?.split(' ')[0]} 👋
        </h1>
        <p className="text-[#9B7B75] mt-1 text-sm">Here's an overview of your store today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={<Users size={22} />}
          label="Total Users"
          value={users?.length || 0}
          color="text-[#C8756A]"
          bg="bg-[#F1DBD5]"
          trend="Active"
        />
        <StatCard
          icon={<Package size={22} />}
          label="Total Products"
          value={products?.length || 0}
          color="text-emerald-600"
          bg="bg-emerald-50"
          trend="Listed"
        />
        <StatCard
          icon={<ShoppingBag size={22} />}
          label="In Stock"
          value={products?.filter(p => p.stock > 0)?.length || 0}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <StatCard
          icon={<TrendingUp size={22} />}
          label="Out of Stock"
          value={products?.filter(p => p.stock === 0)?.length || 0}
          color="text-red-500"
          bg="bg-red-50"
        />
      </div>

      {/* Recent Products */}
      {products?.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#EDD5CF] shadow-[0_2px_16px_rgba(44,24,16,0.06)] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-[#2C1810]">Recent Products</h2>
            <span className="text-xs text-[#9B7B75] bg-[#FDF5F3] px-3 py-1 rounded-full border border-[#EDD5CF]">
              Last {Math.min(5, products.length)} added
            </span>
          </div>
          <div className="space-y-3">
            {products.slice(-5).reverse().map((product) => (
              <div key={product._id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#FDF5F3] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#FDF5F3] border border-[#EDD5CF] overflow-hidden flex-shrink-0">
                  <img src={product.images?.[0]?.url} className="w-full h-full object-contain p-1" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#2C1810] truncate">{product.name}</p>
                  <p className="text-xs text-[#9B7B75]">₹{product.discountPrice}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  product.stock > 0
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-red-50 text-red-600'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
