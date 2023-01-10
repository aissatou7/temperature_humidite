const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    email: {type: String, required: false, unique: true},
    matricule: {type: String, required: false},
    password: {type: String, required: false},
    role: {type: String, required: false},
    etat: {type: Number, required: false}
},
{
    collection: 'books'
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);