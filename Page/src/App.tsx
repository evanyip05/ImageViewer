import { useState } from "react"
import { Client } from "./Client/RouterClient"
import Loading from "./Pages/Loading"

import DiscordImageDisplay from "./Pages/DiscordImageDisplay"
import EHImageDisplay from "./Pages/EHImageDisplay"

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

    // return client !== undefined ? <DiscordImageDisplay client={client}/> : <Loading/>
    return client !== undefined ? <EHImageDisplay client={client}/> : <Loading/>
}

export default App
