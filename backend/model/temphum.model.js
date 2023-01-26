const mongoose = require('mongoose');
const dhtSchema = mongoose.Schema(
    {
temperature8h : {type:Number},
humidite8h : {type:Number},
temperature12h : {type:Number},
humidite12h : {type:Number},
temperature18h : {type:Number},
humidite18h : {type:Number},
temperatureM : {type:Number},
humiditeM : {type:Number},
heure : {type:String},
date : {type:String},
},
{
    collection: 'dht'
}

);
module.exports = mongoose.model('dht', dhtSchema);