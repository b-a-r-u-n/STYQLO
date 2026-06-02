import React, { useEffect, useState } from 'react';
import { Badge, ProfileEditModal } from '../../components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Edit, Mail, MapPin, Phone, Plus, Trash2, User, Calendar } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addAddressLocal, getSingleUser, removeAddress, removeAddressLocal } from '../../features/userSlice';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userLocal, loading } = useSelector(state => state.user);
  const { id } = useParams();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const fetchData = async () => {
      try {
        await dispatch(getSingleUser(id)).unwrap();
      } catch (error) {
        toast.error(error?.message || "Please log in to access your profile");
      }
    };
    fetchData();
  }, []);

  const handleClick = () => {
    if (userLocal.address.length <= 10) navigate(`/${id}/profile/address/add`);
    else toast.error("You can only add up to 10 addresses");
  };

  const handleRemove = async (address, index) => {
    dispatch(removeAddressLocal(address._id));
    try {
      const result = await dispatch(removeAddress(address._id)).unwrap();
      toast.success(result.message || "Address removed");
    } catch (error) {
      toast.error(error?.message || "Failed to remove address");
      dispatch(addAddressLocal({ address, index }));
    }
  };

  if (loading && !userLocal) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
        <div className="spinner-luxury" />
      </div>
    );
  }

  const initials = userLocal?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-[#FBF8F5]">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#C8756A] mb-1">Account</p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2C1810]">My Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="relative bg-white rounded-3xl border border-[#EDD5CF] shadow-[0_10px_40px_rgba(44,24,16,0.08)] overflow-hidden">

          {/* Hero Section */}
          <div className="relative h-44 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2C1810] via-[#4A2820] to-[#C8756A]" />

            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-10 w-52 h-52 bg-[#F2C6BD]/20 rounded-full blur-3xl" />

            {/* Edit Button */}
            <Button
              onClick={() => setModalOpen(true)}
              className="absolute top-5 right-5 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 rounded-xl"
            >
              <Edit size={16} />
              Edit Profile
            </Button>
          </div>

          <div className="px-6 pb-6">

            {/* Avatar */}
            <div className="-mt-14 mb-4 relative">
              <div className="relative w-fit">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#C8756A] via-[#D89285] to-[#F2C6BD] p-[3px] shadow-[0_8px_25px_rgba(200,117,106,0.35)]">
                  <div className="w-full h-full rounded-[22px] bg-white flex items-center justify-center">
                    <span className="text-3xl font-bold text-[#2C1810]">
                      {initials}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <ProfileEditModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              isMobile={isMobile}
            />

            {/* User Info */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#2C1810]">
                {userLocal?.fullName}
              </h2>

              <p className="text-[#9B7B75] mt-1">
                Member since{" "}
                {userLocal?.createdAt
                  ? new Date(userLocal.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                  })
                  : "N/A"}
              </p>
            </div>

            {/* Information Cards */}
            <div className="space-y-4">

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FDF5F3] border border-[#EDD5CF]">
                <div className="w-10 h-10 rounded-xl bg-[#C8756A]/10 flex items-center justify-center">
                  <Mail size={18} className="text-[#C8756A]" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[#9B7B75]">
                    Email Address
                  </p>

                  <p className="font-medium text-[#2C1810] truncate">
                    {userLocal?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FDF5F3] border border-[#EDD5CF]">
                <div className="w-10 h-10 rounded-xl bg-[#C8756A]/10 flex items-center justify-center">
                  <Phone size={18} className="text-[#C8756A]" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-[#9B7B75]">
                    Phone Number
                  </p>

                  <p className="font-medium text-[#2C1810]">
                    {userLocal?.phoneNumber || "Not Added"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FDF5F3] border border-[#EDD5CF]">
                <div className="w-10 h-10 rounded-xl bg-[#C8756A]/10 flex items-center justify-center">
                  <Calendar size={18} className="text-[#C8756A]" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-[#9B7B75]">
                    Joined Date
                  </p>

                  <p className="font-medium text-[#2C1810]">
                    {userLocal?.createdAt
                      ? new Date(userLocal.createdAt).toLocaleDateString("en-IN")
                      : "N/A"}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-white rounded-2xl border border-[#EDD5CF] shadow-[0_2px_16px_rgba(44,24,16,0.06)] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#2C1810] flex items-center gap-2">
                <MapPin size={18} className="text-[#C8756A]" />
                Saved Addresses
              </h2>
              <p className="text-xs text-[#9B7B75] mt-0.5">Manage your delivery addresses</p>
            </div>
            {userLocal.address?.length > 0 && (
              <Button onClick={handleClick} variant="primary" size="sm">
                <Plus size={14} />
                Add Address
              </Button>
            )}
          </div>

          {userLocal.address?.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-[#F1DBD5] flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} className="text-[#C8756A]" />
              </div>
              <h3 className="text-base font-bold text-[#2C1810] mb-1">No addresses saved</h3>
              <p className="text-sm text-[#9B7B75] mb-5">Add a delivery address to speed up checkout</p>
              <Button onClick={() => navigate(`address/add`)} variant="primary">
                <Plus size={16} />
                Add Your First Address
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userLocal.address.map((address, index) => (
                <div
                  key={address._id}
                  className="border-2 border-[#EDD5CF] rounded-xl p-4 hover:border-[#C8756A] transition-all duration-200 group"
                >
                  {address.isDefault && (
                    <Badge variant="info" className="mb-2">Default</Badge>
                  )}
                  <p className="text-sm font-bold text-[#2C1810] mb-1">{address.fullName}</p>
                  <div className="text-xs text-[#9B7B75] space-y-0.5 mb-3">
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} — {address.pinCode}</p>
                    {address.country && <p>{address.country}</p>}
                    <p className="flex items-center gap-1 mt-1.5">
                      <Phone size={11} /> {address.phoneNumber}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 justify-center"
                      onClick={() => navigate(`address/${address._id}/edit`)}
                    >
                      <Edit size={13} />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleRemove(address, index)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
