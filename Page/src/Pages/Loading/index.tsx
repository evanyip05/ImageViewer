import { useRef } from "react"

function Loading() {
    const h1ref = useRef<any>(null)

    return (
        <div style={{display:"flex", justifyContent:"center", width:"100%", height:"100%"}}>
            <h1 ref={h1ref} title="Page needs to be opened by another site using window.open()" style={{transform:"translateY(50%)"}}>Loading...</h1>
        </div>
    )
}

export default Loading