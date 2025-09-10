
const express = require ('express') ;
const productRouter = require('./routes/productRoutes') ;
const userRouter = require('./routes/userRoutes') ;
const globalErrorHandler = require('./controllers/errorController') ;
const AppError = require('./utils/appError');


const app = express() ;


app.use(express.json()) ;
app.use(globalErrorHandler)


//routes
app.use('/api/v1/products',productRouter) ;
app.use('/api/v1/users',userRouter) ;
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


module.exports = app ;