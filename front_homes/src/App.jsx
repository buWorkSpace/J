import "./App.css";
import Login from "./pages/login/login";
import Header from "./components/User_header";
import Home from "./pages/home/home";
import Signup from "./pages/signup/signup.jsx";
import MyPage from "./pages/mypage/mypage.jsx";
import Detail from "./pages/detail/Detail.jsx"; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail" element={<Detail />} />
        {/* --------------------------- */}
      </Routes>
    </BrowserRouter>
  )  
}

export default App;