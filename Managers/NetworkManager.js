const domain = "http://34.217.86.210:8080/";

module.exports.GetBars = function(callback){
    console.log("Getting bars..");
    fetch(domain + "GetBarNames").then((response)=>response.json()).then((responseJSON) => {
        callback(responseJSON["output"]);
    })    
}