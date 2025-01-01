const BlacklistedToken = require("../models/blacklistToken.model");
const CaptainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await CaptainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  const hashedPassword = await CaptainModel.hashPassword(password);

  try {
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = await captain.generateAuthToken();

    res.status(201).json({ captain, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await CaptainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res
      .status(400)
      .json({ message: "Incorrect Email Address or password" });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res
      .status(401)
      .json({ message: "Incorrect Email Address or password" });
  }

  const token = await captain.generateAuthToken();
  res.cookie('token',token, { httpOnly: true, secure: true })
  res.status(200).json({ captain, token });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await BlacklistedToken.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
