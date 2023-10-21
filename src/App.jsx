import { useState } from 'react'
import {Route , BrowserRouter as Router,Routes} from 'react-router-dom'
import './App.css'
import Home from './screens/Home/Home'
import HomePlus from './screens/HomePlus/HomePlus'
import Navbar from './components/navbar/navbar'

//todo
// basic:
// styles : shadow for menu


// plus:
// share functionality: needs a key value database
//styles

function App() {
    const [count, setCount] = useState(0)
    const [code,setCode] = useState('//Write JS code here. Protip: writing your own code here is better than copy/paste') 
    return (
            // |        navbar           |
            // |menu  | editor/output    |
        <>
        {/* <Home/> */}
        {/* <HomePlus /> */}
        <Router >
            <Navbar />
            <Routes>
                <Route eaxct path="/" element={<Home code={code} setcode={setCode}/>} />
                <Route eaxct path="/upgraded" element={<HomePlus code={code} setcode={setCode}/>} />
            </Routes>
        </Router>
        </>
    )
}

export default App
