import {EventRegister} from 'react-native-event-listeners'

var bars = [];

module.exports.OnBarsLoaded = function(bars){    
    this.bars = bars;
    EventRegister.emit('BARS_LOADED');
}

module.exports.bars = bars;