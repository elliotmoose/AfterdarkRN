import {EventRegister} from 'react-native-event-listeners';
import Images from './ImagesManager';
const MerchantsManager = require('./MerchantsManager');
const NetworkManager = require('./NetworkManager');
const UserManager = require('./UserManager');

module.exports.discounts = [];
module.exports.GetDiscounts = async function(){
    console.log("Getting discounts..");
       
    let url = NetworkManager.domain + '/GetDiscounts'

    try {
        let response = await NetworkManager.JsonRequest('GET',{},url);
        module.exports.OnDiscountsLoaded(response.output)
    } catch (error) {
        console.log(error)
        module.exports.OnDiscountsLoaded([])
    }
}

module.exports.OnDiscountsLoaded = function(discounts)
{
    for(var index in discounts)
    {        
        discounts[index].image = Images.images[index%12];
    }

    discounts.sort(module.exports.prioritySort);
	discounts.sort(module.exports.availabilitySort);

    module.exports.discounts = discounts;
    
    EventRegister.emit('DISCOUNTS_LOADED',discounts)
    console.log('DISCOUNTS JUST LOADED ===================')
}

module.exports.addToWallet = async function(discount_id) {
    let url = NetworkManager.domain+'/AddToWallet'

    let body = {
        discount_id: discount_id
    }

    let response = await NetworkManager.JsonRequest('POST',body, url);

    if(!response.error)
    {
        UserManager.loadUserWallet();
    }
    // if(!response.error && response.data && Array.isArray(response.data))
    // {
    //     console.log(response);
    //     UserManager.wallet.discounts = response.data;
    //     EventRegister.emit('WALLET_LOADED',{discounts: response.data});
    // }

    return response
}

module.exports.prioritySort = function(a,b){
    if(a.priority < b.priority)
    {
        return 1
    }
    else if (a.priority > b.priority)
    {
        return -1
    }
}

module.exports.availabilitySort = function(a,b){
    if(a.count < b.count)
    {
        return 1
    }
    else if (a.count > b.count)
    {
        return -1
    }
}

module.exports.claimDiscount = async function(discount_id, merchant_code){
    let url = NetworkManager.domain + '/ClaimDiscount';

    let body = {
        discount_id : discount_id,
        merchant_code: merchant_code
    }

    let response = await NetworkManager.JsonRequest('POST',body,url);

    if(!response.error)
    {
        UserManager.loadUserWallet();
    }
    // if(!response.error && response.data && Array.isArray(response.data))
    // {
    //     console.log(response);
    //     UserManager.wallet.discounts = response.data;
    //     EventRegister.emit('WALLET_LOADED',{discounts: response.data});
    // }

    return response
}