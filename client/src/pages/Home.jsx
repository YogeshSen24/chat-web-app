import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data , setData] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    const id = localStorage.getItem("user")
    axios.get(`/api/users/${id}`).then((res)=>setData(res.data[0]))
  },[])
  return (
    <div id="home" className="shadow-2xl p-5 w-full">
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-auto items-center justify-center flex-col">
          <img
            className="w-1/4 rounded-full aspect-square mb-10 object-cover object-center"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Hi , {data?.name}
            </h1>
            <p className="font-medium leading-relaxed">
              Welcome to ChatConnect, your ultimate messaging companion! We are
              thrilled to have you join our vibrant community.
            </p>
            <p className="mb-3">
              Enjoy your time on ChatConnect, and happy chatting!
            </p>
            <div className="flex justify-center mobile ">
              <button onClick={()=>navigate("/side-bar")} className="inline-flex btn-dark py-2 px-6 text-lg">
                Start a chat
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
