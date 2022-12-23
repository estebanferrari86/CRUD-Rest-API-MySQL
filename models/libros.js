const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Libros extends Model{ }

Libros.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    escritor: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    calificacion:{
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 1,
        validate: {
            min: {
                args: 1,
                msg: 'el valor mas bajo de calificacion es 1'
            },
            max: {
                args: 10,
                msg: 'el valor mas alto de calificacion es 10'
            }
        }
    },
    generos:{
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    sequelize,
    underscored:true,
    modelName: 'libros'
})

module.exports =  Libros