import React , {useState }from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Btn from '../btn/btn'
import { FaPlus } from "react-icons/fa";

import './navbar.css'
import '../btn/_theme/btn_theme_navLink.css'
const Navbar = () => {
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
            <Btn 
                name={upgraded ? "Basic" : "Upgrade"}
                classProp={'btn_theme_navLink'}
                clickProps={handleUpdate}
                
            />
        </div>
    )
}

export default Navbar