const db = require("./conexao.js");

function save (referencia, data_criacao, titulo) {
    const sql = 'INSERT INTO tb_imagens (referencia, data_criacao, titulo) VALUES (?, ?, ?)';

    db.execute(sql, [referencia, data_criacao, titulo], (err, results) => {
        if (err) {
            console.error('Erro ao salvar a imagem!', err);
            return;
        }
        console.log('Imagem salva com sucesso!', results);
    });
}

function update (id, referencia, data_criacao, titulo) {
    const sql = 'UPDATE tb_imagens SET referencia=?, data_criacao=?, titulo=? WHERE id=?';

    db.execute(sql, [referencia, data_criacao, titulo, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar a imagem!', err);
            return;
        }
        console.log('Imagem atualizada com sucesso!', results);
    });
}

const buscarPorId = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tb_imagens WHERE id = ?";
        
        db.execute(sql, [id], (err, results) => {
            if (err) {
                console.error('Erro ao buscar a imagem!', err);
                reject(err);
                return;
            }

            if (results.length === 0) {
                resolve(null); // Retorna null se a imagem não for encontrada
            } else {
                resolve(results[0]); // Retorna a primeira imagem encontrada
            }
        });
    });
};


function deletar (id) {
    const sql = 'DELETE FROM tb_imagens WHERE id=?';

    db.execute(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar a imagem!', err);
            return;
        }
        console.log('Imagem deletada com sucesso!');
    });
}

module.exports = { save, update, buscarPorId, deletar };