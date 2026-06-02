import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from '../../components';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addAddress, updateAddress } from '../../features/userSlice';

const EditAndAddAddress = () => {
  const dispatch = useDispatch();
  const { id, addressId } = useParams();
  const navigate = useNavigate();
  const { loading, userLocal } = useSelector(state => state.user);

  const [inputData, setInputData] = useState({
    fullName: "", phoneNumber: "", street: "", city: "", state: "", pinCode: ""
  });

  useEffect(() => {
    const address = userLocal.address.find((add) => add._id === addressId);
    if (addressId && address) {
      setInputData({
        fullName: address.fullName || "",
        phoneNumber: address.phoneNumber || "",
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        pinCode: address.pinCode || "",
      });
    }
  }, [addressId]);

  const handleInputChange = (e) => setInputData({ ...inputData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const result = await dispatch(updateAddress({ formData: inputData, addressId })).unwrap();
      toast.success(result?.message || "Address updated successfully");
      setInputData({ fullName: "", phoneNumber: "", street: "", city: "", state: "", pinCode: "" });
      navigate(`/${id}/profile`);
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Failed to update address");
    }
  };

  const handleAdd = async () => {
    try {
      const result = await dispatch(addAddress(inputData)).unwrap();
      toast.success(result?.message || "Address added successfully");
      setInputData({ fullName: "", phoneNumber: "", street: "", city: "", state: "", pinCode: "" });
      navigate(`/${id}/profile`);
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Failed to add address");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputData.phoneNumber) { toast.error("Phone number is required"); return; }
    if (!inputData.street.trim()) { toast.error("Street address is required"); return; }
    if (!inputData.city.trim()) { toast.error("City is required"); return; }
    if (!inputData.state.trim()) { toast.error("State is required"); return; }
    if (!inputData.pinCode) { toast.error("PIN code is required"); return; }
    if (addressId) handleUpdate();
    else handleAdd();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
        <div className="spinner-luxury" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F5]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(`/${id}/profile`)}
          className="flex items-center gap-2 text-sm text-[#9B7B75] hover:text-[#C8756A] mb-6 transition-colors group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Profile
        </button>

        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C8756A] mb-1">Address</p>
          <h1 className="text-2xl font-bold text-[#2C1810]">
            {addressId ? "Edit Address" : "Add New Address"}
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-[#EDD5CF] shadow-[0_2px_16px_rgba(44,24,16,0.06)] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#F1DBD5] flex items-center justify-center">
              <MapPin size={20} className="text-[#C8756A]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#2C1810]">
                {addressId ? "Update Address" : "New Delivery Address"}
              </h2>
              <p className="text-xs text-[#9B7B75]">Fill in your delivery details</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name" name="fullName" type="text" placeholder="John Doe" value={inputData.fullName} onChange={handleInputChange} />
              <Input label="Phone Number" name="phoneNumber" type="number" placeholder="1234567890" value={inputData.phoneNumber} onChange={handleInputChange} required />
            </div>

            <Input label="Street Address" name="street" type="text" placeholder="123 Main Street, Apartment 4B" value={inputData.street} onChange={handleInputChange} required />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="City" name="city" type="text" placeholder="New Delhi" value={inputData.city} onChange={handleInputChange} required />
              <Input label="State" name="state" type="text" placeholder="Delhi" value={inputData.state} onChange={handleInputChange} required />
              <Input label="PIN Code" name="pinCode" type="number" placeholder="110001" value={inputData.pinCode} onChange={handleInputChange} required />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                variant="primary"
                className="flex-1 justify-center"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (addressId ? "Update Address" : "Save Address")}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(`/${id}/profile`)}
                className="px-6"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAndAddAddress;
