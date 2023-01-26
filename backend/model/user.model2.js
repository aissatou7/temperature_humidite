const mongoose = require ('mongoose');
/* var uniqueValidator = require('mongoose-unique-validator'); */
const tempsSchema = mongoose.Schema(

{
date: { type:String},

temperature8h: { type:String},
humidity8h: { type:String},
temperature12h: { type:String},
humidity12h: { type:String},
temperature18h: { type:String},
humidity18h: { type:String},
temperatureM: { type:String},
humidityM: { type:String},

});

module.exports = mongoose.model('gest-temp-humi', tempsSchema);
