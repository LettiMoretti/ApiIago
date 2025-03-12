const db = require("./conexao.js");

// Criar Imagem
const criarImagem = (idUsuario, referencia) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = "INSERT INTO tb_imagensaws (referencia, idUsuario) VALUES (?, ?)";
            
            db.query(sql, [referencia, idUsuario], (err, results) => {
                if (err) {
                    console.error("Erro ao criar imagem no banco!", err);
                    reject(new Error("Erro ao criar imagem!"));
                } else {
                    resolve(results);
                }
            });
        } catch (error) {
            console.error("Erro inesperado ao criar imagem:", error);
            reject(new Error("Erro ao criar imagem no banco!"));
        }
    });
};

module.exports = { criarImagem };