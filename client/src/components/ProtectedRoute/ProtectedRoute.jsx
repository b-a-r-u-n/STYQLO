import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, user, loading } = useSelector(state => state.auth)

  if (loading) return (
    <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
      <div
        className="w-9 h-9 rounded-full animate-spin"
        style={{ border: '3px solid #EDD5CF', borderTopColor: '#C8756A' }}
      />
    </div>
  )

  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (adminOnly && !user?.isAdmin) return <Navigate to="/" replace />

  return children
}

export default ProtectedRoute
