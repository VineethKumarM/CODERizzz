import React, {useState} from 'react'
import RegButton from '../../components/reg-button/reg-button'
import Navbar from '../../components/navbar/navbar'
import Editor from '../../components/editor/Editor'
import "./home.css"

const Home = () => {

    const [isLock, setIsLock] = useState(false)
    const [ran, setran] = useState(false)
    function handleLock() {
        setIsLock(!isLock)
    }
    function handleRun() {
        setran(true)
    }

    return (
        <div className='home'>
            <Navbar />
            {/* <RegButton name={"Sample"} /> */}
            <div className='menu'>
                <RegButton 
                    name={isLock ? "Lock" : "Unlock" } 
                    classProp={isLock ? "bg-color_danger" : "bg-color_info"}
                    clickProps={handleLock}
                    
                />
                <RegButton name="Run" classProp= "bg-color_danger"
                    clickProps={handleRun}
                />
            </div>
            <Editor />
            <div className='options'>
                <RegButton name="Save" classProp="bg-color_safe"></RegButton>
                <RegButton name="Copy" classProp="bg-color_info"></RegButton>
                <RegButton name="Share" classProp="bg-color_info"></RegButton>
            </div>
            {
                ran ? <div>Output</div> : <></>
            }
        </div>
    )
}

export default Home