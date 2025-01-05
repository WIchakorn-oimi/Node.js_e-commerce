import { Outlet } from "react-router-dom"
import MainNav from "../Components/MainNav"


const Layout = () => {
  return (
    <div>
      <MainNav />

      <main>
        <Outlet />
      </main>

    </div>
  )
}

export default Layout
