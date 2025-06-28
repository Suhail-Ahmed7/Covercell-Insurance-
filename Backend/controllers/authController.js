const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.signup = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug: Log form fields
    console.log('Uploaded files:', req.files); // Debug: Log uploaded files

    if (!req.body) {
      return res.status(400).json({ msg: 'Request body is missing' });
    }

    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      city,
      state,
      zipCode,
      phoneModel,
      phoneBrand,
      purchaseDate,
      phoneValue,
      plan,
      terms, // Include terms field
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phone || !address || !city || !state || !zipCode || !phoneModel || !phoneBrand || !purchaseDate || !phoneValue || !plan) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    // Check terms agreement
    if (terms !== 'true') {
      return res.status(400).json({ msg: 'You must accept the terms and conditions' });
    }

    // Check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get uploaded image filenames
    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    // Create user
   const user = await User.create({
  firstName,
  lastName,
  email,
  password: hashedPassword,
  phone,
  address,
  city,
  state,
  zipCode,
  phoneModel,
  phoneBrand,
  purchaseDate,
  phoneValue,
  plan,
  images: imagePaths,
});

    // Optionally generate a JWT token for immediate login
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ msg: 'User registered', user, token });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ msg: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};