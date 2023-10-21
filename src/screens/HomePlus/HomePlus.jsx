import React, {useRef, useState} from 'react'
import copy from 'copy-to-clipboard'
//components
import Navbar from '../../components/navbar/navbar'
import Editor from '../../components/editor/Editor'
import Btn from '../../components/btn/btn'
import { FaCopy, FaShareSquare, FaSave, FaLock, FaLockOpen, FaPlay } from "react-icons/fa";
// include css
import "../Home/home.css"
import "./homePlus.css"
import "../../components/btn/_theme/btn_theme_menu.css"
import "../../components/btn/_theme/btn_theme_opt.css"
import * as qs from 'qs'

const HomePlus = ({code,setcode}) => {
    // variables to store code and editor states
    const outputRef = useRef(null)
    const [isLock, setIsLock] = useState(false)
    // const [code, setcode] = useState(localStorage.getItem('last') ||  '//Write JS code here. Protip: writing your own code here is better than copy/paste')
    const [theme, setTheme] = useState(1)
    const [output, setOutput] = useState('Your code will be ran in NodeJS\n runtime and the output appears here')
    // handlers for button click
    function handleLock() {
        // lock/unlock the editor 
        setIsLock(!isLock)
    }
    function handleRun() {
        // browser env
        // // run code -> output displays in console
        // const res = eval(code);
        // setoutput(res)


    // nodejs runtime env
        var query = qs.stringify({
            'code': code,
            'language': 'js',
            'input': ''
        });
        var config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body : query
        };
        fetch('https://api.codex.jaagrav.in',config)
        .then(res => res.json())
        .then(data => {
            if(data['error'].length==0) {
                setOutput(data['output'])
            }
            else {
                setOutput(data['error'])
            }
        })
        .catch(function (error) {
            console.log(error);
        });    
    }
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
    function handleShare() {
        //will implement later
        //needs a datastore????
    }
    function updateCode(val) {
        setcode(val)
    }
    function updateRecent() {
        updateCode(localStorage.getItem('last'))
    }
    function updateEarlier() {
        updateCode(localStorage.getItem('earlier'))
    }

    return (
        // |        navbar           |
        // |menu  | editor/output    |
        
        <div className='homePlus'>            
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
                        name={"Run"}
                        classProp="btn_theme_menu bg-color_info"
                        clickProps={handleRun}
                        children={<FaPlay />}
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
                    <Btn name="Share" 
                        classProp="btn_theme_menu bg-color_info" 
                        clickProps={handleShare}
                        children={<FaShareSquare />}
                    />
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
                        localStorage.getItem('last') ? 
                        <div className="content_main_options">
                            Load previously saved codes:  <Btn name={'recent'} clickProps={updateRecent} classProp={'btn_theme_opt'}/> 
                            { 
                                localStorage.getItem('earlier') 
                                ? <Btn name={'earlier'} clickProps={updateEarlier} classProp={'btn_theme_opt'}/> : <></> 
                            }
                        </div>
                        : <></>
                    }
                    <textarea 
                        className='output'
                        value={output}
                        disabled
                    />
                    
                </div>

            </div>
        </div>
    )
}

export default HomePlus

