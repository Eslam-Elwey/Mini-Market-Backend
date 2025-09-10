
const express = require('express') ;
const productController = require('../controllers/productController') ;


const router = express.Router() ;



router.route('/')
.get(productController.getAllProducts)
.post(productController.generateId,productController.uploadProductImage, productController.addNewProduct);

router.route('/:id')
.get(productController.getproduct)
.patch(productController.uploadProductImage,productController.updateProduct)
.delete(productController.deleteProduct) ;


module.exports = router ;