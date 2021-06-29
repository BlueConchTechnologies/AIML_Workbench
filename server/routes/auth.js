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



//========================get=================================
router.get('/test', (req,res) => {
    res.send('Hello world');
})

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
        password : req.body.password,
        ques1 : req.body.ques1,
        ques2 : req.body.ques2,
        ques3 : req.body.ques3
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser); //res.send({ user: user._id });
    }catch(err) {
        res.status(400).send(err);
    }
});

//==================================login=====================================

router.post('/login', async (req,res) => {
    //validation
   const { error } = loginValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   //Checking if the email exists
   var emailFailed = {"stauts" : "failed" , "message" : "Email Id Invalid"}
   const user = await User.findOne({email: req.body.email});
   if(!user) return res.status(400).send(emailFailed); 

   //password is correct 
   var passwordFailed = {"stauts" : "failed" , "message" : " Password is Invalid"}
  const validPass = await bcrypt.compare(req.body.password, user.password);
   if(!validPass) return res.status(400).send(passwordFailed);
 
   //create and assign token
   //const result = await User.findByIdAndUpdate(id);
   console.log(user);
    var token =  Str.random(50) 
    var successResult = {"status" : "success", "authToken" : token , data : user}
    res.send(successResult);

});

//================get usser data======================

router.get('/account/getUserData/:id', async(req,res) => {
    const user = await User.findOne({_id : req.params.id});
    console.log(user)
    var details = {data : user }
    if(!user) return res.status(400);
    else return res.status(200).send(details);
})

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

//===================change password by id for update api========================

router.patch('/change_password/:id', async (req,res,next) => {
    console.log('change password');
    /*var emailFailed = {"stauts" : "False" , "message" : "Email not registered"}
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send(emailFailed);*/
    try {
        
        const id = req.params.id;
        console.log(id);
        console.log(bcrypt);
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password,salt);
        console.log(password);
        const userPassword =await User.findByIdAndUpdate({_id : id}, {password : password}, {new : true});
        return res.status(200).json({status : true, data : userPassword});
    } catch(error) {
        console.log(error);
        return res.status(400).json({status :false, error: "Error occured"});
    }
    
});



//=====================Match security question answer========================================
router.post('/question/:id', async (req,res) => {
    const user = await User.findOne({_id : req.params.id});
    console.log(user);
    console.log(user.ques1);
    const ques1 = req.body.ques1;
    const ques2 = req.body.ques2;
    const ques3 = req.body.ques3;
    if(ques1 == user.ques1 && ques2 == user.ques2 && ques3 == user.ques3){
       return res.status(200).json({status : true, message : 'Match'})
    }
    else{
        return res.status(400).json({status : false, message : 'Not Match'})
    }
})


//============================match security question answer by email========================================
router.post('/question', async (req,res) => {
    const user = await User.findOne({email : req.body.email});
    console.log(user);
    console.log(user.ques1);
    const ques1 = req.body.ques1;
    const ques2 = req.body.ques2;
    const ques3 = req.body.ques3;
    if(ques1 == user.ques1 && ques2 == user.ques2 && ques3 == user.ques3){
       return res.status(200).json({data: user, status : true, message : 'Match'})
    }
    else{
        return res.status(400).json({status : false, message : 'Not Match'})
    }
});

//================================change-password for forgot password api====================================

router.patch('/change-password/:id', async (req,res,next) => {
    console.log('change password');
    /*var emailFailed = {"stauts" : "False" , "message" : "Email not registered"}
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send(emailFailed);*/
    try {
        
        const id = req.params.id;
        console.log(id);
        console.log(bcrypt);
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password,salt);
        console.log(password);
        const userPassword =await User.findByIdAndUpdate({_id : id}, {password : password}, {new : true});
        return res.status(200).json({status : true, data : userPassword});
    } catch(error) {
        console.log(error);
        return res.status(400).json({status :false, error: "Error occured"});
    }
    
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

module.exports = router;