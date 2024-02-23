import { Outlet } from "react-router-dom"
import {SideBar} from "../components"
function Layout() {
  return (
    <div className='flex  h-screen p-5'>
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default Layout
