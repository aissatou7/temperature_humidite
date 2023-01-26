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
etat: { type:Boolean}
/* dateArchivage: { type: Date}  */


},
{timestamps: true},
{
    collection: 'users'
}

/* {
collection:'books'
} */ );

/* userSchema.plugin(uniqueValidator , { message: "email exite deja"}); */



module.exports = mongoose.model('users', userSchema);
