
export class DepthManager {
    private market:string;
     bids:{
      [key:string]:string
    };
       asks:{
        [key:string]:string
       };
  
    constructor(market:string) {
      this.market=market;
      this.bids={};
      this.asks={};
  
      setInterval(() => {
        this.pollMarket();
    }, 3000);
  }
  
        async pollMarket()
        {
          try {
  
            const res = await fetch(`https://public.coindcx.com/market_data/orderbook?pair=${this.market}`);
            const depth = await res.json();
            this.bids = depth.bids;
            this.asks = depth.asks;
          } catch (error) {
               console.log(error);
          }
        }
  
        getDepth(){
          let maxbid=-1;
          let minask=10000000;
  
          Object.keys(this.bids).map(x=>{
            if(parseFloat(x)>maxbid)
              {
                maxbid=parseFloat(x);
              }
          })
  
          Object.keys(this.asks).map(x=>{
            if(parseFloat(x)<minask)
              {
                minask=parseFloat(x);
              }
              
          })
  
          return {maxbid,minask};
        
  
    }
  }