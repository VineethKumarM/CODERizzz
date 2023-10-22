import { useState, createContext } from 'react'
import {Route , BrowserRouter as Router,Routes} from 'react-router-dom'
import './App.css'
import Home from './screens/Home/Home'
import HomePlus from './screens/HomePlus/HomePlus'
import Navbar from './components/navbar/navbar'


// dark light css
import './_theme/_theme_light.css'
import './_theme/_theme_dark.css'
//todo

// plus:
// share functionality: needs a key value database

const ThemeContext = createContext(null)
function App() {

    const [theme,setTheme] = useState( localStorage.getItem('theme') || 'dark')
    // to sync global code
    const [code,setCode] = useState('//Write JS code here. Protip: writing your own code here is better than copy/paste') 
    // to sync lock globally
    const [isLock, setIsLock] = useState(false)
    // theme toggler
    const toggleTheme = ()=> {
        if(theme=='dark') {
            setTheme('light')
            localStorage.setItem('theme','light');
        }
        else {
            setTheme('dark')
            localStorage.setItem('theme','dark');
        }
    }
    // lock toggler
    function handleLock() {
        // lock/unlock the editor 
        setIsLock(!isLock)
    }
    return (
            // |        navbar           |
            // |menu  | editor/output    |
        <ThemeContext.Provider value={theme}>
            <div className="App" id={theme}>
                <Router >
                    <Navbar theme={theme} handleClick={toggleTheme}/>
                    <Routes>
                        <Route eaxct path="/" element={<Home 
                                                         code={code} 
                                                            setcode={setCode}
                                                            isLock={isLock}
                                                            handleLock={handleLock}  
                                                        />} 
                                                     />
                        <Route eaxct path="/upgraded" element={<HomePlus 
                                                                    code={code} 
                                                                    setcode={setCode}
                                                                    isLock={isLock}
                                                                    handleLock={handleLock}                                                                    
                                                                />} 
                                                            />
                    </Routes>
                </Router>
            </div>
        </ThemeContext.Provider>

    )
}

export default App
