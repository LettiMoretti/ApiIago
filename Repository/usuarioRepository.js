const db = require("./conexao.js");

function save (nome, data_criacao) {
    const sql = 'INSERT INTO tb_usuarios (nome, data_criacao) VALUES (?, ?)';

    db.execute(sql, [nome, data_criacao], (err, results) => {
        if (err) {
            console.error('Erro ao salvar o usuario!', err);
            return;
        }
        console.log('Usuario salvo com sucesso!', results);
    });
}

function update (id, nome, data_criacao) {
    const sql = 'UPDATE tb_usuarios SET nome=?, data_criacao=? WHERE id=?';

    db.execute(sql, [nome, data_criacao, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar o usuario!', err);
            return;
        }
        console.log('Usuario atualizado com sucesso!', results);
    });
}

const buscarPorId = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tb_usuarios WHERE id=?";
        
        db.execute(sql, [id], (err, results) => {
            if (err) {
                console.error('Erro ao buscar o usuario!', err);
                reject(err);
                return;
            }

            if (results.length === 0) {
                resolve(null); // Retorna null se o usuario não for encontrado
            } else {
                resolve(results[0]); // Retorna o primeiro usuario encontrado
            }
        });
    });
};

function deletar (id) {
    const sql = 'DELETE FROM tb_usuarios WHERE id=?';

    db.execute(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar o usuario!', err);
            return;
        }
        console.log('Usuario deletado com sucesso!');
    });
}

module.exports = { save, update, buscarPorId, deletar };