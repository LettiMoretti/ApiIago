const usuarioService = require("../Service/usuarioService.js");

// Adicionar um usuário
const adicionarUsuario = async (req, res) => {
    try {
        const { nome } = req.body;
        
        await usuarioService.save(nome);
        res.status(201).json({Message: "Usuário salvo com sucesso!"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deletar um usuário
const removerUsuario = async (req, res) => {
    try {
        const id = req.params;
            await usuarioService.deletar(req.params.id);
            res.json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário!' });
    }
};

// Buscar uma usuario por Id
const buscarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await usuarioService.buscar(id);
        console.log("Retorno Service: ", usuario);
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar usuario!' });
    }
};

// Atualizar um usuário por Id
const atualizarUsuario = async (req, res) => {
    try {
        const { nome } = req.body;
        const { id } = req.params;

        await usuarioService.atualizar(id, nome);
        res.json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
        res.status(404).json({ error: 'Usuário não encontrado! CONTROLLER' });
    }
};

module.exports = { adicionarUsuario, removerUsuario, buscarUsuario, atualizarUsuario };