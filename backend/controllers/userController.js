const userModel = require("../models/userModels.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// Function to create JWT
const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "30d" });
};

// Register Controller
const registerUser = async (req, res) => {
  try {
    // Generate unique 4-digit _id
    let newId;
    let exists;

    do {
      newId = `${Math.floor(1000 + Math.random() * 9000)}`; // 1000–9999
      exists = await userModel.findById(newId); // ✅ use userModel here
    } while (exists);

    console.log("ID created:", newId);

    const { name, email, password } = req.body;

    // Check for existing email
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json("User with the given email already exists.");
    }

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json("All fields are required.");
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json("Please provide a valid email address.");
    }

    // Validate password strength
    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json(
          "Password must be strong (include uppercase, lowercase, number, and special character)."
        );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with custom _id
    user = new userModel({
      _id: newId,
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Create token
    const token = createToken(user._id);

    // Respond with user data + token
    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json("Internal server error.");
  }
};

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json("Invalid email or Password");
    }
    const isValidPassord = await bcrypt.compare(password, user.password);
    if (!isValidPassord) {
      return res.status(400).json("Invalid email or Password");
    }

    const token = createToken(user._id);

    // Respond with user data + token
    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    console.error("LogIn Error:", error);
    res.status(500).json("Internal server error.");
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json("All fields are required");
    }
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json("No User Found By Id.");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error.");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users) {
      return res.status(400).json("No Users Found");
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error.");
  }
};

module.exports = { registerUser, logInUser, getUserById, getUsers };
