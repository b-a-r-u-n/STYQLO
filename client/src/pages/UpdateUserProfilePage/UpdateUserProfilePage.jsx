import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { Button, Input } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, updateUser } from '../../features/userSlice';
import toast from 'react-hot-toast';

const UpdateUserProfilePage = () => {
  const { user, loading } = useSelector(state => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState({ fullName: "", email: "", phoneNumber: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getSingleUser(id)).unwrap();
      } catch (error) {
        toast.error(error.message || 'Failed to fetch user details.');
      }
    };
    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    if (!user) return;
    setInputData({ fullName: user.fullName || "", email: user.email || "", phoneNumber: user.phoneNumber || "" });
  }, [user]);

  const handleInput = (e) => setInputData({ ...inputData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.fullName.trim()) { toast.error("Full name is required"); return; }
    if (!inputData.email.trim()) { toast.error("Email is required"); return; }
    if (!inputData.phoneNumber) { toast.error("Phone number is required"); return; }

    setIsLoading(true);
    try {
      const result = await dispatch(updateUser({ formData: inputData, userId: id })).unwrap();
      toast.success(result.message || "User updated successfully!");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error.message || "Failed to update user.");
      navigate("/admin/users");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
        <div className="spinner-luxury" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F5] p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/admin/users')}
          className="flex items-center gap-2 text-sm text-[#9B7B75] hover:text-[#C8756A] mb-6 transition-colors group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Users
        </button>

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C8756A] mb-1">Users</p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2C1810]">Edit User</h1>
        </div>

        <div className="bg-white rounded-2xl border border-[#EDD5CF] shadow-[0_2px_16px_rgba(44,24,16,0.06)] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#F1DBD5] flex items-center justify-center">
              <User size={20} className="text-[#C8756A]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#2C1810]">User Information</h2>
              <p className="text-xs text-[#9B7B75]">Update the user's profile details</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" type="text" name="fullName" placeholder="Full name" value={inputData.fullName} onChange={handleInput} required />
            <Input label="Email Address" type="email" name="email" placeholder="email@example.com" value={inputData.email} onChange={handleInput} required />
            <Input label="Phone Number" name="phoneNumber" type="number" placeholder="1234567890" value={inputData?.phoneNumber} onChange={handleInput} required />

            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" className="flex-1 justify-center" size="lg" disabled={loading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </span>
                ) : "Update User"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => navigate('/admin/users')} className="px-6">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserProfilePage;
