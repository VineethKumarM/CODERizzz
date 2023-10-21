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
// Code editor component 
// params :
//    lock(boolean) : lock/unlock the editor
//    code(string) : code Text
//    onCodeChange(function) : handler for onChange event
//    theme(boolean) : 1:dark, 0:light

const Editor = ({lock, code , onCodeChange}) => {

    const editorRef = useRef(null)
    const [theme, settheme] = useState(1)
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
        // languages,theme, state
        extensions : [javascript()],
        theme: theme ? basicDark : basicLight,
        editable: lock,
        // code and code change handler
        value: code,
        onChange:  (value) => {
            onCodeChange(value)
        }
    })

    function handleClick() {
        settheme(!theme)
    }

    return (
        <div className='content_main_editor'>
            {/* reference element for codemirror */}
            <div ref={editorRef} className='content_main_editor_ide' ></div>
            <Btn classProp={'btn_theme_icon'} clickProps={handleClick} > { theme ? <FaSun style={{color:'orange'}} /> :  <FaMoon /> }</Btn>
        </div>
    )
}

export default Editor