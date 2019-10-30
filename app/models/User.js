const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const Schema = mongoose.Schema   
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator:function(value){
                validator.isEmail(value)
            },
            message: function(){
                return 'Invalid email format'
            }
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    tokens: [
        {
            token: {
                type: String
            },
            createdAt:{
                type: Date,
                default: Date.now
            }
        }
    ]
})
// pre hooks
userSchema.pre('save', function(next){
    const user = this
    if(user.isNew){

        bcryptjs.genSalt(10)
        .then(function(salt){
            //console.log(salt)
            bcryptjs.hash(user.password,salt)
                .then(function(encryptPassword){
                user.password = encryptPassword
                next()
            })
    })
    } else{
        next()
    }
})

//own static method
userSchema.statics.findByCredentials = function(email,password){
    const User = this
    return User.findOne({email})
        .then(function(user){
            if(!user){  // if email doesnt exist
                return Promise.reject({ notice:'invalid email / password'})
            }
            return bcryptjs.compare(password,user.password)
                .then(function(result){
                    if(result){
                        return Promise.resolve(user)  //email found and password correct
                    } else{
                        return Promise.reject({ notice:'invalid email / password'})
                    }
                })

        })
        .catch(function(err){
            return Promise.reject(err)
            //return new Promise(function(resolve,reject){
            //     reject(err)
            // })
        })
}
// own instance methods
userSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }
    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({
        token
    })
    return user.save()
    .then(function(user){
        return Promise.resolve(token)
    })
    .catch(function(err){
       return Promise.reject(err) 
    })
}
userSchema.statics.findByToken = function(token){
    const User = this
    let tokenData
    try{
        tokenData = jwt.verify(token,'jwt@123')
    }catch(err){
        return Promise.reject(err)
    }
    return User.findOne({
        _id: tokenData._id,
        'tokens.token': token
    })
}
// create a model based on the schema
const User = mongoose.model('User',userSchema)

module.exports = {
    User
}