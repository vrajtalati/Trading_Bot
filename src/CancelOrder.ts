import dotenv from 'dotenv';

const request = require('request')
const crypto = require('crypto');
const baseurl = "https://api.coindcx.com";
const key = process.env.API_KEY;
const secret = process.env.SECRET_KEY;
dotenv.config();

export const cancelAll = (market: string) => {
    return new Promise<void>((resolve) => {
        const body = {
            market,
            timestamp: Math.floor(Date.now())
        }
    
        const payload = new Buffer(JSON.stringify(body)).toString();
        const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')
    
        const options = {
            url: baseurl + "/exchange/v1/orders/cancel_all",
            headers: {
                'X-AUTH-APIKEY': key,
                'X-AUTH-SIGNATURE': signature
            },
            json: true,
            body: body
        }
    
        request.post(options, function(error:any , response:any, body:any) {
            if (error) {
                console.log("error while cancelling orders");
            } else {
                console.log("acnceleled all orders");
                console.log(body);
            }
            resolve();
        })
    })
   
}