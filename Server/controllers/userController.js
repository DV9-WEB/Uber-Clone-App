const blacklistTokenModel = require("../models/blacklistTokenModel.js");
const userModel = require("../models/userSchema.js");
const userService = require("../services/userService.js");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  const isUserAlready = await userModel.findOne({ email });

  if (isUserAlready) {
    return res.status(400).json({ message: "User already exist" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, user });
};

module.exports.userProfile = async (req, res, next) => {
  res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res, nex) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.header.authorization.spilit(" ")[1]
  await blacklistTokenModel.create({token})
  res.status(200).json({message: "Logged Out"})
}