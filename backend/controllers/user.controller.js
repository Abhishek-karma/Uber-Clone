const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const validationResult = require("express-validator").validationResult;
const BlacklistedToken = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const hashedPassword = await userModel.hashPassword(password);

  try {
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastName: fullname.lastName,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};


module.exports.loginUser = async (req, res, next) => { 
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if(!user){
        return res.status(401).json({ error: "Invalid Credentials"})
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" })
    }

    const token = user.generateAuthToken();
    res.cookie('token',token)
    res.status(200).json({token,user});
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
}


module.exports.logOut = async (req, res, next)=>{
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  await  BlacklistedToken.create({token});
  res.status(200).json({message:"Logged Out Successfully"});
}