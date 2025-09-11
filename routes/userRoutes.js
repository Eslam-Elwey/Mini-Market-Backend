const express = require('express') ;
const authController = require('../controllers/authController') ;
const userController = require('../controllers/userController') ;
const { generateId } = require('../controllers/productController');

const router = express.Router() ;


router.post('/signup',generateId,
            userController.uploadUserImage,
            userController.resizeUserImage,
            authController.signup);

router.post('/login',authController.login);

router.route('/')
.get(   authController.protectAuthenticatedRoutes,
        authController.restrictTo('admin'),
        userController.getAllusers)

.post(  authController.protectAuthenticatedRoutes,
        authController.restrictTo('admin'),
        generateId,
        userController.uploadUserImage,
        userController.resizeUserImage,
        userController.createUser) ;

router.route('/:id')
.get(authController.protectAuthenticatedRoutes,
    authController.restrictTo('admin'),
    userController.getUser)

.delete(authController.protectAuthenticatedRoutes,
        authController.restrictTo('admin'),
        userController.deleteUser);




module.exports = router ;