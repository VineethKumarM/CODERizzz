import React , {useContext, useState }from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Btn from '../btn/btn'
import { FaPlus,FaRegSun, FaRegMoon } from "react-icons/fa";

import './navbar.css'
import '../btn/_theme/btn_theme_navLink.css'
import '../btn/_theme/btn_theme_navToggle.css'
const Navbar = ({theme, handleClick}) => {
    // basic navbar with website title 
    const location = useLocation();
    const navigate = useNavigate();
    const [upgraded, setUpgraded] = useState(location.pathname==='/upgraded')
    function handleUpdate() {
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
                <Btn 
                    name={upgraded ? "Basic" : "Upgrade"}
                    classProp={'btn_theme_navLink'}
                    clickProps={handleUpdate}
                    
                />
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