//  import  express ,{Request ,Response,Express} from "express";
//  import dotenv from "dotenv";
// // const dotenv = require('dotenv');

// dotenv.config();

// const app :Express= express();
// const port = process.env.PORT || 3000;

// app.get('/', (req:Request, res:Response) => {
//   res.send('Express + TypeScript Server');
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });

import axios from "axios";
// import { createOrder } from "./createOrder";
// import cancellAll from "./cancelAll";

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

// const highestBid = solInrMarket.getDepth().maxbid;
// const parsedHighestBid: number = parseFloat(highestBid);
// if (!isNaN(parsedHighestBid)) {
//     console.log((parsedHighestBid + 0.01).toFixed(3));
// } else {
//     console.log("highestBid is not a valid number.");
// }
console.log(`{solInrMarket.getDepth().maxbid}`)
// async function main() {
    
//     const highestBid = solInrMarket.getDepth().maxbid;
//     console.log(`placing order for ${parseFloat(highestBid) + 0.01}`);
//     await createOrder("buy", "XAIINR", (parseFloat(highestBid) + 0.01).toFixed(3), 10, Math.random().toString())
//     await new Promise((r) => setTimeout(r, 10000));
//     await cancellAll("XAIINR");
//     await new Promise((r) => setTimeout(r, 1000));
//     main();
// }


