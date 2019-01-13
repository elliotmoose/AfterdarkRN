import {EventRegister} from 'react-native-event-listeners';
import Images from './ImagesManager';

module.exports.merchants = [];
var discounts = [];
var events = [];
module.exports.OnMerchantsLoaded = function(merchants){    
    module.exports.merchants = merchants;
    EventRegister.emit('MERCHANTS_LOADED',merchants);    
}

module.exports.OnDiscountsLoaded = function(discounts)
{
    for(var index in discounts)
    {        
        discounts[index].image = Images.images[index%12];
    }

    module.exports.discounts = discounts;
    EventRegister.emit('DISCOUNTS_LOADED',discounts)
}

module.exports.OnEventsLoaded = function(events)
{
    for(var index in events)
    {        
        events[index].image = Images.images[index%12];
    }

    module.exports.events = events;
    EventRegister.emit('EVENTS_LOADED',discounts)
}



module.exports.discounts = discounts;
module.exports.events = events;

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