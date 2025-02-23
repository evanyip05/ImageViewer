export class Router {
    #routes = new Map()
    #accessorWindow: Window | null
    
    // accessorURL: page that can make calls to this router, needs to have these classes as well
    constructor(accessorURL: string) {
        this.#accessorWindow = window.open(accessorURL)

        window.onmessage = e => {
            const req = e.data
            const handler = this.#routes.get(req.route)

            if (handler !== undefined) {
                handler({
                    read: () => req.data,
                    write: (data: any) => {this.#accessorWindow?.postMessage({route:req.route+"Response", data:data}, "*")}
                })
            }
        }
    }

    // route:string, handler:func(context)
    // currently no support for writing automatic status to the client
    // the context can read the request, and write a response
    EP(route:string, handler:any) {
        this.#routes.set(route, handler)
    }
}