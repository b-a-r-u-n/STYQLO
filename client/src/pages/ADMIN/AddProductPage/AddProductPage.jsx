import React, { useRef, useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { Input } from '../../../components';
import { Upload, X, ImagePlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../../features/productSlice';
import { nanoid } from '@reduxjs/toolkit';

const AddProductPage = () => {
  const { loading } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const imageRef = useRef();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [inputData, setInputData] = useState({
    name: "", description: "", discountPrice: 0, originalPrice: 0, stock: 0, size: ""
  });

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const handleInputChange = (e) => setInputData({ ...inputData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (images.length + files.length > 5) { toast.error("Maximum 5 images allowed"); return; }
    setImages((prev) => [...prev, ...files]);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previewUrls]);
    e.target.value = null;
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images || images.length === 0) { toast.error("At least one image is required"); return; }
    if (!inputData.name.trim()) { toast.error("Product name is required"); return; }
    if (!inputData.description.trim()) { toast.error("Description is required"); return; }
    if (!inputData.discountPrice || inputData.discountPrice <= 0) { toast.error("Discount price must be greater than zero"); return; }
    if (!inputData.originalPrice || inputData.originalPrice <= 0) { toast.error("Original price must be greater than zero"); return; }
    if (Number(inputData.discountPrice) > Number(inputData.originalPrice)) { toast.error("Discount price cannot exceed original price"); return; }
    if (!Number(inputData.stock) || Number(inputData.stock) <= 0) { toast.error("Stock must be greater than zero"); return; }

    const formData = new FormData();
    formData.append("inputData", JSON.stringify(inputData));
    images.forEach((img) => formData.append("images", img));

    try {
      const result = await dispatch(addProduct(formData)).unwrap();
      toast.success(result.message || "Product added successfully!");
      setImages([]); setPreviewImages([]);
      setInputData({ name: "", description: "", discountPrice: 0, originalPrice: 0, stock: 0, size: "" });
    } catch (error) {
      toast.error(error?.message || "Failed to add product.");
      setImages([]); setPreviewImages([]);
      setInputData({ name: "", description: "", discountPrice: 0, originalPrice: 0, stock: 0, size: "" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F5] p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C8756A] mb-1">Inventory</p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2C1810]">Add New Product</h1>
        </div>

        <div className="bg-white rounded-2xl border border-[#EDD5CF] shadow-[0_2px_16px_rgba(44,24,16,0.06)] p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-bold text-[#2C1810] mb-3">
                Product Images <span className="text-[#9B7B75] font-normal">(max 5)</span>
              </label>

              {/* Drop Zone */}
              <div
                onClick={() => imageRef.current.click()}
                className="border-2 border-dashed border-[#EDD5CF] rounded-2xl p-10 text-center hover:border-[#C8756A] hover:bg-[#FDF5F3] transition-all duration-200 cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F1DBD5] group-hover:bg-[#C8756A] flex items-center justify-center mx-auto mb-3 transition-all duration-200">
                  <ImagePlus size={24} className="text-[#C8756A] group-hover:text-white transition-colors" />
                </div>
                <p className="text-sm font-semibold text-[#2C1810] mb-1">Click to upload images</p>
                <p className="text-xs text-[#9B7B75]">PNG, JPG up to 5 images</p>
              </div>

              {/* Preview Grid */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
                  {previewImages.map((src, index) => (
                    <div key={nanoid()} className="relative group rounded-xl overflow-hidden border border-[#EDD5CF] bg-[#FDF5F3] aspect-square">
                      <img src={src} className="w-full h-full object-contain p-2" loading="lazy" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <input type="file" accept="image/*" name="images" ref={imageRef} className="hidden" multiple onChange={handleImageChange} />
            </div>

            {/* Product Name */}
            <Input label="Product Name" type="text" name="name" placeholder="Enter product name" required value={inputData.name} onChange={handleInputChange} />

            {/* Prices */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="Discount Price (₹)" type="number" name="discountPrice" placeholder="0" step="0.01" required value={inputData.discountPrice} onChange={handleInputChange} />
              <Input label="Original Price (₹)" type="number" name="originalPrice" placeholder="0" step="0.01" value={inputData.originalPrice} onChange={handleInputChange} />
            </div>

            {/* Stock + Size */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="Stock Quantity" type="number" name="stock" placeholder="0" required value={inputData.stock} onChange={handleInputChange} />
              <div>
                <label className="block text-sm font-bold text-[#2C1810] mb-2">Size</label>
                <select
                  name="size"
                  className="w-full px-4 py-3 bg-[#FDF5F3] border border-[#EDD5CF] rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#C8756A]/30 focus:border-[#C8756A] transition-all"
                  value={inputData.size}
                  onChange={handleInputChange}
                >
                  <option value="">No Size</option>
                  {sizeOptions.map((size) => (
                    <option value={size} key={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-[#2C1810] mb-2">Description</label>
              <textarea
                name="description"
                rows={4}
                placeholder="Describe your product..."
                className="w-full px-4 py-3 bg-[#FDF5F3] border border-[#EDD5CF] rounded-xl text-[#2C1810] placeholder-[#C4A09A] focus:outline-none focus:ring-2 focus:ring-[#C8756A]/30 focus:border-[#C8756A] transition-all resize-none"
                required
                value={inputData.description}
                onChange={handleInputChange}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" className="flex-1 justify-center" size="lg" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Upload size={18} /> Add Product
                  </span>
                )}
              </Button>
              <Button type="button" variant="ghost" onClick={() => navigate('/admin/products')} className="px-6">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
