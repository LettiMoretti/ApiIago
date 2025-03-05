const imagemService = require("../Service/imagemService.js");

// Adicionar uma imagem
const adicionarImagem = async (req, res) => {
    try {
        const { referencia, titulo } = req.body;

        await imagemService.save(referencia, titulo);
        res.status(201).json({Message: "Imagem salva com sucesso!"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

 // Deletar uma imagem
 const removerImagem = async (req, res) => {
    try {
        const id = req.params;
        await imagemService.deletar(req.params.id);
        res.json({ message: 'Imagem deletada com sucesso!' });
    } catch (error) {
        res.status(404).json({ error: 'Imagem não encontrada!' });
    }
};

// Buscar uma imagem por Id
const buscarImagem = async (req, res) => {
    try {
        const { id } = req.params;

        const imagem = await imagemService.buscar(id);
        console.log("Retorno Service: ", imagem);
        res.json(imagem);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar imagem!' });
    }
};

// Atualizar uma imagem por Id
const atualizarImagem = async (req, res) => {
    try {
        const { id } = req.params;
        const { referencia, titulo } = req.body;
        
        await imagemService.atualizar(id, referencia, titulo);
        res.json({ message: 'Imagem atualizada com sucesso!' });
    } catch (error) {
        res.status(404).json({ error: 'Imagem não encontrada!' });
    }
};

module.exports = { adicionarImagem, removerImagem, buscarImagem, atualizarImagem };