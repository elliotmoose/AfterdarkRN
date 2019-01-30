const NetworkManager = require('./NetworkManager');
const UserManager = require('./UserManager');


module.exports.purchase = async (ticket) =>
{       
    try 
    {
        let url = `${NetworkManager.domain}/PurchaseTicket`;
        let body = {
            ticket_meta_id : ticket.id
        }
    
        let apiResponse = await NetworkManager.JsonRequest('POST', body, url)

        if(apiResponse.success === true)
        {
            UserManager.loadUserWallet();
        }

        return apiResponse
    }   
    catch(error) 
    {
        console.log(error)
        throw error
    }

}


module.exports.verifyTicketPayload = async (payloadString) => {

    let payload = JSON.parse(payloadString);
    if(!payload.ticket_id || !payload.signature)
    {
        throw {
            status: 'ERROR',
            error: {
                status : 'INVALID_TICKET',
                message: 'This is not a valid ticket.'
            }
        }
    }

    let url = `${NetworkManager.domain}/VerifyTicket`;
    
    let response = await NetworkManager.JsonRequest('POST',payload,url);

    if(response.error)
    {
        throw response.error;
    }

    return response
}