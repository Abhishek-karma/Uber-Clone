const userModel = require("../models/user.model");

module.exports.createUser = async ({
  email,
  password,
  firstname,
  lastname,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("Missing required fields");
  }

  try {
    const user = await userModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });
    return user;
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({ error: "Email address already in use" });
    } else {
      console.error("Error creating user:", error);
      throw error;
    }
  }
};
