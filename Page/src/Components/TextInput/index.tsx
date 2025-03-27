import React, { ReactNode, useRef, useState } from "react"

import "./index.css"



type TextInputProps = {
    placeholder: string
    style: React.CSSProperties
    onInput: any
}

function placeCaretAtStart(span: HTMLSpanElement) {
    span.focus();
    const range = document.createRange();
    // range.setStart(span, 0); 
    range.collapse(true); 
  
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
}

// oninput can come from onkeydown on enter keypress
function TextInput({style, placeholder, onInput}: TextInputProps): [ReactNode, any] {
    const [value, setValue] = useState<string>("")
    const ref = useRef(null)
    const dataEmpty = value.trim() === ''?true:undefined

    // set inital text
    if (ref.current) {
        if ((ref.current as HTMLSpanElement).innerText == "" && value.trim() != "") {
            (ref.current as HTMLSpanElement).innerText = value
        }
    }

    return [
        (
            <span 
                ref={ref}
                style={style} 
                onInput={e => {
                    const target = (e.target as HTMLSpanElement)
                    setValue(target.innerText);
                    onInput(e)
                }} 
                onKeyDown={e => {if (e.key==="Enter"){onInput(e), e.preventDefault()}}}
                contentEditable 
                data-placeholder={placeholder}
                
                data-empty={dataEmpty}
            />   
        ),
        () => value
    ]
}

export default TextInput