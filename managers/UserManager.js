import { Facebook } from 'expo';
const NetworkManager = require('./NetworkManager')

module.exports.Login = async (username, password) => {

    let url = `${NetworkManager.domain}/Login`;
    let body = {
        username: username,
        password: password
    }

    let response = await NetworkManager.JsonRequest('POST', body, url)
        
    if(response.success === undefined || response.success === null) //server said nonsense
    {
        throw "Invalid Server Response"
    }
    
    if(response.success == false) //server says login failed
    {
        throw response.message
    }
}

module.exports.FacebookLogin = async () => {
    try {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            '103834726804685', // Replace with your own app id in standalone app
            { permissions: ['public_profile', 'email'] }
        );

        switch (type) {

            case 'success': {
                // Get the user's name using Facebook's Graph API
                const fbresponse = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,name`);
                const profile = await fbresponse.json();

                if (profile.error) {
                    return { success: false, message: profile.error.message }
                }
                else {
                    //logged in 
                    let email = profile.email
                    let id = profile.id
                    let name = profile.name
                    console.log(`${name} ${id} ${email}`)

                    //log in to server
                    let data = {
                        method: 'POST',
                        credentials: 'same-origin',
                        mode: 'same-origin',
                        body: JSON.stringify({
                            id: id,
                            email: email,
                            name: name
                        }),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        }
                    }

                    //creates or logs in for facebook user
                    const response = await fetch(NetworkManager.domain + "/FacebookLogin", data)
                    const outcome = await response.json()

                    if (outcome.success) {

                        return { success: true }
                    }
                    else {
                        console.log(outcome.message)
                        return { success: false, message: "Facebook Login Failed"}
                    }
                }
                break;
            }
            case 'cancel': {
                break;
            }
            default: {
            }
        }
    } catch (e) {
        console.log(e)
        return { success: false, message: "Login failed - please check your connection" }
    }

    return { success: false }
}

