const express = require('express');
const { signup, login } = require('../controllers/authController');
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage(); // or diskStorage if saving to /uploads
const upload = multer({ storage });

router.post('/signup', upload.array('images'), signup);
router.post('/login', login);

module.exports = router;
