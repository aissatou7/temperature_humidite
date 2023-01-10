const express = require('express');
const app = express();
let UserSchema = require("../model/user.model");

//Here we are going to create a function(middelware) that can get user
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
userExpressRoute.route('/addUser').post((req,res,next) => {
    UserSchema.create(req.body,(error,data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            
        }
    })
});

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