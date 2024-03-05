import { Home, Login, Signup, Layout, Chat } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "./context/UserContextProvider.jsx";
import { SocketContextProvider } from "./context/SocketContextProvider";

function App() {
  const queryClient = new QueryClient();
  // Check if user is set in localStorage
  const user = localStorage.getItem("user");
  
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <SocketContextProvider>
            <Routes>
              {!user && <Route path="*" element={<Navigate to="/login" replace />} />}
              {user && (
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path=":receiver" element={<Chat />} />
                </Route>
              )}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </SocketContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
