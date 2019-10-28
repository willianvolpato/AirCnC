const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

//Conexão com o BD
mongoose.connect('mongodb+srv://aircnc:aircncbd@aircnc-xfdhp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Controle de acesso a aplicação
app.use(cors());
//Instrução para o express reconhecer JSON
app.use(express.json());
//Quanto acessar a rota "files" o método express retorna o arquivo estático
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
//Importa rotas
app.use(routes);

//Porta de conexão
app.listen(3333);