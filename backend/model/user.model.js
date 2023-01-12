
const mongoose = require ('mongoose');

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

{
collection:'books'

}


);

module.exports = mongoose.model('User' , userSchema);

