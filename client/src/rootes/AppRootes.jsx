import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../pages/Home"
import Shop from "../pages/Shop"
import Cart from "../pages/Cart"
import History from "../pages/History"
import Checkout from "../pages/Checkout"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Layout from "../Layouts/Layout"
import LayoutAdmin from "../Layouts/LayoutAdmin"
import Dashboard from "../pages/admin/Dashboard"
import Category from "../pages/admin/Category"
import Product from "../pages/admin/Product"
import Manage from "../pages/admin/Manage"
import LayoutUser from "../Layouts/LayoutUser"
import HomeUser from "../pages/user/HomeUser"
import ProtectRouteUser from "./ProtectRouteUser"
import ProtectRouteAdmin from "./ProtectRouteadmin"




const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'Shop', element: <Shop /> },
      { path: 'Cart', element: <Cart /> },
      { path: 'History', element: <History /> },
      { path: 'Checkout', element: <Checkout /> },
      { path: 'login', element: <Login /> },
      { path: 'Register', element: <Register /> },
    ]
  },
  {
    path: '/admin',
    // element: <LayoutAdmin />,
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'category', element: <Category /> },
      { path: 'product', element: <Product /> },
      { path: 'manage', element: <Manage /> },
    ]
  },
  {
    path: '/user',
    // element: <LayoutUser />,
    element: <ProtectRouteUser element={<LayoutUser />}/>,
    children: [
      { index: true, element: <HomeUser /> },
    ]
  }

])


const AppRootes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRootes
