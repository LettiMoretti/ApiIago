// Imagem
const Imagem = sequelize.define('Imagem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    referencia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'imagens',
    timestamps: false,
});