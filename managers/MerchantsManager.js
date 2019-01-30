import {EventRegister} from 'react-native-event-listeners';
import Images from './ImagesManager';
import NetworkManager from './NetworkManager';

module.exports.merchants = [];
module.exports.events = [];

module.exports.GetMerchants = async function(callback){
    console.log("Getting merchants..");
    
    let url = NetworkManager.domain + '/GetMerchants'

    try {
        let response = await NetworkManager.JsonRequest('GET',{},url);
        let merchants = response.output.sort(function(a, b) { 
            return b.priority - a.priority;
        })
        module.exports.OnMerchantsLoaded(merchants)

    } catch (error) {
        console.log(error)
        module.exports.OnMerchantsLoaded([])
    } 
}

module.exports.OnMerchantsLoaded = function(merchants){    
    module.exports.merchants = merchants;
    EventRegister.emit('MERCHANTS_LOADED',merchants);    
}


module.exports.GetEvents = async function(){
    console.log("Getting events..");
    
    let url = NetworkManager.domain + '/GetEvents'

    try {
        let response = await NetworkManager.JsonRequest('GET',{},url);
        module.exports.OnEventsLoaded(response.output);

    } catch (error) {
        console.log(error)
        module.exports.OnEventsLoaded([])
    } 
}

module.exports.OnEventsLoaded = function(events)
{
    for(var index in events)
    {        
        events[index].image = Images.images[index%12];
    }

    module.exports.events = events;
    EventRegister.emit('EVENTS_LOADED',events)
}

module.exports.merchantWithID = (id)=>{
    for(var merchant of module.exports.merchants)
    {
        if(merchant.id == id)
        {
            return merchant
        }
    }

    return null
}