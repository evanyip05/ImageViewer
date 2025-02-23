import { GetCurrentTabURL, GetTabData, InjectFunc, InjectScripts, Transciever } from "./utils.js";

const t = new Transciever()

t.onMessage("popupClicked", (data, sender, sendResponse) => {
    InjectFunc(RouterSetup)
    // it shouldnt matter if this is ran again, ittl just redefine all the existing things, shouldnt be loosing any info here.... 
})

function RouterSetup() {
    console.log("Injected!")

    class Router {
        #routes = new Map()
        #accessorWindow
        
        // accessorURL: page that can make calls to this router, needs to have these classes as well
        constructor(accessorURL) {
            this.#accessorWindow = window.open(accessorURL)
            console.log("Opened accessor!")

            window.onmessage = e => {
                const req = e.data
                const handler = this.#routes.get(req.route)

                if (handler !== undefined) {
                    handler({
                        read: () => req.data,
                        write: (data) => {this.#accessorWindow.postMessage({route:req.route+"Response", data:data}, "*")}
                    })
                }
            }
        }

        // route:string, handler:func(context)
        // currently no support for writing automatic status to the client
        EP(route, handler) {
            console.log("Registering route",route+"...")
            this.#routes.set(route, handler)
        }
    }

    const prod = "https://evanyip05.github.io/ImageViewer"
    const test = "http://localhost:5173"

    console.log("Opening accessor...")
    const router = new Router(prod)

    // these are functions cause the results will change as we scroll
    const msgs = () => document.querySelectorAll("[class^=scroller]")[2] // might have to change this guy as needed
    const imgs = () => Array.from(document.querySelectorAll("[class^=originalLink]")).map(img => img.href)

    router.EP("/ping", c => {
        c.write("im already here")
    })

    router.EP("/images", c => {
        const currentImgs = imgs().reverse()
        console.log("sending imgs:",currentImgs)
        c.write(currentImgs)
    })

    router.EP("/scrollUp", c => {
        const currentMsgs = msgs()
        console.log("scrolling up:",currentMsgs)
        currentMsgs.scrollTo(0,-currentMsgs.scrollTop)
        c.write("OK")
    })
}

