// const domain = "http://34.217.86.210:8080";
// const domain = "http://10.12.87.72:8080";
const domain = "http://127.0.0.1:8080"
// const domain = "http://192.168.1.88:8080";
// const domain = "http://172.31.90.255:8080";
module.exports.domain = domain;
module.exports.GetBars = function(callback){
    console.log("Getting bars..");
    fetch(domain + "/GetBarNames").then((response)=>response.json()).then((responseJSON) => {
        callback(responseJSON["output"]);
    })    
}

module.exports.GetDiscounts = function(callback){
    console.log("Getting discounts..");
    fetch(domain + "/GetDiscounts").then((response)=>response.json()).then((responseJSON) => {
        callback(responseJSON["output"]);
    })    
}