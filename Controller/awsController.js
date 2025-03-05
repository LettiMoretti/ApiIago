const awsService = require("../Service/awsService.js");

// Adicionar imagem
const adicionarImagem = async (req, res) => {
    try {
        const { idUsuario, imagem } = req.query;

        await awsService.save(idUsuario, imagem);
        res.status(201).json({Message: "Imagem salva com sucesso!"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Buscar uma imagem
const buscarImagem = async (req, res) => {
    try {
        const { referencia } = req.params;

        if (!referencia) {
            return res.status(400).json({ error: 'Referência da imagem é obrigatória!' });
        }

        const url = await awsService.buscar(referencia);
        res.json({ message: `Imagem baixada com sucesso: ${referencia}` });
    } catch (error) {
        console.error('Erro no Controller:', error);
        res.status(500).json({ error: 'Erro ao buscar imagem!' });
    }
};

module.exports = { adicionarImagem, buscarImagem };