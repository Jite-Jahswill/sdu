const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, matricNumber, state, country, gender } = req.body;

    // Handle profile picture upload
    let profilePicture = null;
    if (req.file) {
      profilePicture = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    // Check if email or username or matricNumber already exists
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) return res.status(400).json({ message: "Email already in use" });

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) return res.status(400).json({ message: "Username already in use" });

    const existingMatric = await User.findOne({ where: { matricNumber } });
    if (existingMatric) return res.status(400).json({ message: "Matric number already in use" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashed,
      matricNumber,
      state,
      country,
      gender,
      profilePicture,
    });

    res.status(201).json({ message: "Registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
      })
      .json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to get user" });
  }
};

// Update user info
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { firstname, lastname, username, email, password, matricNumber, state, country, gender } = req.body;

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (username) user.username = username;
    if (email) user.email = email;
    if (matricNumber) user.matricNumber = matricNumber;
    if (state) user.state = state;
    if (gender) user.gender = gender;
    if (country) user.country = country;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (req.file) {
      user.profilePicture = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 1000 * 60 * 15; // 15 minutes

    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await user.save();

    // For now, just log it to the console (later use nodemailer or similar)
    console.log(`Reset your password: http://localhost:3000/reset-password/${token}`);

    res.status(200).json({ message: "Password reset link sent to email." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
