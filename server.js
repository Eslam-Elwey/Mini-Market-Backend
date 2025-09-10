
// #region requires and config
const dotenv = require('dotenv');
const mongoose = require('mongoose') ;
dotenv.config({path: './config.env' });
const app = require('./app') ;
const port = process.env.PORT || 4000 ;

// #endregion


//connect to remote DB
const dbConnectionString = process.env.DATABASE.replace('<db_password>',process.env.PASSWORD) ;
mongoose.connect(dbConnectionString,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(()=>console.log('DB connection sucessfull..'))
  .catch((err)=>{
    console.log(`failed due to ${err}`);
})

mongoose.connection.on('connected', () => {
  console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);
});



// #region ruuning server 
app.listen(port , ()=>{
    console.log(`app listening on port ${port}...`)
});

// #endregion
