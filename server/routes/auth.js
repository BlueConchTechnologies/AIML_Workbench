const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Str = require('@supercharge/strings')

const { registerValidation, loginValidation } = require('../validation');
const { object } = require('@hapi/joi');
var _ = require('lodash');

const JWT_SECRET = "some super secret..."

//============================register=================================

router.post('/register', async (req,res) => {

    //validate the data
   const { error } = registerValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   //Checking if the user is already in the database
   const emailExist = await User.findOne({email: req.body.email});
   if(emailExist) return res.status(400).send('Email already exists');


   //create new user
   const user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser); //res.send({ user: user._id });
    }catch(err) {
        res.status(400).send(err);
    }
});

//=======================login========================

router.post('/login', async (req,res) => {
    //validation
   const { error } = loginValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   //Checking if the email exists
   var emailFailed = {"stauts" : "failed" , "message" : "Email Id Invalid"}
   const user = await User.findOne({email: req.body.email});
   if(!user) return res.status(400).send(emailFailed);

   /*var userName = {"stauts" : "failed" , "message" : "Username is Invalid"}
   const user = await User.findOne({firstName: req.body.firstName});
   if(!user) return res.status(400).send(userName);*/

   //password is correct 
   var passwordFailed = {"stauts" : "failed" , "message" : " Password is Invalid"}
  const validPass = await bcrypt.compare(req.body.password, user.password);
   if(!validPass) return res.status(400).send(passwordFailed);
 
   //create and assign token
   //const result = await User.findByIdAndUpdate(id);
   var token =  Str.random(50) 
    var successResult = {"status" : "success", "authToken" : token,data:user }
   res.send(successResult);

});

//===================By patch update========================
/*
router.patch('/update/:id', async (req,res) => {
   
    
    try {
        const id = req.params.id;
        const updates = {firstName : req.body.firstName, lastName : req.body.lastName}
        const options = {new :true };

        const result = await User.findByIdAndUpdate(id ,updates,options);
        res.send(result);


    } catch (error) {
        res.status(400).send(error);
    }
});*/

//===================update details by id========================
router.put('/update/:id', async function(req, res) {

    const result1 = await User.findByIdAndUpdate({_id: req.params.id},{
        $set : {
            firstName : req.body.firstName,
            lastName  : req.body.lastName
        }
    })
    .then(result=> {
        res.status(200).json({
            "status" : "Details Updated"
        //  updated_details : result1  
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            error :err
        })
    })

});

//======================getUserdata===============

router.get('/account/getUserData/:id', async(req,res) => {
    const user = await User.findOne({_id : req.params.id});
    console.log(user)
    var details = {data : user }
    if(!user) return res.status(400);
    else return res.status(200).send(details);
})
//===================change password by id========================

router.patch('/change_password/:id', async (req,res,next) => {
    console.log('change password');
   /* var emailFailed = {"stauts" : "False" , "message" : "Email not registered"}
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send(emailFailed);*/
    try {
        
        const id = req.params.id;
        console.log(id);
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password,salt);
        const userPassword =await User.findByIdAndUpdate({_id : id}, {password : password}, {new : true});
        return res.status(200).json({status : true, data : userPassword});
    } catch(error) {
        return res.status(400).json({status :false, error: "Error occured"});
    }
    
});

/* ========================change password by email id=============================
router.patch('/change_password/:email', async (req,res,next) => {
    console.log('change password');
    try {
        const email = req.params.email;
        console.log(email);
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password,salt);
        const userPassword =await User.findOneAndUpdate({email : email}, {password : password}, {new : true});
        return res.status(200).json({status : true, data : userPassword});
    } catch(error) {
        return res.status(400).json({status :false, error: "Error occured"});
    }
    
}); */

//=============================================================================
//forgot password

router.post('/forgot_password', async (req,res,next) => {
   var emailFailed = {"stauts" : "failed" , "message" : "Email not registered"}
   console.log()
   const user = await User.findOne({email:req.body.email});
   //console.log(user.password);
  // console.log(user.email);
  // console.log(user._id);
   if(!user) return res.status(400).send(emailFailed);
   //else return console.log('exist');
   
   //create one link 
   const secret = JWT_SECRET + user.password;
   const payload = {
       //email: user.email,
       id: user._id
   }

   const token = jwt.sign(payload,secret, {expiresIn : '15m'})
   const link = `http://localhost:2000/reset_password/${user._id}/${token}`;
   console.log(link);
   res.send('Password reset link has been send');

});

//reset password

router.get('/reset_password/:id/:token', (req,res,next) => {
    const id = req.params;
    const token = req.params;
    console.log(id);
    console.log(token);
   // const { id,token } = req.params;
    //res.send(req.params);
});


router.post('/reset-password', (req,res,next) => {});
//=============================================================================






module.exports = router;