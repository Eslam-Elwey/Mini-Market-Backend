
const mongoose = require('mongoose') ;

const productSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : [true,'please provide a name for the product'] 
    } ,
    price : {
        type : Number , 
        required : [true,'please provide a price for the product'] 
    } ,
    price : {
        type : Number ,
        default : 25
    },
    description : {
        type : String , 
        required : [true,'please provide a description for the product']
    },
    image : {
        type : String ,
        default : 'default.jpg'
    }
})

const Product = mongoose.model('Product',productSchema,'products') ;

module.exports = Product ;