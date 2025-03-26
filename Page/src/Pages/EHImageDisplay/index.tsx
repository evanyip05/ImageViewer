import { Client } from "../../Client/RouterClient"

type EHImageDisplayProps = {
    client: Client
}

function EHImageDisplay({client}: EHImageDisplayProps) {

    const doFetch = () => {
        client.fetch("/fetchHomepageGalleries", {query:"f_search=cerv"}).then(galleries => {
            const galleryURL = galleries[0]
            client.fetch("/fetchSameOrigin", {route:galleryURL}).then(gallery => {
                const dom = new DOMParser().parseFromString(gallery, "text/html")

                const galleryPageCount = dom.querySelector(".gpc")
                const imageCountSplit = (galleryPageCount as HTMLParagraphElement).innerText.split(" ")
                const totalImages = parseInt(imageCountSplit[imageCountSplit.length-1-1])
                const imagesPerPage = parseInt(imageCountSplit[imageCountSplit.length-1-3])
                const pages = Math.ceil(totalImages/imagesPerPage)

                /* Can do this 3 ways, 
                get the first page and key, open and use the next arrows within the page to get the next keys
                or
                query the gallery grid for the first pages, then get the next page according to the page changing button 
                gets ip banned from excessive request
                already loaded page 0
                or 
                query the grid, then itterate through a single page of the grid, and a single or few images at a time
                */


                console.log(imagesPerPage, totalImages, pages)

                const onLoadedDoms = (doms: Document[]) => {
                    console.log("loaded all doms")
                    let images: string[] = []
                    doms.forEach(dom => {
                        const galleryTable = dom.querySelector(".gt200") // gallery table or smth
                        images.push(...Array.from((galleryTable as HTMLDivElement).children).map(a => (a as HTMLAnchorElement).href))
                    })

                    console.log(images)
                }

                // load all pages
                let doms = new Array(pages)
                doms[0] = dom
                let loadedDoms = 1

                for (let page = 1; page < pages; page++) {
                    console.log("loading page",page)
                    client.fetch("/fetchSameOrigin", {route:galleryURL+"?p="+page}).then(gallery => {
                        const dom = new DOMParser().parseFromString(gallery, "text/html")
                        doms[page] = dom
                        loadedDoms++
                        console.log(loadedDoms + "/" + pages)
                        if (loadedDoms == pages) {
                            onLoadedDoms(doms)
                        }
                    })
                }


        
                // let imagePageUrls = []

                // const getPageUrls = (doc: Document) => {
                //     return new Promise((res,rej) => {
                //         let urls = []
                //         const galleryTable = doc.querySelector(".gt200") // gallery table or smth
                //         const imagePages = Array.from((galleryTable as HTMLDivElement).children).map(a => (a as HTMLAnchorElement).href)
        
                //         const getPage = (i:number) => {
                //             client.fetch("/fetchSameOrigin", {route:imagePages[i]}).then(page => {
                //                 const dom = new DOMParser().parseFromString(page, "text/html")
                //                 urls.push((dom.querySelector("#img") as HTMLImageElement).src)
                //                 if (i+1 <= imagePages.length-1) {
                //                     getPage(i+1)
                //                 } else {
                //                     res(urls)
                //                 }
                //             })
                //         }

                //         getPage(0)
                //     })

                //     // const pageUrlSplit = (galleryTable?.children[0] as HTMLAnchorElement).href.split("-")
                //     // const pageUrl = pageUrlSplit[0] +"-"+ pageUrlSplit[1]
                // }

                // getPageUrls(dom).then(console.log)


                // client.fetch("/fetchSameOrigin", {route:pageUrl+"-1"}).then(page => {
                //     const dom = new DOMParser().parseFromString(page, "text/html")
                //     const image = (dom.querySelector("#img") as HTMLImageElement).src
                //     console.log(image)
                // })
            })
        })
    }

    return (
        <div style={{display:"flex", justifyContent:"center", width:"100%", height:"100%"}}>
            <button style={{height:"20px", transform:"translateY(50vh)"}} onClick={doFetch}>test</button>
        </div>
    )
}

export default EHImageDisplay