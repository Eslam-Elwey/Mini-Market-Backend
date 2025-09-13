
const express = require ('express') ;
const path = require ('path') ;
const cors = require ('cors') ;
const productRouter = require('./routes/productRoutes') ;
const userRouter = require('./routes/userRoutes') ;
const globalErrorHandler = require('./controllers/errorController') ;
const AppError = require('./utils/appError');

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.FRONTEND_DOMAIN];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);  // Allow request
    } else {
      callback(new Error('CORS not allowed'), false);  // Reject request
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};



const app = express() ;


app.use(express.json()) ;
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));


//routes
app.use('/api/v1/products',productRouter) ;
app.use('/api/v1/users',userRouter) ;
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler) ;

module.exports = app ;