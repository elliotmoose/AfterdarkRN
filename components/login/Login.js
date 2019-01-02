import React, { Component } from 'react';
import { Alert, Text, Image, ImageBackground, TextInput, Button, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Facebook } from 'expo';

const UserManager = require('../../managers/UserManager');
export default class FacebookLogin extends Component {
    static navigationOptions = {        
        header: null,
    }

    state = {
        username : "",
        password : "",
    }

    componentWillMount()
    {
        this.setState({username : "", password : ""})
    }

    _handleFacebookLogin = async () => {
        let { success, message } = await UserManager.FacebookLogin()
        if (success) {

        }
        else if (message) {
            Alert.alert("Error", message)
        }
    };

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    _login = async () => {
        let username = this.state.username
        let password = this.state.password

        if (username == "" || password == "")
        {
            Alert.alert("Oops!", "Please fill up your username and password!")
            return
        }

        try {
            await UserManager.Login(username, password)
            // Alert.alert("Success!", "Logged In")
        }
        catch (e) {
            Alert.alert("Failed!", `${e}`)
        }
    }

    _signUp = async () => {
        this.props.navigation.navigate('signUp')        
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image resizeMode='cover' source={require('../../assets/Images/Loading.jpg')} style={{ width: '100%', height: '100%' }} />
                </View>

                <Image resizemode='contain' source={require('../../assets/Images/AfterDark_logo_white_tagline.png')} style={{ width: '70%', height: 45, margin: 12, marginBottom: 32, resizeMode: 'contain' }} />
                <TextInput placeholder='Username'
                    autoCapitalize='none'
                    style={styles.usernameField}
                    onChangeText={val => this.onChangeText('username', val)}
                    value={this.state.username}
                ></TextInput>
                <TextInput placeholder='Password'
                    secureTextEntry={true}
                    style={styles.usernameField}
                    onSubmitEditing={this._login}
                    onChangeText={val => this.onChangeText('password', val)}
                    value={this.state.password}
                ></TextInput>

                <TouchableHighlight onPress={this._login} style={styles.loginButton}>
                    <Text style={styles.fbLoginButtonText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={this._signUp} style={[styles.loginButton, styles.signUpButton]}>
                    <Text style={styles.fbLoginButtonText}>Sign Up</Text>
                </TouchableHighlight>


                <TouchableHighlight onPress={this._handleFacebookLogin} style={[styles.loginButton, styles.fbLoginButton]}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Image source={require('../../assets/Images/Facebook_1024.png')} style={{ width: 22, height: 22, margin: 9, marginRight: 16 }} />
                        <Text style={styles.fbLoginButtonText}>Login with Facebook</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    usernameField: {
        width: '70%',
        height: 40,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 12,
        padding: 8,
    },
    loginButton: {
        marginTop: 16,
        height: 40,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#3b984c',
    },
    signUpButton: {
        width: '70%',
        height: 20
    },
    signUpText: {
        marginTop: 0,
        marginBottom: 38,
        color: 'white',
        height: 20,
        fontSize: 12,
        textAlign: 'center'
    },
    signUpButton: {
        backgroundColor: '#3b5998'
    },
    fbLoginButton: {
        backgroundColor: '#3b5998',
    },
    fbLoginButtonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'HelveticaNeue',
        fontSize: 18,
        height: 40,
        lineHeight: 40
    }
})