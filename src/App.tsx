import './App.css'
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {Home} from "./components/home/home.tsx";
import {Login} from "./components/login/login.tsx";
import {Register} from "./components/register/register.tsx";
import {PageNotFoundPage} from "./components/page-not-found/page-not-found.tsx";
import {AppBar} from "./components/app-bar/app-bar.tsx";
import React, {useEffect} from "react";
import {setRoleOnLogin} from "./features/authentication/auth-slice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AdminHome} from "./components/admin/admin-home.tsx";
import {RootState} from "./store.ts";
import {LinkTreePage} from "./components/link-tree-page/LinkTreePage.tsx";

const ProtectedRoute = ({children}: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.authentication.role);

  if (role !== "ADMIN") {
    navigate("/");
  }

  if (role === "ADMIN") {
    return <>{children}</>;
  }
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        dispatch(setRoleOnLogin(token))

      } catch (e) {
        console.log(e)
      }
    }


  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppBar/>}>
          <Route index element={<Home/>}/>
          <Route path="admin" element={<ProtectedRoute><AdminHome/></ProtectedRoute>}/>
        </Route>
        <Route path="register" element={<Register/>}/>
        <Route path="login" element={<Login/>}/>

        {/* URL PUBLIQUE POUR CONSULTER LES PAGES DES UTILISATEURS*/}

        <Route path="lkt">
          <Route path=":url_owner" element={<LinkTreePage />} />
        </Route>

        <Route path="*" element={<PageNotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
