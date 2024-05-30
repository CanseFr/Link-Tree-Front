import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./components/home/home.tsx";
import {Login} from "./components/login/login.tsx";
import {Register} from "./components/register/register.tsx";
import {PageNotFoundPage} from "./components/page-not-found/page-not-found.tsx";
import {AppBar} from "./components/app-bar/app-bar.tsx";
import {useEffect} from "react";
import {setRoleOnLogin} from "./features/authentication/auth-slice.ts";
import {useDispatch} from "react-redux";
import {AdminHome} from "./components/admin/admin-home.tsx";
import {LinkTreePage} from "./components/link-tree-page/LinkTreePage.tsx";
import {MainDashboard} from "./components/dashboard/user-dashboard/main-dashboard.tsx";
import {ProtectedAdminRoute, ProtectedIdentifiedRoute} from "./features/protected-routes/protect-routes.tsx";
import {Modification} from "./components/dashboard/modification/modification.tsx";

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
          <Route path="admin" element={<ProtectedAdminRoute><AdminHome/></ProtectedAdminRoute>}/>
          <Route path="dashboard" element={<ProtectedIdentifiedRoute><MainDashboard/></ProtectedIdentifiedRoute>}/>
          <Route path="dashboard/modification" element={<ProtectedIdentifiedRoute><Modification/></ProtectedIdentifiedRoute>}/>
        </Route>
        <Route path="register" element={<Register/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="linktree"><Route path=":url_owner" element={<LinkTreePage/>}/></Route>
        <Route path="*" element={<PageNotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
