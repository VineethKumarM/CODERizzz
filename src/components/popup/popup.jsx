import React from 'react'
import './popup.css'
import Btn from '../btn/btn'
const Popup = (props) => {
  return (
    <div className="popup">
            <div className="popup-inner">
                <h2>Welcome to CODERizzz+</h2>
                <ul>
                    <span>- Better syntax highlighting with CodeMirror</span>
                    <span>- Run and Share your Code</span>
                    <span>- Independent dark/light theme with code editor</span>
                </ul>
                <Btn clickProps={props.toggle}>Close</Btn>
            </div>
        </div>
  )
}

export default Popup