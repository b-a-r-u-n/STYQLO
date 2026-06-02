import React, { useState } from 'react';
import { Modal } from '@mantine/core';
import Input from '../Input/Input';
import { Button } from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { updateUser } from '../../features/userSlice';
import { User, X } from 'lucide-react';

const ProfileEditModal = ({ modalOpen, setModalOpen, isMobile }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.user);

  const [inputData, setInputData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
  });

  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.fullName.trim()) { toast.error("Full Name is required"); return; }
    if (!inputData.email.trim()) { toast.error("Email is required"); return; }
    if (!inputData.phoneNumber) { toast.error("Phone number is required"); return; }
    try {
      const result = await dispatch(updateUser({ formData: inputData, userId: user._id })).unwrap();
      setModalOpen(false);
      toast.success(result.message || "Profile updated successfully");
    } catch (error) {
      toast.error(error?.message || "Failed to update profile");
    }
  };

  return (
    <Modal
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
      overlayProps={{ backgroundOpacity: 0.4, blur: 8 }}
      size={isMobile ? "100%" : "480px"}
      withCloseButton={false}
      styles={{
        content: {
          background: '#FFFFFF',
          border: '1px solid #E8D4D0',
          boxShadow: '0 24px 64px rgba(44, 24, 16, 0.08)',
          borderRadius: '32px',
        },
        body: { padding: 0 },
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F1DBD5]/60 flex items-center justify-center">
              <User size={18} className="text-[#E7A9A2]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#2C1810] font-['Outfit']">Edit Profile</h2>
              <p className="text-xs text-[#8A6B65]">Update your personal information</p>
            </div>
          </div>
          <button
            onClick={() => setModalOpen(false)}
            className="w-8 h-8 rounded-full bg-[#FBF8F5] hover:bg-[#F1DBD5]/50 flex items-center justify-center text-[#8A6B65] hover:text-[#2C1810] transition-all cursor-pointer border border-[#E8D4D0]/30"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Your full name"
            value={inputData.fullName}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={inputData.email}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Phone Number"
            type="number"
            name="phoneNumber"
            placeholder="1234567890"
            value={inputData.phoneNumber}
            onChange={handleInputChange}
            required
          />

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              className="flex-1 justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setModalOpen(false)}
              className="flex-1 justify-center"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProfileEditModal;
