const catchAsync = require("../utils/catchAsync");
const User = require('../models/userModel.js') ;
const jwt = require('jsonwebtoken');
const AppError = require("../utils/appError.js");


exports.signup = catchAsync(async(req,res,next)=>{

    const user = await User.create({
    first_name :req.body.first_name ,
    last_name : req.body.last_name  ,
    email : req.body.email,
    password :req.body.password ,
    image : req.body.image || 'default.img'

}) ;

if(!user)
{
    return new AppError('this email is already in use ... please use another one' , '404');
}

const token = jwt.sign({id : user._id} ,process.env.JWT_SECRET,{
    expiresIn : process.env.JWT_EXPIRES_IN
})

    res.status(201).json({
        status:'success' ,
        token,
        data : {
            user
        }
    })

})

exports.login = catchAsync(async(req,res,next)=>{

})