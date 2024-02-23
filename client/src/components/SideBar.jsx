// import {FetchData} from "../hooks/useFetch.js"
// import {useQuery} from "@tanstack/react-query"
import axios from "axios";
function SideBar() {
  // const {data , isPending , error} = useQuery(
  //   {
  //       queryKey:["sidebar"],
  //       queryFn:async()=>{
  //           await fetch("http://localhost:8000/api/users")
  //       },
  //   })
  //   console.log(data , isPending , error);
  // const [data ,error] = FetchData("api/user/","sidebar")
  // if(isPending) console.log("loading");
  // if(data) console.log(data);
  // if(error) console.log(error);
  (async () => {
    await axios
      .get("http://localhost:8000/api/users")
      .then((res) => console.log(res));
  })();
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
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
