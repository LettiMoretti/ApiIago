const repositorio = require("../Repository/awsRepository.js");
const AWS = require('aws-sdk');
const path = require('path')
const UUID = require('uuid');
const fs = require('fs');

async function save(idUsuario, imagem) {
    try {
        const referencia = UUID.v4();
        await enviarParaAws(imagem, referencia);
        return await repositorio.criarImagem( idUsuario, referencia);
    } catch ( error ) {
        console.error ("Erro ao criar imagem!");
        throw error;
    }
}

async function buscar(referencia) {
    try {
        return await buscarImagem(referencia, s3);
    } catch (error) {
        console.error('Erro ao buscar imagem:', error);
        throw error;
    }
}

// Configurações
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: ''
});

// Criação a instância do S3
const s3 = new AWS.S3()

// Upload para o S3
const enviarParaAws = (filePath, referencia) => {
    return new Promise((resolve, reject) => {
        const fileContent = fs.readFileSync(filePath);

        const params = {
            Bucket: 'bucketmi74',
            Key: referencia,
            Body: fileContent,
            ContentType: 'image/jpeg'
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Erro ao fazer o upload!');
                reject(err);
            } else {
                console.log('Upload feito com sucesso!');
                resolve(data);
            }
        });
    });
};

// Buscar imagem da S3
const buscarImagem = (referencia, s3) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: 'bucketmi74',
            Key: referencia
        };

        s3.getObject(params, (err, data) => {
            if (err) {
                console.error('Erro ao baixar arquivo:', err);
                reject(err);
                return;
            }

            // Verifica o Content-Type e ajusta a extensão do arquivo
            const contentType = data.ContentType;
            let extension = '';

            if (contentType.includes('image/jpeg')) {
                extension = '.jpg';
            } else if (contentType.includes('image/png')) {
                extension = '.png';
            } else if (contentType.includes('image/gif')) {
                extension = '.gif';
            } else {
                console.error('Tipo de imagem não suportado:', contentType);
                reject('Tipo de imagem não suportado');
                return;
            }

            // Atualiza o caminho do download com a extensão correta
            const updatedDownloadPath = referencia.endsWith(extension) ? referencia : referencia + extension;
            const downloadsPath = path.join(require('os').homedir(), 'Downloads');
            const filePath = path.join(downloadsPath, updatedDownloadPath);

            const file = fs.createWriteStream(filePath, data.body);

            // Cria o fluxo de leitura a partir do S3 e faz o download
            file.write(data.Body, (err) => {
                if (err) {
                    console.error('Erro ao escrever arquivo:', err);
                    reject(err);
                } else {
                    console.log('Arquivo baixado com sucesso:', updatedDownloadPath);
                    resolve();
                }
            });
        });
    });
};

module.exports = { save, buscar };