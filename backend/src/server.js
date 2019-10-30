const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

//Conexão com o BD
mongoose.connect('mongodb+srv://aircnc:aircncbd@aircnc-xfdhp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectedUsers = {};

io.on('connection', socket => {
    connectedUsers[socket.handshake.query.user_id] = socket.id;    
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
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
server.listen(3333);