import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./components/home/home.tsx";
import {Login} from "./components/login/login.tsx";
import {Register} from "./components/register/register.tsx";
import {PageNotFoundPage} from "./components/page-not-found/page-not-found.tsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<PageNotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
