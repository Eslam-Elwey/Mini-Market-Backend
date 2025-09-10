//#region require
const mongoose = require('mongoose');
const Product = require('../models/productModel') ;
const multer = require('multer') ;
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
//#endregion



//#region middleware
const multerStorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'public/img/products');
    } ,
    filename : (req,file,cb) => {
        //product - product id - time stamp .file extension
        const imgExtension = file.mimetype.split('/')[1] ;
        cb(null,`product-${req._id||req.params.id}-${Date.now()}.${imgExtension}`)
    }
})

const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')) 
    {
        cb(null,true) ;
    }
    else 
    {
        cb(new AppError('Not an image! Please upload an image file.','404'),false) ;
    }
            
}

const upload = multer({
    storage : multerStorage ,
    fileFilter : multerFilter
});

exports.uploadProductImage = upload.single('image') ;


//to use it later in multer file name
exports.generateId = (req,res,next)=>{
    req._id = mongoose.Types.ObjectId() ;
    next();
}
//#endregion


//#region route Handlers
exports.getAllProducts = catchAsync(async (req,res,next)=>{

    
    const products = await Product.find() ;
    res.status(200).json({
        status:'success',
        results : products.length,
        data : {
            products
        }
    })

})

exports.addNewProduct = catchAsync(async(req,res,next)=>{

    const newProduct = await Product.create({...req.body,_id:req._id});

    if (req.file) {
        newProduct.image = req.file.filename; 
        await newProduct.save();
    }

    res.status(201).json({
        status : "success" ,
        data : newProduct
    })

    
})

exports.getproduct = catchAsync(async(req,res,next)=>{
    const product =  await Product.findById(req.params.id) ;

    //no product found with passed id
    if(!product)
    {
        return next(new AppError('no product found with this ID...','404'));
    }

    return res.status(200).json({
        status : 'success' ,
        data : {
            product
        }
    })
    
})

exports.updateProduct = catchAsync(async(req,res,next)=>{

    if(req.file)
    {
        req.body.image = req.file.filename ;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,req.body,
        {new : true ,runValidators : true});

        console.log(updatedProduct);

    //no product found with passed id
    if(!updatedProduct)
    {
        return next(new AppError('no product found with this ID...','404'));
    }

    return res.status(200).json({
        status : 'success' ,
        data : {
            updatedProduct
        }
    })
})

exports.deleteProduct = catchAsync(async (req,res,next)=>{
    const product = await Product.findByIdAndDelete(req.params.id) ;

    if(!product)
    {
        return next(new AppError('no product found with this ID...','404'));
    }

    return res.status(200).json({
        status : 'success' ,
        data : null
    })
})

//#endregion