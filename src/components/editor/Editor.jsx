import React, {useState, useRef} from 'react'
import Btn from '../btn/btn';
import { FaSun, FaMoon } from 'react-icons/fa';
// codemirror components
import { useCodeMirror } from '@uiw/react-codemirror';
// import languages 
import { javascript } from '@codemirror/lang-javascript';
// import themes 
import { basicDark, basicLight } from '@uiw/codemirror-theme-basic';
//css
import './editor.css'
import '../btn/_theme/btn_theme_icon.css'

// Code editor component (with CodeMirror)
// params :
//    lock : lock/unlock the editor
//    code: code Text
//    onCodeChange: handler for onChange event

const Editor = ({lock, code , onCodeChange}) => {

    const editorRef = useRef(null)
    const [mode, setmode] = useState(localStorage.getItem('mode') ||  0)
    // codemirror configurations
    const {setContainer} = useCodeMirror({
        // styles 
        container: editorRef.current,
        height: `70vh`,
        width:`80vw`,
        style : {
            position: `relative`,
            zIndex: `999`,
            borderRadius: `10px`,
        },
        options:{
            autoComplete:true,
        },
        // languages,dark/light mode, state
        extensions : [javascript()],
        theme: mode ? basicDark : basicLight,
        editable: lock,
        // code and code change handler
        value: code,
        onChange:  (value) => {
            onCodeChange(value)
        }
    })

    function handleClick() {
        localStorage.setItem('mode', !mode)
        setmode(!mode)
    }

    return (
        <div className='content__main__editor'>
            {/* reference element for codemirror */}
            <div ref={editorRef} className='content__main__editor__ide' ></div>
            <Btn classProp={'btn_theme_icon'} clickProps={handleClick} > { mode ? <FaSun style={{color:'orange'}} /> :  <FaMoon style={{color:'black'}}/> }</Btn>
        </div>
    )
}

export default Editor