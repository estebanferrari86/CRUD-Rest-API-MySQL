const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Comentarios extends Model{ }

Comentarios.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    calificacion:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
        validate: {
            min: {
                args: 1,
                msg: 'el valor mas bajo de calificacino es 1'
            },
            max: {
                args: 10,
                msg: 'el valor mas alto de calificacion es 10'
            }
        }
    }
}, {
    sequelize,
    underscored:true,
    modelName: 'commentarios'
})

module.exports = Comentarios