const captainModel = require("../models/captainModel.js");
const captainService = require("../services/captainService.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt")
module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    // Check if captain already exists
    const isCaptainExist = await captainModel.findOne({ email });
    if (isCaptainExist) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    // Hash the password using bcrypt directly
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the captain through the service
    const captain = await captainService.createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    // Generate the auth token now that captain is a valid Mongoose instance
    const token = captain.generateAuthToken(); // This will work because `captain` is a Mongoose instance

    // Return the token and captain data
    res.status(201).json({ token, captain });
  } catch (error) {
    next(error);
  }
};
