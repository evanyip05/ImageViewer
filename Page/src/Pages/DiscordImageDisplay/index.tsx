import { useState } from "react"
import { Client } from "../../Client/RouterClient"

type DiscordImageDisplayProps = {
    client: Client
}

let firstRender = true
let scroll = true

function DiscordImageDisplay({client}: DiscordImageDisplayProps) {
    const [images, setImages] = useState<string[]>([])

    if (firstRender) {
        firstRender = false
        client.fetch("/images",{}).then((imgs: string[]) => {
            // console.log(imgs[imgs.length-1])
            setImages(imgs)
            console.log("scrolling up...")
            client.fetch("/scrollUp",{}).then(console.log)
        })
    }

    return (
        <div style={{display:"flex", flexDirection:"column", width:"100%", height:"100%", overflowY:"auto"}} onScroll={e => {
            const target = (e.target as HTMLDivElement)
            if ((target.scrollTop+target.clientHeight)/target.scrollHeight >= .99 && scroll) {
                scroll = false

                // for scrolling through messages from latest to oldest
                console.log("scrolling up...")
                client.fetch("/scrollUp",{}).then(e => {
                    console.log("status:",e)
                    console.log("getting images...")
                    client.fetch("/images",{}).then((newImgs:string[]) => {
                        console.log("got",newImgs.length,"images")
                        setImages([...images, ...newImgs.filter(newImg => !images.includes(newImg))])
                        window.setTimeout(() => scroll = true, 1000)
                    })
                })
            }
        }}>
            {/* DEBUG */}
            {/* <div style={{display:"flex",flexDirection:"column",position:"absolute", top:"10px",left:"10px"}}>
                <button onClick={() => {
                    console.log("getting images...")
                    client.fetch("/images",{}).then((newImgs:string[]) => {
                        console.log(newImgs[newImgs.length-1])

                        // newImgs.forEach(i => imgBuffer.push(i))
                        setImages([...images, ...newImgs.filter(newImg => !images.includes(newImg))])
                    })
                }}>images</button>

                <button onClick={() => {
                    console.log("scrolling up...")
                    client.fetch("/scrollUp",{}).then(e => {
                        console.log(e)
                    })
                }}>scrollUp</button>

                <button onClick={() => {
                    console.log(images)
                }}>printImages</button>
            </div> */}

            {Object.entries(images).map((k,i) => (
                <div key={i} style={{display:"flex", flexDirection:"row", justifyContent:"center", width:"100%", marginBottom:i==images.length-1?"0":"20px"}}>
                    <img style={{width:"75%"}} src={k[1]} alt={k[1]} />
                </div>
            ))}
        </div>
    )
}

export default DiscordImageDisplay