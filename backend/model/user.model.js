const mongoose = require ('mongoose');
/* var uniqueValidator = require('mongoose-unique-validator'); */
const userSchema = mongoose.Schema(

{
prenom: { type:String, required: false},
nom: { type:String, required: false},
email: {type: String, required: false/* , unique: true */},
matricule: { type:String, required: false},
password: { type:String, required: false},
role: { type:String, required: false},
etat: { type:Boolean, required: false},

},
{timestamps: true},

/* {
collection:'books'

} */ );
/* userSchema.plugin(uniqueValidator , { message: "email exite deja"}); */



module.exports = mongoose.model('User', userSchema);

