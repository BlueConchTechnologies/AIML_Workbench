const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Define Schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
        
    },
    date : {
        type: Date,
        default: Date.now
    },
    ques1 : {
        type : String,
        required: true,
    },
    ques2 : {
        type : String,
        required: true,
    },
    ques3 : {
        type : String,
        required: true,
    }
    
});


//hash the password
/*userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});*/


//generation token
/*
const JWT_SECRET = "some super secret..."
userSchema.methods.generateAuthToken = async function() {
    try {
        console.log(this._id)
        const token = jwt.sign({_id:this._id.toString()},JWT_SECRET);
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        console.log(token);
        return token;

    }catch(error) {
        res.send("error part" + error);
        console.log("error" +error);
    }

}*/

userSchema.pre('save',  function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            user.verify = hash
            next();
        });
    });
});




module.exports = mongoose.model('User', userSchema);