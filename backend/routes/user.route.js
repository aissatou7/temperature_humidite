const express = require('express');

const app = express();
let UserSchema = require("../model/user.model");
let tempSchema = require("../model/user.model2");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const TemperahumSchema = require('../model/temphum.model')
//Here we are going to create a function(middelware) that can get user
const userExpressRoute = express.Router();

// Login
userExpressRoute.route('/test').post(async (req, res, next) => { //'asunc' for make this midleware asynchrone

    const cle = "MIIEowIBAAKCAQEA0pJxfpy9WqcVEI0FhRb6GqyILM4Fgwp/aC32IMIuGjigD"; // cle secret générer
    let { email, password } = req.body; //recupèration email et password sasie
    let existingUser;

    existingUser = await UserSchema.findOne({ email: email });
    if (!existingUser) {

        return res.status(200).json({ message: "email doesn't exist...!", code: "noEmail" });
        //return res.status(404).send("email doesn't exist...!");
    } else if (existingUser.etat == false) {

        return res.status(200).json({ message: "user is disabled...!", code: "compteNoActive" });

        //return res.status(401).send("user is disabled...!");
    }
    //check if password is correct
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {

        return res.status(200).json({ message: "password is invalid", code: "noPassword" });
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

        const error = new Error({ message: "Erreur! Quelque chose s'est mal passée.", code: "erreur" });
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
userExpressRoute.route('/').get((req, res) => {
    UserSchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);

        }
    })
});
// This middelware show all users
userExpressRoute.route('/temp').get((req,res) =>{
    tempSchema.find((error,data) =>{
        if (error) {
            return next(error);
        } else {
           

                res.json(data);
            
            
        }
    })
});
// This middelware show temperature and humidite
// userExpressRoute.route('/tempHum').get((req,res) =>{

//         parser.on('data', (data)=>{
//             io.emit('temp',data)
//             res.json(data)
//         })
                
    
       
            
        
    
// });

//middelware show all temphum
userExpressRoute.route('/temp').get((req, res) => {
let temp = require('../server')
res.json(temp)

});

//This middelware show one user
userExpressRoute.route('/user/:id').get((req, res) => {
    UserSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);

        }
    });
});

//This middelware create an user 

userExpressRoute.route('/post').post(async (req, res) => {

    const { nom, prenom, email, matricule, password, role, etat } = req.body;

    /*  const users = [];
      */
    const newUser = UserSchema({
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
            return res.status(200).json({ message: "Email Already Exist. Please Login", emailExiste: true });
        }

        const hash = await bcrypt.hash(newUser.password, 10);
        newUser.password = hash;
        /*  users.push(newUser); */
        // res.json(newUser);
        await newUser.save();

        res.status(201).json(newUser);

    } catch (error) {
        res.status(400).json({ message: "inscription echouer" })
    }

})




//This middelware update one tempethum
userExpressRoute.route('/updateTemp/:date').get((req, res, next) => {
    console.log(req.params);
    TemperahumSchema.findOne({date: req.params.date}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('updated successfully !')

        }
    });
});






//This middelware delete one user
userExpressRoute.route('/deleteUser/:id').delete((req, res) => {
    UserSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
userExpressRoute.route('/updateUser/:id').put((req, res) => {
    UserSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('updated successfully !')

        }
    });
});


//modifier mot de passe

userExpressRoute.patch('/updateUser/:id', async(req, res) => {

    console.log(req.params.id);
    // try {
          let { actuelPass, newPass } = req.body;
  
          const id = req.params.id;
          const updatedData = req.body;
          const options = { new: true };
          let user= UserSchema.findById({"_id": req.params.id});
                console.log(user);
          if(!user){
            return res.status(404);
          };
  
          if (updatedData.actuelPass){
              user.then(async(e)=> {
  
                    if(await bcrypt.compare(actuelPass, e.password)){
                        const hash = await bcrypt.hash(newPass, 10);
                          updatedData.password = hash;
                          const result = await UserSchema.findByIdAndUpdate(
                          id, updatedData, options
                          );
                      
                        return res.send(result);
                    }
                    return res.send('no corres');
              });   
      
          }else{
            const result = await UserSchema.findByIdAndUpdate(
                  id, updatedData, options
              )
      
              return res.send(result)
          }
          
          
          
    //
  
     
  
    
  });


        module.exports = userExpressRoute;
