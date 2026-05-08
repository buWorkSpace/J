import "./App.css";
import Login from "./pages/login/login";
import Header from "./components/User_header";
import Home from "./pages/home/home";
import Signup from "./pages/signup/signup.jsx";
import MyPage from "./pages/mypage/mypage.jsx";
import Detail from "./pages/detail/Detail.jsx"; 
import Admin from "./pages/admin/adminpage.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import AdminPage from "./pages/admin/adminpage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/admin" element={<AdminPage />} />
        {/* --------------------------- */}
      </Routes>
    </BrowserRouter>
  )  
}

export default App;