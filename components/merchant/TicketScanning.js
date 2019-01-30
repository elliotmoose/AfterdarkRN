import React, {Component} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode';
import {BarCodeScanner, Permissions} from 'expo';
import Modal from 'react-native-modal';
import touchableOpacity from '../react-native-checkout/src/components/common/touchableOpacity';
import { ColdObservable } from 'rxjs/testing/ColdObservable';
import Colors from '../../constants/Colors';
import UserManager from '../../managers/UserManager';
import TicketConfirmation from './TicketConfirmation';

export default class TicketScanning extends Component 
{
    state = {
        hasCameraPermission: null,
        presentingConfirmation: false
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        this._onCodeScanned({type: 'qrcode',data:'{"ticket_id":10653,"signature":"$2a$10$GzNwAEo0/Pj/4LlyQB8s0.ti7EOCr6W/991qlZTwh/RG1fZ3/5vbO"}'})
        this.dismissConfirmation = this.dismissConfirmation.bind(this);
    }

    _onCodeScanned({type,data})
    {
        console.log(type)
        if(!this.state.presentingConfirmation && data)
        {
            this.setState({presentingConfirmation: true, payload: data})
        }
    }   

    dismissConfirmation()
    {
        this.setState({presentingConfirmation: false});
    }

    _renderCamera()
    {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <Text style={{color: 'white'}}>Requesting for camera permission</Text>;
        }
        else if (hasCameraPermission === false) {
            return <Text style={{color: 'white'}}>No access to camera</Text>;
        }
        else
        {
            return <BarCodeScanner onBarCodeRead={this._onCodeScanned} style={{width: '100%', height: '100%'}}/>
        }
    }

    render()
    {
        let self = this;
        return (
            <SafeAreaView style={{flex: 1,backgroundColor: 'black'}}>                
                <Modal isVisible={this.state.presentingConfirmation} style={{margin: 0}}>
                    <TicketConfirmation payload={this.state.payload} dismiss={()=>{
                        self.dismissConfirmation();
                    }} />
                </Modal>
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    <View style={{height: 50, width: '100%', backgroundColor: 'black', flexDirection:'row'}}>
                        <View style={{width: 60, height: '100%', marginLeft: 15}}>

                        </View>
                        <View style={{flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontFamily: 'avenir-mediumm', fontSize: 20, color: 'white'}}>
                                Scan Tickets
                            </Text>
                        </View>
                        <View style={{width: 60, height: '100%', marginRight: 15}}>
                            <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>{
                                UserManager.logout();
                            }}> 
                                <Text style={{color: Colors.themeLight, fontSize: 18, fontFamily: 'avenir-medium'}}>Logout</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{height: '60%', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
                        {this._renderCamera()}
                    </View>
                    
                </View>
            </SafeAreaView>)
    }
}

// export default class BarcodeScannerExample extends React.Component {
//     state = {
//       hasCameraPermission: null,
//     }
  
//     async componentDidMount() {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA);
//       this.setState({ hasCameraPermission: status === 'granted' });
//       }
  
//     render() {
//       const { hasCameraPermission } = this.state;
  
//       if (hasCameraPermission === null) {
//         return <Text>Requesting for camera permission</Text>;
//       }
//       if (hasCameraPermission === false) {
//         return <Text>No access to camera</Text>;
//       }
//       return (
//         <View style={{ flex: 1 }}>
//           <BarCodeScanner
//             onBarCodeScanned={this.handleBarCodeScanned}
//             style={StyleSheet.absoluteFill}
//           />
//         </View>
//       );
//     }
  
//     handleBarCodeScanned = ({ type, data }) => {
//       alert(`Bar code with type ${type} and data ${data} has been scanned!`);/
//     }
//   }