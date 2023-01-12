
const mongoose = require ('mongoose');
/* var uniqueValidator = require('mongoose-unique-validator'); */
const userSchema = mongoose.Schema(

{

prenom: { type:String},
nom: { type:String},
email: { type:String},
matricule: { type:String},
password: { type:String},
role: { type:String},
etat: { type:Boolean},


},
{timestamps: true},

/* {
collection:'books'

} */ );
/* userSchema.plugin(uniqueValidator , { message: "email exite deja"}); */



module.exports = mongoose.model('User', userSchema);


