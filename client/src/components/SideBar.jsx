
import {NavLink} from "react-router-dom"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContextProvider";
function SideBar() {
  const user = localStorage.getItem("user")
  const [data , setData] = useState()
  const {activeUsers} = useContext(SocketContext)
  useEffect(()=>{
     axios
    .get(`http://localhost:8000/api/users/others/${user}`)
    .then((res) => setData(res.data));
  },[])
  return (
    <div className="drawer w-1/4 ">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-circle swap swap-rotate">
          <input type="checkbox" />
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {
            data?.map((item)=>(
          <li className="border-b " key={item._id}>
            <NavLink to={`/${item._id}`}>
            <div className="flex gap-3 items-center ">
              <div>
              <img src="https://tse2.mm.bing.net/th?id=OIP.j2pu0aEsquFrq7yH3rXpAgHaHb&pid=Api&P=0&h=220" className="aspect-square w-14 rounded-full" alt="" />
              </div>
              <div>
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p>{activeUsers.includes(item._id)?"active" : "inactive"}</p>
              </div>
            </div>
            </NavLink>
          </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
