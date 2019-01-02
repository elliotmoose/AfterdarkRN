import {EventRegister} from 'react-native-event-listeners';
import Images from './ImagesManager';

var bars = [];
var discounts = [];
module.exports.OnBarsLoaded = function(bars){    
    this.bars = bars;
    EventRegister.emit('BARS_LOADED',bars);    
}

module.exports.OnDiscountsLoaded = function(discounts)
{

    for(var index in discounts)
    {        
        discounts[index].image = Images.images[index%12];
    }

    this.discounts = discounts;
    EventRegister.emit('DISCOUNTS_LOADED',discounts)
}

module.exports.bars = bars;
module.exports.discounts = discounts;