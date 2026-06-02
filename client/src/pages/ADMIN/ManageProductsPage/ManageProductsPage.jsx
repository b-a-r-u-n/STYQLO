import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import { Edit, Plus, Trash2, Package } from 'lucide-react';
import { Badge } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getAllProducts, removeProduct, removeLocalProduct, addLocalProduct } from '../../../features/productSlice';

const ManageProductsPage = () => {
  const navigate = useNavigate();
  const { productsLocal } = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllProducts()).unwrap();
      } catch (error) {
        toast.error(error.message || 'Failed to fetch products.');
      }
    };
    fetchData();
  }, []);

  const handleEdit = (product) => navigate(`/admin/product/${product._id}/edit`);

  const handleRemove = async (product, index) => {
    dispatch(removeLocalProduct(product._id));
    try {
      const result = await dispatch(removeProduct(product._id)).unwrap();
      toast.success(result.message || 'Product removed!');
    } catch (error) {
      toast.error(error?.message || 'Failed to remove product.');
      dispatch(addLocalProduct({ product, index }));
    }
  };

  const sizeOrder = ["S", "M", "L", "XL", "XXL"];
  const getSizeStockMap = (sizes = []) => {
    const map = {};
    sizes.forEach((s) => { map[(s.size || s).toUpperCase()] = s.stock || 0; });
    return map;
  };

  return (
    <div className="min-h-screen bg-[#FBF8F5] p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#C8756A] mb-1">Inventory</p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2C1810]">Manage Products</h1>
        </div>
        <Link to="/admin/add-product">
          <Button variant="primary">
            <Plus size={18} />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-[#EDD5CF] shadow-[0_2px_16px_rgba(44,24,16,0.06)] overflow-hidden">
        {productsLocal?.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-[#F1DBD5] flex items-center justify-center mx-auto mb-4">
              <Package size={28} className="text-[#C8756A]" />
            </div>
            <h3 className="text-base font-bold text-[#2C1810] mb-1">No products yet</h3>
            <p className="text-sm text-[#9B7B75] mb-5">Start by adding your first product</p>
            <Link to="/admin/add-product">
              <Button variant="primary" size="sm">
                <Plus size={16} /> Add Product
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FDF5F3] border-b border-[#EDD5CF]">
                  {["Product", "Discount Price", "Original Price", "Stock", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-[#9B7B75] uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDD5CF]">
                {productsLocal?.map((product, index) => (
                  <tr key={product._id} className="hover:bg-[#FDF5F3] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#FDF5F3] border border-[#EDD5CF] overflow-hidden flex-shrink-0">
                          <img src={product.images[0].url} alt={product.name} className="w-full h-full object-contain p-1" loading="lazy" />
                        </div>
                        <p className="text-sm font-semibold text-[#2C1810] line-clamp-2 max-w-[180px]">{product.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-[#C8756A]">₹{product.discountPrice}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-[#9B7B75] line-through">₹{product.originalPrice}</span>
                    </td>
                    <td className="px-5 py-4">
                      {product?.sizes?.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {sizeOrder.map((size) => {
                            const sizeMap = getSizeStockMap(product.sizes);
                            const stock = sizeMap[size] || 0;
                            return (
                              <Badge key={size} variant={stock > 0 ? "success" : "error"}>
                                {size}: {stock}
                              </Badge>
                            );
                          })}
                        </div>
                      ) : (
                        <Badge variant={product.stock > 20 ? "success" : product.stock > 0 ? "warning" : "error"}>
                          {product.stock} in stock
                        </Badge>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="w-8 h-8 rounded-lg bg-[#F1DBD5] hover:bg-[#C8756A] text-[#C8756A] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleRemove(product, index)}
                          className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProductsPage;
