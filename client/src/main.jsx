import { lazy, Suspense, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from './app/store.js'
import { MantineProvider } from '@mantine/core'
import "@mantine/core/styles.css"
import { Toaster } from 'react-hot-toast'

import GuestRoute from './components/GuestRoute/GuestRoute.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import { AdminLayout, ProfileLayout, PublicLayout } from './layouts/index.js'
import { checkAuth } from './features/authSlice.js'
import { getCartData } from './features/cartSlice.js'

// Lazy-loaded pages
const ProductsPage        = lazy(() => import("./pages/ProductsPage/ProductsPage.jsx"))
const ProductDetailsPage  = lazy(() => import("./pages/ProductDetailsPage/ProductDetailsPage.jsx"))
const ProfilePage         = lazy(() => import("./pages/ProfilePage/ProfilePage.jsx"))
const EditAndAddAddress   = lazy(() => import("./pages/EditAndAddAddress/EditAndAddAddress.jsx"))
const CartPage            = lazy(() => import("./pages/CartPage/CartPage.jsx"))
const CheckoutPage        = lazy(() => import("./pages/CheckoutPage/CheckoutPage.jsx"))
const SignupPage          = lazy(() => import("./pages/SignupPage/SignupPage.jsx"))
const LoginPage           = lazy(() => import("./pages/LoginPage/LoginPage.jsx"))
const NotFoundPage        = lazy(() => import("./pages/NotFoundPage/NotFoundPage.jsx"))
const UpdateUserProfilePage = lazy(() => import("./pages/UpdateUserProfilePage/UpdateUserProfilePage.jsx"))
const DashboardPage       = lazy(() => import("./pages/ADMIN/DashboardPage/DashboardPage.jsx"))
const AddProductPage      = lazy(() => import("./pages/ADMIN/AddProductPage/AddProductPage.jsx"))
const ManageProductsPage  = lazy(() => import("./pages/ADMIN/ManageProductsPage/ManageProductsPage.jsx"))
const ManageUsersPage     = lazy(() => import("./pages/ADMIN/ManageUsersPage/ManageUsersPage.jsx"))
const UpdateProductPage   = lazy(() => import("./pages/ADMIN/UpdateProductPage/UpdateProductPage.jsx"))

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* PUBLIC */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<ProductsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route
          path=":id/profile"
          element={
            <ProtectedRoute>
              <ProfileLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfilePage />} />
          <Route path="address/add" element={<EditAndAddAddress />} />
          <Route path="address/:addressId/edit" element={<EditAndAddAddress />} />
        </Route>
        <Route path="cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
      </Route>

      {/* AUTH */}
      <Route path="/signup" element={<GuestRoute><SignupPage /></GuestRoute>} />
      <Route path="/login"  element={<GuestRoute><LoginPage /></GuestRoute>} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="add-product" element={<AddProductPage />} />
        <Route path="products" element={<ManageProductsPage />} />
        <Route path="users" element={<ManageUsersPage />} />
        <Route path="users/:id/edit" element={<UpdateUserProfilePage />} />
        <Route path=":id/profile" element={<ProfilePage />} />
        <Route path="product/:id/edit" element={<UpdateProductPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </>
  )
)

const Loader = () => (
  <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
    <div className="text-center">
      <div
        className="w-10 h-10 rounded-full animate-spin mx-auto mb-3"
        style={{
          border: '3px solid #EDD5CF',
          borderTopColor: '#C8756A',
        }}
      />
      <p className="text-sm text-[#9B7B75] font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>
        Loading...
      </p>
    </div>
  </div>
)

const AppWrapper = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => { dispatch(checkAuth()) }, [])
  useEffect(() => { if (isLoggedIn) dispatch(getCartData()) }, [isLoggedIn])

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MantineProvider>
      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 3500,
          style: {
            background: '#FFFFFF',
            color: '#2C1810',
            border: '1px solid #EDD5CF',
            borderRadius: '14px',
            boxShadow: '0 8px 32px rgba(44,24,16,0.12)',
            fontFamily: 'Manrope, Outfit, sans-serif',
            fontSize: '13.5px',
            fontWeight: '500',
            padding: '12px 16px',
            maxWidth: '360px',
          },
          success: {
            iconTheme: { primary: '#C8756A', secondary: '#FFFFFF' },
          },
          error: {
            iconTheme: { primary: '#C0392B', secondary: '#FFFFFF' },
          },
        }}
      />
      <AppWrapper />
    </MantineProvider>
  </Provider>
)
