const mongoose = require('mongoose') ;
const validator = require('validator') ;
const bcrypt = require('bcryptjs') ;

const userSchema = new mongoose.Schema({
    first_name : {
        type : String ,
        rquired : [true,'please provide a first name....']
    } ,
    last_name : {
        type : String ,
        rquired : [true,'please provide a last name....']
    } ,
    email : {
        type : String ,
        rquired : [true,'please provide an email....'],
        unique : true,
        lowercase : true ,
        validate : [validator.isEmail , 'please provide a valid email']
    } ,
    password : {
        type : String ,
        rquired : [true,'please provide a password....'],
        minlength : 8 ,
        select : false //not to send it back in response
    },
    image : {
        type : String ,
        default : 'default.jpg'
    },
    role : {
        type : String ,
        enum : ['user' , 'admin'] ,
        default : 'user' 
    }
})

userSchema.pre('save',async function(next){

    if(!this.isModified('password')) return next() ;

    this.password = await bcrypt.hash(this.password,12) ;

    next() ;
}) ;

userSchema.methods.correctPassword = async function (candidatePassword,userPassword)
{
    return await bcrypt.compare(candidatePassword,userPassword) ;
}

const User = mongoose.model('User',userSchema,'users') ;

module.exports = User ;

