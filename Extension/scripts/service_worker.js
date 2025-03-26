import { InjectFunc, InjectScripts, Transciever } from "./utils.js";
import { DiscordRouterSetup } from "./discordRouter.js";
import { EHRouterSetup } from "./ehRouter.js";


const t = new Transciever()

t.onMessage("popupClicked", (data, sender, sendResponse) => {
    // InjectFunc(DiscordRouterSetup)
    InjectFunc(EHRouterSetup)
    // it shouldnt matter if this is ran again, ittl just redefine all the existing things, shouldnt be loosing any info here.... 
})