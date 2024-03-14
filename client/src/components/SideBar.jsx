import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContextProvider";
import { IoMdArrowBack } from "react-icons/io";
function SideBar() {
  const user = localStorage.getItem("user");
  const [data, setData] = useState();
  const { activeUsers } = useContext(SocketContext);
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`/api/users/others/${user}`)
      .then((res) => setData(res.data));
  }, []);
  return (
    <div id="side-bar" className="w-1/4  transition-all">
      <div className="mobile m-4">
    <IoMdArrowBack onClick={()=>navigate("/")} className="w-10 h-10  rounded-full bg-white aspect-square mr-5 pop-out "/>
      </div>
      <ul className={`menu w-80 transition-all p-4 min-h-full text-base-content`}>
        {data?.map((item) => (
          <li className="receivers" key={item._id}>
            <NavLink to={`/${item._id}`}>
              <div className="flex gap-3 items-center ">
                <div>
                  <img
                    src="https://tse2.mm.bing.net/th?id=OIP.j2pu0aEsquFrq7yH3rXpAgHaHb&pid=Api&P=0&h=220"
                    className="aspect-square w-14 rounded-full"
                    alt=""
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p>
                    {activeUsers.includes(item._id) ? "active" : "inactive"}
                  </p>
                </div>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
