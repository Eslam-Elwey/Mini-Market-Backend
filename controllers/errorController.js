const AppError = require('./../utils/appError');

const handleDuplicateFieldsDB = err => {
  const value = err.keyValue;
  
  const message = `Duplicate field value: ${JSON.stringify(value)}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>{
  return new AppError('Invalid token. Please log in again!', 401);
}

const handleJWTExpiredError =()=>{
  return new AppError('Your token has expired! Please log in again.', 401);
}

const sendError= (err, res) => {
  console.log(err);
    res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    // stack: err.stack
  });
  
};


module.exports = (err, req, res, next) => {

  err.statusCode = err.statusCode || 500;

  err.status = err.status || 'error';

  let error = { ...err , message: err.message};

  console.log(error.code) ;

  if (error.code === 11000) error = handleDuplicateFieldsDB(error);

  if (error._message === 'User validation failed') error = handleValidationErrorDB(error);

  if (error.name === 'JsonWebTokenError') error = handleJWTError();

  if(error.name==='TokenExpiredError') error = handleJWTExpiredError();

  sendError(error,res) ;
};
