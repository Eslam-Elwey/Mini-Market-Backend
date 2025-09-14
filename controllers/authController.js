const{promisify} = require('util') ;
const catchAsync = require("../utils/catchAsync");
const User = require('../models/userModel.js') ;
const jwt = require('jsonwebtoken');
const AppError = require("../utils/appError.js");

const signToken = (id) =>{
    return jwt.sign({id} ,process.env.JWT_SECRET,{
    expiresIn : process.env.JWT_EXPIRES_IN
})
}


exports.signup = catchAsync(async(req,res,next)=>{

    const user = await User.create({
    first_name :req.body.first_name ,
    last_name : req.body.last_name  ,
    email : req.body.email,
    password :req.body.password ,
    image : req.body.image || 'default.jpg' ,
    _id:req._id //set from previous middle ware

}) ;

const token = signToken(user._id) ;

if (req.file) {
        user.image = req.file.filename; 
        await user.save();
    }

user.password = undefined;

    res.status(201).json({
        status:'success' ,
        /* token, */
        data : {
            user
        }
    })

})

exports.login = catchAsync(async(req,res,next)=>{

    const {email,password} = req.body ;

    //check if email and password exist on the request 
    if(!email || !password)
    {
        return next(new AppError('please provide email and password!...' , 400)) 
    }


    //check if email and password exist are correct
    const user = await User.findOne({email})?.select('+password');
    //compare passwords
    const correct = await user?.correctPassword(password,user.password) ;

    if(!user || !correct)
    {
        return next(new AppError('Incorrect email or password!...',401));
    }

    //correct email and password

    const token = signToken(user._id) ;

     res.status(200).json({
        status:'success' ,
        token,
        role : user.role ,
		first_name : user.first_name ,
		last_name :  user.last_name,
		image : user.image
		
    })


});

//#region middleware
exports.protectAuthenticatedRoutes = catchAsync(async(req,res,next)=>{

    let token ;

    //extracting token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token = req.headers.authorization.split(' ')[1] ;
    }

    if(!token)
    {
        return next(new AppError('You are not logged in! please log in to get access...',401))
    }

    // verification of token 
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    console.log(decoded)
    //check if user is existed 
    const matchedUser = await User.findById(decoded.id);
    if(!matchedUser)
    {
        return next(new AppError('the user belongs to this token is no longer existes',401));
    }

    req.user = matchedUser ;

    next() ;
})


exports.restrictTo = (...roles)=>{

    return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
}
//#endregion