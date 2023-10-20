import React, {useState, useRef} from 'react'
import AceEditor from 'react-ace'
// codemirror components
import { useCodeMirror } from '@uiw/react-codemirror';
// import languages 
import { javascript } from '@codemirror/lang-javascript';
// import themes 
import { basicDark, basicLight } from '@uiw/codemirror-theme-basic';
import './editor.css'

// Code editor component 
// params :
//    lock(boolean) : lock/unlock the editor
//    code(string) : code Text
//    onCodeChange : handler for onChange event
//    theme : 1:dark, 0:light

const Editor = ({lock, code , onCodeChange, theme}) => {

    const editorRef = useRef(null)
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

    return (
        <div className='content_main_editor'>
            {/* reference element for codemirror */}
            <div ref={editorRef} className='content_main_editor_ide' ></div>
        </div>
    )
}

export default Editor