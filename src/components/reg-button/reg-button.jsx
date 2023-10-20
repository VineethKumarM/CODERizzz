import React from 'react';
import './reg-button.css'
// regular button component 
// params :
//       name: button name/title 
//       classProp : additional classes for style customisations 
//       clickProps: clickhandler passed from parent
//       children: children components, here i passed the appropriate icons for title

const RegButton = ({name,classProp,clickProps,children}) => {
    // button click event hadling function
    const handleClick  = (e) => {
        e.preventDefault;
        // call the required function
        clickProps();
    }

    return (
        <button className={'reg-button ' + classProp} onClick={handleClick}>
            {/* show the button name and its corresponding icon */}
            {name}
            {children}
        </button>
    )
}

export default RegButton