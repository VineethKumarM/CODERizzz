import React, {useState, useRef, useEffect} from 'react'
import './basicEditor.css'

// Code editor component 
// params :
//    lock(boolean) : lock/unlock the editor
//    code(string) : code Text
//    onCodeChange(function) : handler for onChange event


const BasicEditor = ({lock, code , onCodeChange}) => {

    const editorRef = useRef(null);
    const lineColumnRef = useRef(null);
    // var colLines=1;
    const [colLines, setcolLines] = useState(1)

    // Indent the selected lines
    const handleKeyDown = (e) => {
        //for indentation
        if(e.key==="Tab") {
            e.preventDefault()
            let txtArea = document.getElementById('ide');
            if (txtArea.selectionStart != undefined) {
                let startPos = txtArea.selectionStart;
                let endPos = txtArea.selectionEnd;
                // split the code into lines
                let val = code.split('\n');
                let res=""; //stores the updated code
                let l=1;    //keeps track of char number to compare with line numbers
                
                
                for(let k =0 ; k<val.length;k++) {
                    l++;
                    const len=val[k].length;
                    // works for both single line and multiline selections
                    if(e.shiftKey) {
                        // dedentation
                        // if shift key is pressed 
                        // remove one tab in front
                        if(l+len>=startPos && l<=endPos) {
                            // if only line starts with a tab
                            if(val[k][0]=='\t') res+=val[k].substring(1)+"\n";
                            else res+=val[k] + "\n"
                        }
                        else res+=val[k] + "\n"
                    }
                    else {
                        //indentation
                        // add tab to all lines that fall in the selection
                        if(l+len+1>=startPos && l<=endPos) {
                            res+="\t";
                        }
                        res+=val[k] + "\n";
                    }
                    l+=len;
                }
                //update the code
                onCodeChange(res);
                txtArea.selectionStart = startPos//doesnt work as the component re-renders 
                txtArea.selectionEnd = endPos 
            }
        }
        //for new lines increment the side bar
        else if(e.key==='Enter') {
            let txtArea = document.getElementById('ide');
            if (txtArea.selectionStart != undefined) {
                let startPos = txtArea.selectionStart;
                let endPos = txtArea.selectionEnd;
                // handles only addition of new lines 
                let val  = code.split('\n')
                if(startPos==endPos && colLines==val.length) {
                    let col = document.getElementById('lineColumn')
                    let nxtLine = document.createElement('span')
                    nxtLine.innerText = colLines+1;
                    col.appendChild(nxtLine)
                    setcolLines(colLines+1)
                }
            }
        }
    };

    useEffect(() => {
        // Synchronize the scroll position of the line column and the textarea
        const editor = editorRef.current;
        const lineColumn = lineColumnRef.current;
    
        editor.addEventListener('scroll', () => {
          lineColumn.scrollTop = editor.scrollTop;
        });
    }, [code]);


    return (
        <div className="content__main__editor basic-editor">
            <div className="basic-editor__lines" id='lineColumn' ref={lineColumnRef}>
                <span >1</span>
            </div>
            <textarea
                id='ide'
                value={code}
                ref={editorRef}
                onChange={(e) => onCodeChange(e.target.value)}
                spellCheck='false'
                onKeyDown={handleKeyDown}
                className='basic-editor__ide'
                readOnly={lock}
            
            />
        </div>
    );

}

export default BasicEditor