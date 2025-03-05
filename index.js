const express = require('express');
const routes = require('./Routes/routes.js');
const app = express();

app.use(express.json()); 
app.use(routes);

app.listen(3001, () => console.log("Servidor rodando na porta 3001."));