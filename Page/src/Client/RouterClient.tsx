
// will only work if a router has opened this page
export class Client {
    #responseRoutes = new Map()
    #sourceWindow: Window

    constructor(sourceWindow: Window) {
        this.#sourceWindow = sourceWindow

        window.onmessage = e => {
            const req = e.data


            const handler = this.#responseRoutes.get(req.route)
            if (handler !== undefined) {
                handler({
                    read: () => req.data,
                })
            }
        }
    }

    // data is optional
    // if you register a .then() without a response, code will just never get executed
    fetch(route:string, data:any) {
        // we might never get a response for this route, this is based on wether the router calls c.write
        // shouldnt hurt route capacity, a extra response route should be created in any circumstance
        const response = new Promise<any>((res, _) => {
            this.#responseRoutes.set(route+"Response", (e:any) => {
                res(e.read())
            })
        })

        this.#sourceWindow.postMessage({route:route, data:data}, "*")

        return response
    }
}      