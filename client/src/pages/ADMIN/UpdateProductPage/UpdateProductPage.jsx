import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ImagePlus, X, Upload } from 'lucide-react';
import { Input, Button } from '../../../components';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getSingleProduct, updateProduct } from '../../../features/productSlice';

const UpdateProductPage = () => {
  const { loading, product, selectedSize } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef();

  const [inputData, setInputData] = useState({
    name: "", description: "", discountPrice: "", originalPrice: "", stock: "", size: "",
    sku: "", hsn: "", tax: "", star: "", length: "", breadth: "", height: "", weight: ""
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getSingleProduct(id)).unwrap();
      } catch (error) {
        toast.error(error.message || 'Failed to fetch product.');
      }
    };
    if (id) fetchData();
  }, []);

  useEffect(() => {
    if (product) {
      const currentData = product.sizes.filter((item) => item?.size === selectedSize )          

      setInputData({
        name: product?.name || "",
        description: product?.description || "",
        discountPrice: product?.discountPrice || "",
        originalPrice: product?.originalPrice || "",
        stock: currentData[0]?.stock || "",
        size: currentData[0]?.size || selectedSize || "",
        sku: currentData[0]?.sku,
        hsn: product?.hsn || "",
        tax: product?.tax || "",
        star: product?.star || "",
        length: product?.length || "",
        breadth: product?.breadth || "",
        height: product?.height || "",
        weight: product?.weight || ""
      });
      setPreviewImages(product?.images?.map((img) => ({ type: "old", url: img.url, publicId: img.publicId })));
    }
  }, [product, selectedSize]);

  const handleInputChange = (e) => setInputData({ ...inputData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (previewImages.length + files.length > 5) { toast.error("Maximum 5 images allowed"); return; }
    const newImages = files.map((file) => ({ type: "new", file, url: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...newImages]);
    e.target.value = null;
  };

  const removeImage = (index, image) => {
    if (image.type === "old") setRemovedImages((prev) => [...prev, image]);
    if (image.type === "new") setImages((prev) => prev.filter((file) => file !== image.file));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (previewImages.length === 0 && images.length === 0) { toast.error("At least one image is required"); return; }
    if (!inputData.name.trim()) { toast.error("Product name is required"); return; }
    if (!inputData.description.trim()) { toast.error("Description is required"); return; }
    if (!inputData.discountPrice || inputData.discountPrice <= 0) { toast.error("Discount price must be greater than zero"); return; }
    if (!inputData.originalPrice || inputData.originalPrice <= 0) { toast.error("Original price must be greater than zero"); return; }
    if (!inputData.stock || inputData.stock <= 0) { toast.error("Stock must be greater than zero"); return; }

    const formData = new FormData();
    formData.append("inputData", JSON.stringify(inputData));
    images.forEach((img) => formData.append("images", img));
    formData.append("removedImages", JSON.stringify(removedImages));

    // console.log(inputData);
    
    setIsLoading(true);
    try {
      const result = await dispatch(updateProduct({ formData, productId: id })).unwrap();
      toast.success(result.message || "Product updated!");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.message || "Failed to update product.");
      navigate("/admin/products");
    } finally {
      setIsLoading(false);
    }
  };  

  if (loading && !product) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
        <div className="spinner-luxury" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F5] p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => navigate('/admin/products')}
          className="flex items-center gap-2 text-sm text-[#9B7B75] hover:text-[#C8756A] mb-6 transition-colors group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Products
        </button>

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C8756A] mb-1">Inventory</p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2C1810]">Update Product</h1>
        </div>

        <div className="bg-white rounded-2xl border border-[#EDD5CF] shadow-[0_2px_16px_rgba(44,24,16,0.06)] p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Images */}
            <div>
              <label className="block text-sm font-bold text-[#2C1810] mb-3">
                Product Images <span className="text-[#9B7B75] font-normal">(max 5)</span>
              </label>
              <div
                onClick={() => imageRef.current.click()}
                className="border-2 border-dashed border-[#EDD5CF] rounded-2xl p-8 text-center hover:border-[#C8756A] hover:bg-[#FDF5F3] transition-all duration-200 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F1DBD5] group-hover:bg-[#C8756A] flex items-center justify-center mx-auto mb-2 transition-all duration-200">
                  <ImagePlus size={22} className="text-[#C8756A] group-hover:text-white transition-colors" />
                </div>
                <p className="text-sm font-semibold text-[#2C1810]">Click to add more images</p>
                <p className="text-xs text-[#9B7B75] mt-0.5">PNG, JPG</p>
              </div>

              {previewImages?.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
                  {previewImages.map((image, index) => (
                    <div key={nanoid()} className="relative group rounded-xl overflow-hidden border border-[#EDD5CF] bg-[#FDF5F3] aspect-square">
                      <img src={image.url || image} className="w-full h-full object-contain p-2" loading="lazy" />
                      <button
                        type="button"
                        onClick={() => removeImage(index, image)}
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

            <Input label="Product Name" type="text" name="name" placeholder="Enter product name" required value={inputData?.name} onChange={handleInputChange} />

            <div className="grid grid-cols-2 gap-4">
              <Input label="Discount Price (₹)" type="number" name="discountPrice" placeholder="0" step="0.01" required value={inputData?.discountPrice} onChange={handleInputChange} />
              <Input label="Original Price (₹)" type="number" name="originalPrice" placeholder="0" step="0.01" value={inputData?.originalPrice} onChange={handleInputChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Stock Quantity" type="number" name="stock" placeholder="0" required value={inputData.stock} onChange={handleInputChange} />
              <Input label="Size" type="text" name="size" placeholder="e.g. XL" required value={inputData.size} disabled={inputData.size ? true : false} className='disabled:cursor-not-allowed' />
              
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input label="SKU" type="text" name="sku" placeholder="e.g. STYQLO-TSHIRT-001" required value={inputData.sku} 
              onChange={handleInputChange} disabled={loading} className='disabled:cursor-not-allowed' />
              <Input label="HSN" type="number" name="hsn" placeholder="e.g. 6109" step="1" value={inputData.hsn} onChange={handleInputChange} disabled={inputData.size ? true : false} className='disabled:cursor-not-allowed' />
            </div>

            {/* tax + star */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="Tax (%)" type="number" name="tax" placeholder="e.g. 18" step="1" required value={inputData.tax} onChange={handleInputChange} disabled={loading} className='disabled:cursor-not-allowed' />
              <Input label="Review Rating" type="number" name="star" placeholder="e.g. 4.5 (1–5)" step="0.1" value={inputData.star} onChange={handleInputChange} disabled={loading} className='disabled:cursor-not-allowed' />
            </div>

            {/* Length + Breadth */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="Length (cm)" type="number" name="length" placeholder="e.g. 30" step="0.1" required value={inputData.length} onChange={handleInputChange} disabled={loading} className='disabled:cursor-not-allowed' />
              <Input label="Breadth (cm)" type="number" name="breadth" placeholder="e.g. 20" step="0.1" value={inputData.breadth} onChange={handleInputChange} disabled={loading} className='disabled:cursor-not-allowed' />
            </div>

            {/* Height + Weight */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="Height (cm)" type="number" name="height" placeholder="e.g. 15" step="0.1" required value={inputData.height} onChange={handleInputChange} disabled={loading} className='disabled:cursor-not-allowed' />
              <Input label="Weight (kg)" type="number" name="weight" placeholder="e.g. 0.5" step="0.1" value={inputData.weight} onChange={handleInputChange} disabled={loading} className='disabled:cursor-not-allowed' />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#2C1810] mb-2">Description</label>
              <textarea
                name="description"
                rows={4}
                placeholder="Describe your product..."
                className="w-full px-4 py-3 bg-[#FDF5F3] border border-[#EDD5CF] rounded-xl text-[#2C1810] placeholder-[#C4A09A] focus:outline-none focus:ring-2 focus:ring-[#C8756A]/30 focus:border-[#C8756A] transition-all resize-none"
                required
                value={inputData?.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" className="flex-1 justify-center" size="lg" disabled={loading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Upload size={18} /> Update Product
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

export default UpdateProductPage;
