import { Outlet } from "react-router-dom"
import {SideBar} from "../components"
function Layout() {
  return (
    <div id="layout" className='flex h-screen p-5'>
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default Layout
