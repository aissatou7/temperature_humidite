const express = require('express');
let UserSchema = require("../model/user.model")
const bcrypt = require("bcrypt");
const userExpressRoute = express.Router(); 
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

userExpressRoute.route('/post').post(  async(req, res) => {

    const { nom, prenom, email, matricule, password,role, etat} = req.body;
    
   /*  const users = [];
     */
    const newUser = UserSchema ({
        nom,
        prenom, 
        email,
        matricule,
        password, 
        role,
        etat,
      
       
    });
    
    try {
    
        const oldUser = await UserSchema.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("Email Already Exist. Please Login");
        }
    
        const hash = await bcrypt.hash(newUser.password, 10);
        newUser.password = hash;
       /*  users.push(newUser); */
        // res.json(newUser);
        await newUser.save();
    
        res.status(201).json(newUser);
    
    } catch(error) {
        res.status(400).json({message: "inscription echouer"})
    }
    
    })



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