const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Usuarios extends Model{

    getFullname() {
        return [this.nombre, this.apellido].join(' ');
    }
}

Usuarios.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    contrasenia: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
}, {
    sequelize,
    underscored:true,
    modelName: 'usuarios'
})

module.exports = Usuarios