const express = require('express') ;
const authController = require('../controllers/authController') ;
const userController = require('../controllers/userController') ;

const router = express.Router() ;


router.post('/signup',authController.signup);
router.post('/login',authController.login);

router.route('/')
.get(   authController.protectAuthenticatedRoutes,
        authController.restrictTo('admin'),
        userController.getAllusers)

.post(  authController.protectAuthenticatedRoutes,
        // authController.restrictTo('admin'),
        userController.createUser) ;

router.route('/:id')
.get(authController.protectAuthenticatedRoutes,
    authController.restrictTo('admin'),
    userController.getUser)

.patch( authController.protectAuthenticatedRoutes,
        authController.restrictTo('admin'),
        userController.updateUser)

.delete(authController.protectAuthenticatedRoutes,
        authController.restrictTo('admin'),
        userController.deleteUser);




module.exports = router ;