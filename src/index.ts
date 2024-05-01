
import axios from "axios";
import { createOrder } from "./CreateOrder";
import { cancelAll } from "./CancelOrder";

import { DepthManager } from "./DepthManager";

const solInrMarket= new DepthManager("B-XAI_INR");
const usdtInrMarket = new DepthManager("B-USDT_INR");

const solUsdtMarket = new DepthManager("B-XAI_USDT");


setInterval(() => {
    console.log(solInrMarket.getDepth())
    console.log(usdtInrMarket.getDepth())
    console.log(solUsdtMarket.getDepth())
    // there are two sides you can sit on
    // sell SOL for INR, buy USDT from INR, buy SOL from INR
    // lets say u start with 1 SOL
    const canGetInr = solInrMarket.getDepth().minask - 0.001;
    const canGetUsdt = canGetInr / usdtInrMarket.getDepth().minask;
    const canGetSol = canGetUsdt / solUsdtMarket.getDepth().minask;
    
    console.log(`You can convert ${1} SOL into ${canGetSol} SOL`)

    // Buy SOL from INR, sell SOL for USDT, sell USDT for INR.
    const initialInr = solInrMarket.getDepth().maxbid + 0.001;
    const canGetUsdt2 = solUsdtMarket.getDepth().maxbid;
    const canGetInr2 = canGetUsdt2 * usdtInrMarket.getDepth().maxbid;

    console.log(`You can convert ${initialInr} INR into ${canGetInr2} INR`)
}, 3000)


// const parsedHighestBid: number = parseFloat(highestBid);
// if (!isNaN(parsedHighestBid)) {
//     console.log((parsedHighestBid + 0.01).toFixed(3));
// } else {
//     console.log("highestBid is not a valid number.");
// }

// console.log(`{solInrMarket.getDepth().maxbid}`)



async function main() {
    
    const highestBid = solInrMarket.getDepth().maxbid;
    
    console.log(highestBid);
    // console.log(`placing order for ${parseFloat(highestBid) + 0.01}`);
    // await createOrder("buy", "XAIINR", (parseFloat(highestBid) + 0.01).toFixed(3), 10, Math.random().toString())
    // await new Promise((r) => setTimeout(r, 10000));
    // await cancelAll("XAIINR");
    // await new Promise((r) => setTimeout(r, 1000));
    main();
}


