const userModel = require("../models/userModel");
const crypto = require("crypto");
const SECRET_KEY = "SECRET_KEY";
const jwt = require("jsonwebtoken");
const { sanitizeUser } = require("../service/common");
const { forgotPasswordSendMail } = require("./../mail/nodemailer");

const createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    const hashedPassword = await new Promise((resolve, reject) => {
      crypto.pbkdf2(
        req.body.password,
        salt,
        310000,
        32,
        "sha256",
        (err, hashed) => {
          if (err) reject(err);
          resolve(hashed);
        }
      );
    });

    const user = new userModel.userModel({
      ...req.body,
      password: hashedPassword,
      salt,
    });

    const doc = await user.save();
    req.login(sanitizeUser(doc), (err) => {
      // this also calls serializer and adds to session
      if (err) {
        res.status(400).json(err);
      } else {
        const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 3600000),
        });
        res.status(201).json({ id: doc._id, role: doc.role });
      }
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).send({ message: "Validation Error", errors });
    }

    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      return res
        .status(400)
        .send({ message: "Duplicate Key Error", key: error.keyValue });
    }

    console.error("Internal Server Error:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// const loginUser = async (req, res) => {
//   res.cookie("jwt", req.user.token, {
//     expires: new Date(Date.now() + 3600000),
//     // httpOnly: false,
//     httpOnly: true,
//     sameSite: "none",
//     secure: false,
//   });
//   res.json(req.user.token);
// };

const loginUser = async (req, res) => {
  try {
    const user = req.user;
    const token = req.user.token;
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      secure: false,
    });
    // Respond with the token (optional)
    res.status(201).json({ id: user._id, role: user.role });
  } catch (error) {
    console.error("Error setting cookie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    // Clear the JWT cookie by setting it to null and expiring it immediately
    res.clearCookie("jwt", {
      httpOnly: true,
      expires: new Date(0),
    });

    // Send a successful logout response with status code 200
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // If an error occurs, log it and send a generic error response
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const checkAuth = async (req, res) => {
  if (req.user) {
    res.json({ status: "success", user: req.user });
  } else {
    res.status(401);
  }
};

const resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user by email
    const user = await userModel.userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json("User not found");
    }

    // Generate reset password token
    const token = crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = token;
    await user.save();

    // Construct reset password link
    const resetPageLink = `http://localhost:3000/reset-password?token=${token}&email=${email}`;

    // Send password reset email
    const response = await forgotPasswordSendMail({
      to: email,
      action_url: resetPageLink,
    });

    // Check if email was sent successfully
    if (response.accepted && response.accepted.length > 0) {
      return res
        .status(200)
        .json({ message: "Password reset email sent successfully" });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to send password reset email" });
    }
  } catch (error) {
    console.error("Error in resetPasswordRequest:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, token } = req.body;


    const user = await userModel.userModel.findOne({
      email: email,
      resetPasswordToken: token,
    });

    if (!user) {
      return res.status(400).json("User not found");
    }

    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        if (err) {
          return res.status(500).json({ error: "Failed to hash password" });
        }

        user.password = hashedPassword;
        user.salt = salt;
        await user.save();

        const subject = "Password successfully reset for e-commerce";
        const html = `<p>Password successfully reset</p>`;

        const response = await forgotPasswordSendMail({
          to: email,
          subject,
          html,
        });
        return res
          .status(200)
          .json({ message: "Password successfully reset", email: email });
      }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createUser,
  loginUser,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
  logout,
};
