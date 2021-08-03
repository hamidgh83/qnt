import request from "./Request.js";

const MarketService = {  
    getCurrencies: function() {
        let self = this;
        return new Promise(function(resolve, reject) {
            let url = process.env.MIX_API_NOMICS_URL 
                        + '/currencies/ticker?key=' 
                        + process.env.MIX_API_NOMICS_KEY 
                        + "&status=active"
                        + "&per-page=200&page=1"
            request({
                url: url,
                method: "get"
            }).then(function(response) {
                return resolve(response)
            })
        })
    },
    
    getMarkets: function(currency) {
        let self = this;
        return new Promise(function(resolve, reject) {
            let url = process.env.MIX_API_NOMICS_URL 
                        + '/markets?key=' 
                        + process.env.MIX_API_NOMICS_KEY 
                        + "&base=" + currency
            request({
                url: url,
                method: "get"
            }).then(function(response) {
                return resolve(response)
            })
        })
    }
};

export default MarketService;
