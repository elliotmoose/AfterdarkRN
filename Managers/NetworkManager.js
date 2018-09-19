// const domain = "http://34.217.86.210:8080/";
const domain = "http://10.12.87.72:8080/";
module.exports.domain = domain;
module.exports.GetBars = function(callback){
    console.log("Getting bars..");
    fetch(domain + "GetBarNames").then((response)=>response.json()).then((responseJSON) => {
        callback(responseJSON["output"]);
    })    
}


module.exports.GetBarImages = function(callback){
    console.log("Getting bars images..");
    

}