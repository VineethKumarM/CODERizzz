import React from 'react';
import './btn.css'

// regular button component 
// params :
//       name: button name/title 
//       classProp : additional classes for style customisations 
//       clickProps: clickhandler passed from parent
//       children: children components, here i passed the appropriate icons for title

const Btn = ({name,classProp,clickProps,children}) => {
    // button click event hadling function
    const handleClick  = (e) => {
        e.preventDefault;
        // call the required function
        clickProps?.();
    }

    return (
        <button className={classProp} onClick={handleClick}>
            {/* show the button name and its corresponding icon */}
            {name}
            {children}
        </button>
    )
}

export default Btn