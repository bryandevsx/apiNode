const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  idade: { type: Number, required: true }
});

module.exports = mongoose.model('User', UserSchema);
