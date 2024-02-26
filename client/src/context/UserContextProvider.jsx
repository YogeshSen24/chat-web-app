import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();
function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const id = localStorage.getItem("user");
    if (id) {
      axios
        .get(`http://localhost:8000/api/users/${id}`)
        .then((res) => setUser(res.data));
    }

  },[])
  return (
    <UserContext.Provider value={{ user, setUser , UserContext }}>
      {children}
    </UserContext.Provider>
  );
}

export {UserContextProvider , UserContext};
