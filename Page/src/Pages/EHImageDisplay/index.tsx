import { useState } from "react"
import { Client } from "../../Client/RouterClient"
import ImageIcon from "../../Components/ImageIcon"
import SearchIcon from "../../Components/SearchIcon"

import TextInput from "../../Components/TextInput"

type EHImageDisplayProps = {
    client: Client
}


function EHImageDisplay({client}: EHImageDisplayProps) {
    const [searchValue, setSearchValue] = useState<string>("")

    // search field
    const [Search, getSearchValue] = TextInput({
        style:{width:"40%", padding:"0px 10px", lineHeight:"5vh", border:"none", borderRadius:"7px 0 0 7px", outline:"none", backgroundColor:"darkGrey"}, 
        placeholder:"Search", 
        onInput:(e: any) => {if (e?.key == "Enter") {setSearchValue(getSearchValue())}}
    })

    return (
        <div style={{display:"flex", flexDirection:"column", width:"100%", height:"100%"}}>

            {/* NAVBAR */}
            <div style={{display:"flex", flexDirection:"row", width:"100%", height:"6%", backgroundColor:"grey"}}>
                {/* LEFT */}
                <div style={{display:"flex", flexDirection:"row",width:"auto", height:"100%", padding:".5vh", flexGrow:"1"}}>
                    <div style={{display:"flex", justifyContent:"center", width:"7.5vh", height:"5vh", marginRight:"1vh"}}>
                        <ImageIcon style={{width:"100%", height:"100%"}}/>
                    </div>

                    {Search}

                    <div style={{width:"5vh", height:"100%", padding:".5vh", borderRadius:"0 7px 7px 0", backgroundColor:"red"}} onClick={() => setSearchValue(getSearchValue())}>
                        <SearchIcon style={{width:"100%", height:"100%"}}/>
                    </div>
                </div>

                {/* RIGHT */}
                <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
                    <div style={{height:"100%", padding:"0 10px", lineHeight:"6vh", backgroundColor:"darkgray"}}>
                        login
                    </div>
                    <div style={{height:"100%", padding:"0 10px", lineHeight:"6vh", backgroundColor:"red"}}>
                        reigster
                    </div>
                </div>
            </div>


            {/* CONTENT */}
            <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto", flexGrow:"1", overflowY:"auto", backgroundColor:"dimgrey"}}>
                <div style={{display:"flex", justifyContent:"center", width:"100%", minHeight:"50px", padding:"10px 0"}}>
                    <div style={{height:"100%", padding:"0 10px", borderRadius:"7px", lineHeight:"30px", backgroundColor:"grey"}}>
                        Search: {searchValue}
                    </div>
                </div>

                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,1,1,1,1,1,1,1,1,1,12,13,14,15,16,17,18,19,20].map(d => (
                    <div style={{display:"flex", flexDirection:"row", width:"100%", minHeight:"50px"}}>
                        <div>{d}</div>
                        <div>.    title</div>
                        <div>.     link</div>
                    </div>
                ))}



                {/* <div style={{display:"flex", flexDirection:"row", width:"100%", height:"50px"}}>
                    <div>thumb</div>
                    <div>.    title</div>
                    <div>.     link</div>
                </div> */}

                {/* <div style={{display:"flex", justifyContent:"center", width:"100%", height:"100%"}}>
                    <button style={{height:"20px", transform:"translateY(50vh)"}} onClick={() => {console.log(getValue())}}>test</button>
                </div> */}

            </div>
        </div>

    )
}

export default EHImageDisplay

/*

    const doFetch = () => {
        client.fetch("/fetchHomepageGalleries", {query:"f_search="}).then(galleries => {
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
                /


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

*/