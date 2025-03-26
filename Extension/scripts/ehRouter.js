export function EHRouterSetup() {
    console.log("Injected!")

    // needs to be defined because its part of the injection
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
    const router = new Router(test)

    router.EP("/ping", c => {
        c.write("im already here")
    })

    router.EP("/fetchHomepageGalleries", c => {
        console.log("fetching")
        fetch("/?"+c.read().query).then(r=>r.text().then(t => {
            const dom = new DOMParser().parseFromString(t, "text/html")
            const data = Array.from(dom.querySelectorAll(".glname")).map(gl => gl.children[0].href)
            c.write(data)
        }))
    })

    router.EP("/fetchSameOrigin", c => {
        fetch(c.read().route).then(r => r.text().then(c.write))
    })
}

