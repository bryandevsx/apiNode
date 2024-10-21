const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
require('./db'); 
const axios = require('axios');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  const apiKey = '0a85e58c0dd6ba034b7c57a00202f901';
  
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send('Erro ao buscar a previsão do tempo');
  }
});

app.post('/calcularIMC', (req, res) => {
  const { altura, peso } = req.body;

  if (!altura || !peso) {
    return res.status(400).send('Altura e peso são necessários');
  }

  const imc = peso / (altura * altura);
  res.status(200).send({ imc: imc.toFixed(2) });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
