import { useState } from "react"
import { Client } from "./Client/RouterClient"
import ImageDisplay from "./Components/ImageDisplay"
import Loading from "./Components/Loading"

let clientSetter: any|undefined = undefined

const clientLoader = window.setInterval(() => {
    if (clientSetter !== undefined && window.opener !== undefined && window.opener !== null) {
        clientSetter(new Client(window.opener))
        clientSetter = undefined
        window.clearInterval(clientLoader)
    }
}, 500)

function App() {
    const [client, setClient] = useState<Client|undefined>(undefined)

    clientSetter = (c:Client) => setClient(c)

    return client !== undefined ? <ImageDisplay client={client}/> : <Loading/>
}

export default App
