const repositorio = require("../Repository/awsRepository.js");
const AWS = require('aws-sdk');

// Configurações
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: ''
});

// Criação a instância do S3
const s3 = new AWS.S3()

async function save(idUsuario, imagem) {
    try {
        return await repositorio.criarImagem( idUsuario, imagem, s3);
    } catch ( error ) {
        console.error ("Erro ao criar imagem!");
        throw error;
    }
}

async function buscar(referencia) {
    try {
        return await repositorio.buscarImagem(referencia, s3);
    } catch (error) {
        console.error('Erro ao buscar imagem:', error);
        throw error;
    }
}

module.exports = { save, buscar };