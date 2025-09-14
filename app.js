const express = require('express');
const path = require('path');
const cors = require('cors');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.LOCAL_DOMAIN,      // http://localhost:4200
      process.env.FRONTEND_DOMAIN    // https://mini-market-frontend-eight.vercel.app
    ];

    console.log('Incoming Origin:', origin);

    // ✅ Allow requests with no origin (Postman, curl, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    // ✅ Allow localhost:4200 and Vercel frontend
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS not allowed for origin: ${origin}`), false);
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // allow cookies/tokens
};

const app = express();

// ✅ Apply CORS before routes
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

// Unknown routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handler
app.use(globalErrorHandler);

module.exports = app;
