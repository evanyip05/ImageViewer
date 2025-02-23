import { useEffect, useState } from "react"
import { Client } from "./Client/RouterClient"

let found = false

function App() {
    const [client, setClient] = useState<Client|undefined>(undefined)

    useEffect(() => {
        if (!found && window.opener !== undefined && window.opener != null) {
            found = true
            setClient(new Client(window.opener))
        }  
    }, [window.opener])

    return (
        <div>
            <button onClick={() => client?.fetch("/ping",{data:"aaaa"}).then(console.log)}>test</button>
        </div>
    )
}

export default App
