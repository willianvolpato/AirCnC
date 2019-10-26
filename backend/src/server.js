const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

//Conexão com o BD
mongoose.connect('mongodb+srv://aircnc:aircncbd@aircnc-xfdhp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Instrução para o express reconhecer JSON
app.use(express.json());
//Importa rotas
app.use(routes);

//Porta de conexão
app.listen(3333);