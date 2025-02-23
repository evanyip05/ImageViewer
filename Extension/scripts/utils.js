export class Transciever {
    constructor() {
        this.listeners = new Map(); // string, TReceive

        chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
            // console.log("receiving:",req.type)
            this.listeners.get(req.type)?.(req.data, sender, sendResponse)
        })
    }

    // event: string, func: func(data:json, sender:any, sendResp:func(any))
    onMessage(event, func) {
        this.listeners.set(event, func)
    }

    removeOnMessage(event) {
        this.listeners.delete(event)
    }

    sendMessage(event, data) {
        // console.log("sending:",event)
        chrome.runtime.sendMessage({type: event, data:data})
    }
}

export function InjectScripts(...scriptDir) {
    GetCurrentTabID().then(id => {
        chrome.scripting.executeScript({
            target: {tabId: id},
            files: scriptDir,
            // matchAboutBlank: matchAboutBlank
        })
    })
}

export function InjectFunc(func) {
    GetCurrentTabID().then(id => {
        chrome.scripting.executeScript({
            target: {tabId: id},
            func: func
        })
    })
}

export function GetTabData() {
    return new Promise((res, rej) => {
        chrome.tabs.query({active: true, lastFocusedWindow: true }, tabs => {
            let tabMap = new Map()
            tabs.forEach(tab => {
                tabMap.set(tab.id, tab.url)
            });
            res(tabMap)
        });
    })
}

export function GetCurrentTabID() {
    return new Promise((res, rej) => {
        chrome.tabs.query({active: true, lastFocusedWindow: true }, tabs => {
            console.log(tabs[0].url)
            res(tabs[0].id)
        });
    })
}

export function GetCurrentTabURL() {
    return new Promise((res, rej) => {
        chrome.tabs.query({active: true, lastFocusedWindow: true }, tabs => {
            res(tabs[0].url)
        });
    })
}