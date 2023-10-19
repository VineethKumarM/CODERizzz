import React from 'react';
import './reg-button.css'

const RegButton = ({name,classProp,clickProps}) => {

    const handleClick  = (e) => {
        e.preventDefault;
        clickProps();
    }

    return (
        <button className={'reg-button ' + classProp} onClick={handleClick}>
            {name}
        </button>
    )
}

export default RegButton