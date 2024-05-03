import './App.css'
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {Home} from "./components/home/home.tsx";
import {Login} from "./components/login/login.tsx";
import {Register} from "./components/register/register.tsx";
import {PageNotFoundPage} from "./components/page-not-found/page-not-found.tsx";
import {AppBar} from "./components/app-bar/app-bar.tsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setRoleOnLogin} from "./features/authentication/auth-slice.ts";

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        dispatch(setRoleOnLogin(token))
      }catch (e){
        navigate("/")
      }
    }


  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppBar/>}>
          <Route index element={<Home/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="*" element={<PageNotFoundPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
