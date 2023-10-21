import { useState } from 'react'
import {Route , BrowserRouter as Router,Routes} from 'react-router-dom'
import './App.css'
import Home from './screens/Home/Home'
import HomePlus from './screens/HomePlus/HomePlus'
import Navbar from './components/navbar/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
        // |        navbar           |
        // |menu  | editor/output    |
    <>
      {/* <Home/> */}
      {/* <HomePlus /> */}
      <Router >
        <Navbar />
        <Routes>
            <Route eaxct path="/" element={<Home/>} />
            <Route eaxct path="/upgraded" element={<HomePlus/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
