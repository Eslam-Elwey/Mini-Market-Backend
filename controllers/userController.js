const User = require('../models/userModel');
const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//#region middlewares

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload an image file.', 404), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserImage = upload.single('image');

exports.resizeUserImage = (req, res, next) => {
  if (!req.file) return next();

    req.file.filename = `user-${req._id||req.params.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 }).
    toFile(`public/img/users/${req.file.filename}`) ;

    next() ;
};

//#endregion

exports.getAllusers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        first_name :req.body.first_name ,
        last_name : req.body.last_name  ,
        email : req.body.email,
        password :req.body.password ,
        image : req.body.image || 'default.img' ,
        _id:req._id ,
        role : req.body.role || 'user' 
    })
 

    res.status(201).json({
        status : 'success' ,
        data : {
            user : newUser
        }
    })

});

exports.getUser = catchAsync(async (req, res, next) => {
    const user =  await User.findById(req.params.id) ;

    //no user found with passed id
    if(!user)
    {
        return next(new AppError('no user found with this ID...',404));
    }

    return res.status(200).json({
        status : 'success' ,
        data : {
            user
        }
    })
});


exports.deleteUser = catchAsync(async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id) ;
    
    if(!user)
    {
        return next(new AppError('no user found with this ID...',404));
    }

    return res.status(200).json({
        status : 'success' ,
        data : null
    })

});
