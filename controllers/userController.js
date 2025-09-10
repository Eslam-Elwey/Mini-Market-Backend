const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllusers = catchAsync(async(req,res,next)=>{
    const users = await User.find() ;
        res.status(200).json({
            status:'success',
            results : users.length,
            data : {
                users
            }
        })
    
})

exports.createUser = catchAsync(async(req,res,next)=>{

})

exports.getUser = catchAsync(async(req,res,next)=>{

})

exports.updateUser = catchAsync(async(req,res,next)=>{

})

exports.deleteUser = catchAsync(async(req,res,next)=>{

})