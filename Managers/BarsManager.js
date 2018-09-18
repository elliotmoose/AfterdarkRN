const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();


module.exports.barsEvent = myEmitter;


var _bars = [];

module.exports.OnBarsLoaded = function(bars){
    _bars = bars

    this.setState({ 
        refresh: !this.state.refresh
    })

    myEmitter.emit('event');
}

module.exports.bars = _bars;