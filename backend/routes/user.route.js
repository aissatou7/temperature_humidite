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
       
         return res.status(200).json({message: "email doesn't exist...!",code: "noEmail" });
        //return res.status(404).send("email doesn't exist...!");
    }else if(existingUser.etat == false){
       
         return res.status(200).json({message:"user is disabled...!",code: "compteNoActive"});

        //return res.status(401).send("user is disabled...!");
    }
    //check if password is correct
    const isPasswordValid = await bcrypt.compare(password, existingUser.password); 
    if (!isPasswordValid) {
        
         return res.status(200).json({message:"password is invalid",code:"noPassword"});
      //return res.status(400).send("password is invalid");
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
        
        const error = new Error({message: "Erreur! Quelque chose s'est mal passée.",code: "erreur"});
        //const error = new Error("Erreur! Quelque chose s'est mal passée.");
       
       return next(error);
    }
    res.status(200).json({
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
userExpressRoute.route('/updateUser/:id').put(async (req,res,next)=> {

   /// email = req.body
    //existeEmail = await UserSchema.findOne({email: email})
    // if (! existeEmail) {
    //     res.status(200).json({message: "email existe dèjà",codeA: "true"});
    // }
    UserSchema.findByIdAndUpdate(req.params.id,{$set: req.body},async (data) => {
            res.json(data);
            console.log('updated successfully !')
            
        
    });
});


module.exports = userExpressRoute;