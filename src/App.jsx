import { useState } from 'react'
import './App.css'
import Header from './components/User_header'
import Home from './pages/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Home />
    </>
  )
}

export default App