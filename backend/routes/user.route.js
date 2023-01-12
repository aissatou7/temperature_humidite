const express = require('express');
const app = express();
let UserSchema = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
//Here we are going to create a function(middelware) that can get user
const userExpressRoute = express.Router();

// Login
userExpressRoute.route('/test').post(async (req, res, next)=>{ //'asunc' for make this midleware asynchrone
   
const cle = "MIIEowIBAAKCAQEA0pJxfpy9WqcVEI0FhRb6GqyILM4Fgwp/aC32IMIuGjigD"; // cle secret générer
    let { email, password } = req.body; //recupèration email et password sasie
    let existingUser;
    
    existingUser = await UserSchema.findOne({ email: email });
    if (!existingUser) {
        let code = 'noEmail';
        console.log(code);
        return res.status(404).send("email doesn't exist...!");
    }else if(existingUser.etat == false){
        let code = 'archiver';
        console.log(code);
        return res.status(401).send("user is disabled...!");
    }
    //check if password is correct
    const isPasswordValid = await bcrypt.compare(password, existingUser.password); 
    if (!isPasswordValid) {
        let code = 'pswIncorrect';
        console.log(code);
        console.log(err);
      return res.status(400).send("password is invalid");
    }
    let token;
    try {
      //Creating jwt token
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        // process.env.JWT_SECRET,
          cle,
        { expiresIn: "1h" }
      );
    } catch (err) {
        const error = new Error("Erreur! Quelque chose s'est mal passée.");
        let code = 'errerInc';
        console.log(code);
        console.log(err);
      return next(error);
    }
    res
      .status(200)
      .json({
        success: true,
        data: {
          userId: existingUser.id,
          email: existingUser.email,
          nom: existingUser.nom,
          prenom: existingUser.prenom,
          role: existingUser.role,
          matricule: existingUser.matricule,
          token: token,
          
        },
      });
})


// This middelware show all users
userExpressRoute.route('/').get((req,res) =>{
    UserSchema.find((error,data) =>{
        if (error) {
            return next(error);
        } else {
            res.json(data);
            
        }
    })
});

//This middelware show one user
userExpressRoute.route('/user/:id').get((req,res) => {
    UserSchema.findById(req.params.id,(error,data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            
        }
    });
});

//This middelware create an user 





//This middelware delete one user
userExpressRoute.route('/deleteUser/:id').delete((req,res) => {
    UserSchema.findByIdAndRemove(req.params.id,(error,data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: data
            })
            
        }
    });
});

//This middelware update one user
userExpressRoute.route('/updateUser/:id').put((req,res) => {
    UserSchema.findByIdAndUpdate(req.params.id,{$set: req.body},(error,data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('updated successfully !')
            
        }
    });
});


module.exports = userExpressRoute;