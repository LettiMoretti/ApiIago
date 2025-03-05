const db = require("./conexao.js");
const UUID = require('uuid');
const path = require('path')
const fs = require('fs');

// Criar Imagem
const criarImagem = (idUsuario, imagem, s3) => {
    return new Promise((resolve, reject) => {
        const referencia = UUID.v4();

        enviarParaAws(imagem, referencia, s3)
    
        .then(() => {
                const sql = "INSERT INTO tb_imagensaws (referencia, idUsuario) VALUES (?, ?)";
                db.query(sql, [referencia, idUsuario], (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(new Error("Erro ao criar imagem!"));
                    } else {
                        resolve(results);
                    }
                });
            })
            .catch((err) => {
                console.error('Erro no upload para o S3:', err);
                reject(new Error("Erro ao fazer upload para o S3!"));
            });
    });
};

// Upload para o S3
const enviarParaAws = (filePath, referencia, s3) => {
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

module.exports = { criarImagem, buscarImagem };