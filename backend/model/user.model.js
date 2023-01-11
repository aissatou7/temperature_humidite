const mongoose = require ('mongoose');

const userSchema = mongoose.Schema(

{
prenom: { type:String},
nom: { type:String},
email: { type:String},
matricule: { type:String},
password: { type:String},
role: { type:String},
etat: { type:String},
},

{
collection:'utilisateur'

}


);

module.exports = mongoose.model('Model' , userSchema);

