import "./App.css";   // 
import Login from "./pages/login/login";
import Header from "./components/User_header";
import Home from "./pages/home/home";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

function App() {
    // const [count, setCount] = useState(0)
  return (
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )  
}

export default App;