const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  phone:     { type: String, required: true },
  address:   { type: String, required: true },
  city:      { type: String, required: true },
  state:     { type: String, required: true },
  zipCode:   { type: String, required: true },
  phoneBrand: { type: String, required: true },
  phoneModel: { type: String, required: true },
  purchaseDate: { type: String, required: true },
  phoneValue: { type: String, required: true },
  plan:       { type: String, required: true },
  images:     [{ type: String }]
});

module.exports = mongoose.model('User', userSchema);
