import React, {useRef, useState} from 'react'
import RegButton from '../../components/reg-button/reg-button'
import Navbar from '../../components/navbar/navbar'
import Editor from '../../components/editor/Editor'
import copy from 'copy-to-clipboard'
import { FaCopy, FaShareSquare, FaSave, FaLock, FaLockOpen, FaPlay } from "react-icons/fa";
// include css
import "./home.css"

const Home = () => {
    // variables to store code and editor states
    const outputRef = useRef(null)
    const [isLock, setIsLock] = useState(false)
    const [code, setcode] = useState(localStorage.getItem('today') ||  '//Write JS code here')
    const [theme, setTheme] = useState(1)
    // handlers for button click
    function handleLock() {
        // lock/unlock the editor 
        setIsLock(!isLock)
    }
    function handleRun() {
        // run code -> output displays in console
        const res = eval(code);
        setoutput(res)
    }
    // save most recent code(today) and the last edited code within past 24hrs(yesterday:yday)
    function handleSave() {
        const oneDay = 24 * 60 * 60 * 1000;//24Hrs span
        let today = localStorage.getItem('today')
        let lastEdit = localStorage.getItem('edited')
        let curTime = new Date().getTime();
        // check if is there is any saved code before 24hrs , if so update it
        if(curTime - lastEdit >= oneDay) {
            // discards edits before the last 24hrs
            localStorage.setItem('yday', today? today : code)
            localStorage.setItem('edited', curTime)
        }
        localStorage.setItem('today', code)
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
    function handleShare() {
        //will implement later
        //needs a datastore????
    }

    return (
        // |        navbar           |
        // |menu  | editor/output    |
        
        <div className='home'>
            <Navbar />
            
            <div className="content">
                {/* side menu : show complete buttons on hover */}
                <div className="content_menu">
                    <RegButton 
                        name={isLock ? "Unlock" : "Lock" } 
                        classProp={isLock ? "bg-color_danger" : "bg-color_info"}
                        clickProps={handleLock}
                        children={isLock ? <FaLockOpen /> : <FaLock />}
                    />
                    {/* add run */}
                    <RegButton 
                        name="Save" 
                        classProp="bg-color_safe"
                        clickProps={handleSave}
                        children={<FaSave />}    
                    />
                    <RegButton name={"Copy"} 
                        classProp="bg-color_info " 
                        clickProps={handleCopy}
                        children={<FaCopy></FaCopy>}
                    />
                    {/* add share */}
                </div>

                <div className="content_main">
                    {/* editor container */}
                    <Editor 
                        lock={!isLock}
                        onCodeChange={setcode}
                        code = {code}
                        theme={theme}
                    ></Editor>
                    {/* retrive choices for previous codes */}
                    {/* not implemented as not required for the task! */}
                    {
                        localStorage.getItem('today') ? 
                        <div className="content_main_options">
                            Load previous codes: <a href=''>recent</a>  { localStorage.getItem('yday') ? <a href="">earlier</a> : <></> }
                        </div>
                        : <></>
                    }
                    
                </div>

            </div>
        </div>
    )
}

export default Home

                    {/* <RegButton 
                        name="Run" classProp= "bg-color_danger"
                        clickProps={handleRun}
                        children={<FaPlay />}
                    /> */}
                    {/* <RegButton name="Share" 
                        classProp="bg-color_info" 
                        clickProps={handleShare}
                        children={<FaShareSquare />}
                    /> */}