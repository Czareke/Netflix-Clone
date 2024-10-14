const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const userSchema=new mongoose.Schema({
    username:{
        required:[true,'Enter a username'],
        unique:true,
        type:String,
        trim:true,//eliminates space etc
        lowercase:true
    },
    email:{
        required:[true,'Enter Your email'],
        unique:true,
        type:String,
        trim:true,
        lowercase:true,
        validate:[validator.isEmail,'please enter a valid email']
    },
    password:{
        required:[true,'Enter Your password'],
        type:String,
        trim:true,
        minlength:6,
        maxlength:20,
        select:false,
        lowercase:true,
            },
    confirmPassword:{
        type:String,
        required:[true,'Kindly confirm your password'],
        validate:{
            validator:function(value){
                return value===this.password
            },
            message:'Passwords do not match'
        }
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin','author']
    },
    passwordChangedAt:Date,
    PasswordResetToken:String,
    PasswordResetExpires:Date,
    active:{
        type:Boolean,
        default:true,
        select:false
    }
})
userSchema.pre('save',async function(next){
    //only runs when password is modified
    if(!this.isModified('password')) return next()
    //hash password 12 times
    this.password=await bcrypt.hash(this.password,12)
    //passwordConfirm is deleted
    this.confirmPassword=undefined
    this.password=undefined
    next()
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')||this.isNew) return next()
    this.passwordChangedAt=Date.now()-1000
    next()
})
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter=function (JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp=parseInt(this.passwordChangedAt.getTime()/1000,10)
        return JWTTimestamp<changedTimestamp
    }
}
userSchema.createPasswordResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex')
    this.PasswordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    this.PasswordResetExpires=Date.now()+10*60*1000
    return resetToken
    userSchema.pre(/^/,function(next){
        this.find({active:{$ne:false}})
        next()
    })
}
const User=mongoose.model('User',userSchema)
module.exports = User