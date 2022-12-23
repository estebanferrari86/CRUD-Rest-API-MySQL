const Libros = require('./libros')
const Comentarios = require('./comentarios')
const Usuarios = require('./usuarios')

Comentarios.belongsTo(Libros)
Libros.hasMany(Comentarios)

Comentarios.belongsTo(Usuarios)
Usuarios.hasMany(Comentarios)

module.exports = {
    Libros,
    Comentarios,
    Usuarios
}