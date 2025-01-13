import { Outlet } from "react-router-dom"


const LayoutAdmin = () => {
  return (
    <div>
      <h1>admin</h1>
      <h2>Header</h2>
      <hr />
      <Outlet />
    </div>
  )
}

export default LayoutAdmin
