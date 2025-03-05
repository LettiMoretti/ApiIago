const repositorio = require("../Repository/usuarioRepository");

function save(nome) {
    const dataCriacao = new Date().toISOString().split('T')[0];
    repositorio.save(nome, dataCriacao);
}

function deletar(id) {
    repositorio.deletar(id);
}

const buscar = async (id) => {
    const res = await repositorio.buscarPorId(id);
    console.log("Retorno Repositorio: ", res);
    return res;
}

function atualizar(id, nome) {
    const dataCriacao = new Date().toISOString().split('T')[0];
    repositorio.update(id, nome, dataCriacao);
}

module.exports = { save, deletar, buscar, atualizar };