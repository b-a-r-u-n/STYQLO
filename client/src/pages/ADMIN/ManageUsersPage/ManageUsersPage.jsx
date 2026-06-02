import React, { useEffect } from 'react';
import { Badge } from '../../../components';
import { Edit, Trash2, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addLocalUsers, getAllUsers, removeLocalUsers, removeUser } from '../../../features/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ManageUsersPage = () => {
  const { usersLocal, loading } = useSelector(state => state.user);
  const authUser = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllUsers()).unwrap();
      } catch (error) {
        toast.error(error?.message || "Failed to fetch users");
      }
    };
    fetchData();
  }, [dispatch]);

  const handleEdit = (user) => navigate(`/admin/users/${user._id}/edit`);

  const handleRemove = async (user, index) => {
    dispatch(removeLocalUsers(user._id));
    try {
      const result = await dispatch(removeUser(user._id)).unwrap();
      toast.success(result.message || "User removed successfully");
    } catch (error) {
      dispatch(addLocalUsers(user, index));
      toast.error(error.data || "Failed to remove user");
    }
  };

  if (loading && !usersLocal) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
        <div className="spinner-luxury" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F5] p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#C8756A] mb-1">Users</p>
        <h1 className="text-2xl md:text-3xl font-bold text-[#2C1810]">Manage Users</h1>
        <p className="text-sm text-[#9B7B75] mt-1">{usersLocal?.length || 0} registered users</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#EDD5CF] shadow-[0_2px_16px_rgba(44,24,16,0.06)] overflow-hidden">
        {usersLocal?.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-[#F1DBD5] flex items-center justify-center mx-auto mb-4">
              <Users size={28} className="text-[#C8756A]" />
            </div>
            <h3 className="text-base font-bold text-[#2C1810] mb-1">No users found</h3>
            <p className="text-sm text-[#9B7B75]">Users will appear here once they register</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FDF5F3] border-b border-[#EDD5CF]">
                  {["User", "Email", "Role", "Joined", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-[#9B7B75] uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDD5CF]">
                {usersLocal?.map((user, index) => (
                  <tr key={user._id} className="hover:bg-[#FDF5F3] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8756A] to-[#D4A398] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-sm">
                          {user?.fullName?.toUpperCase().split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="text-sm font-semibold text-[#2C1810]">{user?.fullName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#9B7B75]">{user.email}</td>
                    <td className="px-5 py-4">
                      <Badge variant={user.isAdmin ? 'secondary' : 'default'}>
                        {user.isAdmin
                          ? `Admin${user?._id === authUser?._id ? " (You)" : ""}`
                          : "Customer"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#9B7B75]">
                      {new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          disabled={user.isAdmin}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            user.isAdmin
                              ? "bg-[#F5EAE7] text-[#C4A09A] cursor-not-allowed"
                              : "bg-[#F1DBD5] hover:bg-[#C8756A] text-[#C8756A] hover:text-white cursor-pointer"
                          }`}
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleRemove(user, index)}
                          disabled={user.isAdmin}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            user.isAdmin
                              ? "bg-red-50/50 text-red-300 cursor-not-allowed"
                              : "bg-red-50 hover:bg-red-500 text-red-500 hover:text-white cursor-pointer"
                          }`}
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

export default ManageUsersPage;
