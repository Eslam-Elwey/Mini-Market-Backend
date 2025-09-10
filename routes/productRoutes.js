
const express = require('express') ;
const productController = require('../controllers/productController') ;
const authController = require('../controllers/authController');



const router = express.Router() ;



router.route('/')
.get(authController.protectAuthenticatedRoutes,productController.getAllProducts)

.post(authController.protectAuthenticatedRoutes,
    authController.restrictTo('admin'),
    productController.generateId,
    productController.uploadProductImage,
    productController.addNewProduct);

router.route('/:id')
.get(authController.protectAuthenticatedRoutes,productController.getproduct)

.patch( authController.protectAuthenticatedRoutes,
        authController.restrictTo('admin'),
        productController.uploadProductImage,
        productController.updateProduct)

.delete(authController.protectAuthenticatedRoutes,
        authController.restrictTo('admin'),
        productController.deleteProduct) ;


module.exports = router ;