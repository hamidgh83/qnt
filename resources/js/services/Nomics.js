import request from "./Request.js";
import store from "../stores/nomics";

const MarketService = {  
    getCurrencies: function() {
        let self = this;
        return new Promise(function(resolve, reject) {
            let url = process.env.MIX_API_NOMICS_URL 
                        + '/currencies/ticker?key=' 
                        + process.env.MIX_API_NOMICS_KEY 
                        + "&status=active"
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
