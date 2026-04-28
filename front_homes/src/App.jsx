import "./App.css";   // 
import Login from "./pages/login/login";
import Header from "./components/User_header";
import Home from "./pages/home/home";
import Signup from "./pages/signup/signup.jsx";
import MyPage from "./pages/mypage/mypage.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

function App() {
    // const [count, setCount] = useState(0)
  return (
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  )  
}

export default App;