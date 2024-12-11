const express = require('express');
const router = express.Router();
const {body} =  require('express-validator')
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/register',[
        body("email").isEmail().withMessage("Please enter a valid email address"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Full name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be 3 letters'),
    body('vehicle.plate').isLength({min:3}).withMessage("Plate  must be 3 letters")  ,
    body('vehicle.capacity').isLength({ min: 1 }).withMessage("Capacity must be at least 1 characters long"),   
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Vehicle type can only be car, motorcycle or auto') , 
  ],captainController.registerCaptain);

router.post('/login',[
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body('password').isLength({min:8}).withMessage('Password must be 8 char long')
], captainController.loginCaptain);


router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile );

router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain);

module.exports = router;