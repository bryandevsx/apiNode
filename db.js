const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/node', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar no MongoDB:', err));
