// const domain = "http://34.217.86.210:8080";
// const domain = "http://10.12.87.72:8080";
const domain = "http://127.0.0.1:8080"
// const domain = "http://192.168.0.127:8080"

// const domain = "http://192.168.1.88:8080";
// const domain = "http://172.31.90.255:8080";
module.exports.domain = domain;
module.exports.GetBars = function(callback){
    console.log("Getting bars..");
    fetch(domain + "/GetBarNames").then((response)=>response.json()).then((responseJSON) => {
        callback(responseJSON.message);
    })    
}

module.exports.GetDiscounts = function(callback){
    console.log("Getting discounts..");
    fetch(domain + "/GetDiscounts").then((response)=>response.json()).then((responseJSON) => {
        callback(responseJSON.message);
    })    
}

module.exports.JsonRequest = async function(method,body,url)
{
    //log in to server
    let data = {
        method: method,
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify(body),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
        }
    }

    try
    {
        let response = await fetch(url,data);
        let jsonResponse = await response.json();
        return jsonResponse
    }
    catch(e)
    {
        throw "Please check your internet connection"
    }    
}