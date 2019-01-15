import { Facebook } from 'expo';
import {AsyncStorage} from 'react-native'
const bcrypt = require('react-native-bcrypt')
const NetworkManager = require('./NetworkManager');



module.exports.stripe_customer = null
module.exports.isUser = true
module.exports.isLoggedIn = false
module.exports.loginCallback = function(){}
module.exports.userData = null

module.exports.getUserId = function(){
    console.log('getting user id...')
    if(module.exports.userData === null || module.exports.userData === undefined || module.exports.userData.id === undefined || module.exports.userData.id === null)
    {
        console.log('user not logged in')
        _setLoggedOut();        
        throw 'user not logged in'
    }
    else
    {
        return module.exports.userData.id
    }
}

module.exports.load = async () => {
    try {
        const userDataJSON = await AsyncStorage.getItem('USER_DATA');
        const savedUserData = JSON.parse(userDataJSON);
        if (savedUserData !== null) {
            _setLoggedIn(savedUserData)
        }
        else
        {
            console.log('USER NOT LOGGED IN: KICK TO LOG IN')
        }
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports.save = async () => {
    try {
        await AsyncStorage.setItem('USER_DATA', JSON.stringify(module.exports.userData));          
      } catch (error) {
        console.log(error)
    }
}

module.exports.Login = async (username, password) => {

    let url = `${NetworkManager.domain}/Login`;
    let body = {
        username: username,
        password: password
    }

    let response = await NetworkManager.JsonRequest('POST', body, url)
       
    if(response.success == true) //success
    {
        _setLoggedIn(response.output)
    }
    else if(response.success === undefined || response.success === null) //server said nonsense
    {
        throw "Invalid Server Response"
    }
    else if(response.success == false) //server says login failed
    {
        throw response.output
    }
    else
    {
        throw "Could not login at this time"
    }    
}

module.exports.logout = ()=>{
    _setLoggedOut();
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
                        _setLoggedIn(outcome.output)
                        console.log('Facebook Login Success')
                        return { success: true }
                    }
                    else {
                        console.log(outcome.output)                        
                        return { success: false, message: outcome.output}
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

module.exports.loadStripeUser = async () =>
{
    if(module.exports.userData === null)
    {
        throw "User has not been loaded"
    }

    let url = `${NetworkManager.domain}/RetrieveStripeCustomer`;
    let body = {
        user_id : module.exports.getUserId()
    }

    let response = await NetworkManager.JsonRequest('POST', body, url);

    if(response.success === true)
    {
        module.exports.setStripeCustomer(response.output)
        return response.output;
    }
    else
    {
        console.log(response.output);
        return null;
    }    
}

module.exports.setStripeCustomer = (customer_data)=>
{
    try 
    {
        if(customer_data && customer_data.id && customer_data.id.split('_')[0] === 'cus')
        {
            module.exports.stripe_customer = customer_data;
        }
        else
        {
            throw 'MALFORMED STRIPE CUSTOMER DATA RECEIVED:';
        }   
    }
    catch(error)
    {
        console.log(error);
        console.log(customer_data);
    } 
}
module.exports.validRegister = (username,password,confirmPassword,email,gender,age) => {

    if(isFieldEmpty(username) || isFieldEmpty(email) || isFieldEmpty(password) || isFieldEmpty(confirmPassword))
    {
        throw "Please fill in compulsory fields: username, password, confirm password, email";
    }

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase()))
    {
        throw "Please provide a valid email";
    }

    re = /^\w+$/;
    if(!re.test(username)) {
      throw "Username must contain only letters, numbers and underscores!";
    }

    if(confirmPassword != password)
    {
        throw 'Passwords do not match'
    }

    //allows letters, numbers, !@#$%^&*()_+
    if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
        throw 'Invalid password: invalid characters'
    }

    if (password.length < 6)
    {
        throw 'Invalid password: too short'
    }

    if (password.length > 20)
    {
        throw 'Invalid password: too long'
    }

    if(age !== undefined && age != null && !isNaN(age))
    {
        if (!(age > 0 && age < 100))
        {
            throw 'Please provide a valid age'
        }
    }   
    
    return true
}

module.exports.register = async (username,password,email,gender,age) =>
{
    let hashedPassword = await hashPassword(password);

    let body = {
        username: username,
        password: hashedPassword,
        email : email
    }

    if(gender == "male" || "female")
    {
        body['gender'] = gender
    }
    
    if(age !== undefined && age != null && !isNaN(age))
    {
        if(age > 0 && age < 100)
        {
            
            body['age'] = age
        }
    } 


    let url = `${NetworkManager.domain}/Register`;
    let response = await NetworkManager.JsonRequest('POST', body, url)    
       
    if(response.success == true) //success
    {
        console.log('register success')
        _setLoggedIn(response.output)
    }
    else if(response.success === undefined || response.success === null) //server said nonsense
    {
        throw "Invalid Server Response"
    }
    else if(response.success == false) //server says login failed
    {
        // console.log(response)
        throw response.output
    }
    else
    {
        throw "Could not login at this time"
    }    
}


var hashPassword = async function(password) {
    const saltRounds = 10;
  
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hashedPassword
}

var isFieldEmpty = function(field)
{
    if (field === undefined || field == null || field == "")
    {
        return true
    }

    return false
}

var _setLoggedIn = async function(userData)
{
    console.log('Setting Logged In: ' + JSON.stringify(userData))
    module.exports.userData = userData
    await module.exports.save()
    module.exports.isLoggedIn = true
    module.exports.loginCallback()
}

var _setLoggedOut = async function()
{
    console.log('Logging Out...')
    module.exports.userData = null
    module.exports.stripe_customer = null
    await module.exports.save()
    module.exports.isLoggedIn = false
    module.exports.loginCallback()
}