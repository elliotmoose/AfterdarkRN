const MerchantsManager = require('./MerchantsManager');
const UserManager = require('./UserManager');

const domain = "http://127.0.0.1/api"
// const domain = "http://192.168.0.127:8080/api"

module.exports.domain = domain;

module.exports.JsonRequest = async function(method,body,url)
{
    
    //log in to server
    var data = {
        method: method,
        credentials: 'same-origin',
        mode: 'same-origin',        
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'Authorization' : UserManager.getUserToken()
        }
    }

    if(method == 'POST')
    {
        data.body = JSON.stringify(body);
    }    

    try
    {
        let response = await fetch(url,data);
        let jsonResponse = await response.json();
        return jsonResponse
    }
    catch(e)
    {
        console.log(url)
        console.log(e)
        throw {
            status: 'NO_INTERNET',
            message: "Please check your internet connection"
        }
    }    
}