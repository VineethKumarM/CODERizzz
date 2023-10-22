import React from 'react'
import './popup.css'
import Btn from '../btn/btn'

// popup component for showing features when upgrade page is opened
const Popup = ({toggle}) => {
  return (
    <div className="popup">
            <div className="popup__inner">
                <h2>Welcome to CODERizzz+</h2>
                <ul>
                    <span>- Better syntax highlighting with CodeMirror</span>
                    <span>- Run your Code</span>
                    <span>- Independent dark/light theme with code editor</span>
                </ul>
                <Btn clickProps={toggle}>Close</Btn>
            </div>
        </div>
  )
}

export default Popup