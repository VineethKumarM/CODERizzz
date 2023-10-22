import React , { useState }from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Btn from '../btn/btn'
import { FaPlus,FaRegSun, FaRegMoon } from "react-icons/fa";

import './navbar.css'
import '../btn/_theme/btn_theme_navLink.css'
import '../btn/_theme/btn_theme_navToggle.css'

// navbar component
// params:
//      theme: dark/light
//      handleClick: toggle function for theme

const Navbar = ({theme, handleClick}) => {

    const location = useLocation();
    const navigate = useNavigate();
    // stores basic or upgraded home page
    const [upgraded, setUpgraded] = useState(location.pathname==='/upgraded')

    function handleUpgrade() {
        if(upgraded) {
            setUpgraded(false)
            navigate('/')
        } else{
            setUpgraded(true)
            navigate('/upgraded')
        }
    }

    return (
        <div className='nav'>
            <h1>CODERizzz {upgraded ? <FaPlus className='nav__icon'/> : <></>} </h1>
            <div className="nav__menu">
                {/* navigation button */}
                <Btn 
                    name={upgraded ? "Basic" : "Upgrade"}
                    classProp={'btn_theme_navLink'}
                    clickProps={handleUpgrade}
                    
                />
                {/* theme change button */}
                <Btn 
                    classProp={'btn_theme_navToggle'} 
                    clickProps={handleClick} 
                   children= { theme==='dark' ? <FaRegSun style={{color:'orange'}} /> :  <FaRegMoon /> }
                 >
                 </Btn>
                
            </div>
        </div>
    )
}

export default Navbar