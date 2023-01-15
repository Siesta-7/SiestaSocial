import Login from "./pages/login/Login"
import { Register } from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar"
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss"
import { DarkModeContext } from "./context/DarkModeContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {

  const {currentUser} = useContext(AuthContext)
  const {darkMode} = useContext(DarkModeContext)
  
  const ProtectedRoute = ({children})=>{
    if (!currentUser){
      return <Navigate to="/login" />
    }
    else{
      return children
    }
  }

  const Layout = ()=>{
    return (
      <QueryClientProvider client={queryClient} >
        <div className={darkMode ?  "theme-dark" : "theme-light"}>
          <Navbar />
          <div style={{display:"flex"}} >
            <Leftbar/>
            <div style={{flex:8}} >
              <Outlet/>
            </div>  
            <Rightbar/>
          </div>
        </div>
    </QueryClientProvider>
    )
  }

  const router = createBrowserRouter([
    {
      path:"/",
      element:<ProtectedRoute><Layout/></ProtectedRoute>,
      children:[
        {
          path:"/",
          element:<Home />,
        },
        {
          path:"/profile/:id",
          element:<Profile />,
        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path:"/register",
      element: <Register/>
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
