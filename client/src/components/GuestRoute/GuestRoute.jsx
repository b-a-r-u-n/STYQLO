import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const GuestRoute = ({ children }) => {
  const { isLoggedIn, loading } = useSelector(state => state.auth)

  if (loading) return (
    <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
      <div
        className="w-9 h-9 rounded-full animate-spin"
        style={{ border: '3px solid #EDD5CF', borderTopColor: '#C8756A' }}
      />
    </div>
  )

  if (isLoggedIn) return <Navigate to="/products" replace />

  return children
}

export default GuestRoute
