//validation
const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema ={
    firstName : Joi.string()
                .min(4)
                .required(),
    lastName : Joi.string()
                .min(4)
                .required(),
    email : Joi.string()
                .min(6)
                .required().email(),
    password : Joi.string()
                .min(6)
                .required(),
    ques1: Joi.string().min(2).required(),
    ques2: Joi.string().min(2).required(),
    ques3: Joi.string().min(2).required()
    };
  return  Joi.validate(data,schema);
};

const loginValidation = data => {
    const schema ={
    email : Joi.string()
                .min(6)
                .required().email(),
    password : Joi.string()
                .min(6)
                .required()
    };
  return  Joi.validate(data,schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;