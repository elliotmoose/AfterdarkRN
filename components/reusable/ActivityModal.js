import React,{Component} from 'react';
import {ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';

export default class ActivityModal extends Component
{

    render()
    {
        return (
            <Modal isVisible={this.props.isVisible === undefined ? false : this.props.isVisible } style={{alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator style={{width : 40,height:40}}/>
            </Modal>
        )
    }
}