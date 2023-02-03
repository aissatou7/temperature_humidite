const mongoose = require('mongoose');

const userSchema = mongoose.Schema(

    {

        prenom: { type: String },
        nom: { type: String },
        email: { type: String },
        matricule: { type: String },
        password: { type: String },
        role: { type: String },
        etat: { type: Boolean }



    },
    { timestamps: true },
    {
        collection: 'users'
    }

);
module.exports = mongoose.model('users', userSchema);
