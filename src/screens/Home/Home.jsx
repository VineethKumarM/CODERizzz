import React, {useRef, useState} from 'react'
import copy from 'copy-to-clipboard'
//components
import Btn from '../../components/btn/btn'
import BasicEditor from './basicEditor/basicEditor'
import { FaCopy, FaSave, FaLock, FaLockOpen } from "react-icons/fa";
// include css
import "./home.css"
import "../../components/btn/_theme/btn_theme_menu.css"
import "../../components/btn/_theme/btn_theme_opt.css"

// Home component 
// params :
//    code(string) : code Text
//    setcode : updates the code
//    isLock(boolean) : locked/unlocked editor
//    handleLock : lock toggler


const Home = ({code,setcode, isLock,handleLock}) => {

    // handlers for button click
    // save most recent code(last) and the one before that(earlier)
    function handleSave() {
        const oneDay = 24 * 60 * 60 * 1000;//24Hrs span
        let last = localStorage.getItem('last')
        let lastEdit = localStorage.getItem('edited')
        let curTime = new Date().getTime();
        // check if is there is any saved code before 24hrs , if so update it
        if(curTime - lastEdit >= oneDay) {
            // discards edits before the last 24hrs
            localStorage.setItem('earlier', last? last : code)
            localStorage.setItem('edited', curTime)
        }
        localStorage.setItem('last', code)
    }
    function handleCopy() {
        // copies text to clipboard
        // *get permissions if navigator is used!
        if (!copy(code)) {
            alert('Errror Copying')
        } else{
            alert('Copied to Clipboard')
        }
    }
    function updateCode(val) {
        setcode(val)
    }


    return (

        
        <div className='home '>
            <div className="content">
                {/* side menu : show complete buttons on hover */}
                <div className="content_menu">
                    <Btn 
                        name={isLock ? "Unlock" : "Lock" } 
                        classProp={isLock ? "btn_theme_menu bg-color_danger" : "btn_theme_menu bg-color_safe"}
                        clickProps={handleLock}
                        children={!isLock ? <FaLockOpen /> : <FaLock />} 
                    />
                    <Btn 
                        name="Save" 
                        classProp="btn_theme_menu bg-color_info"
                        clickProps={handleSave}
                        children={<FaSave />}    
                    />
                    <Btn name={"Copy"} 
                        classProp="btn_theme_menu bg-color_info " 
                        clickProps={handleCopy}
                        children={<FaCopy></FaCopy>}
                    />
                </div>

                <div className="content_main">
                    {/* basic editor with only self implemented indentation features */}
                    <BasicEditor     
                        lock={isLock}
                        onCodeChange={setcode}
                        code = {code}
                    />
                </div>

            </div>
        </div>
    )
}

export default Home
