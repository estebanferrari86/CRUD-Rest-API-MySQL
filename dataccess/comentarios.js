const { Comentarios, Libros, Usuarios } = require('../models')


const getAll = async (query) => {
  let options = {
    attributes:['id', 'comentario', 'calificacion'],
    include: [
      {model: Libros, attributes:['id', 'titulo'], required: false},
      {model: Usuarios, attributes:['id', 'usuario'], required: false}
    ]
  }
  if (query.libro_id)
    options = {
      ...options, where: {
        ...options.where,
        libroId: query.libro_id
      }
    }
  
  if (query.usuario_id)
    options = {
      ...options, where: {
        ...options.where,
        usuarioId: query.usuario_id
      }
    }
  const datos = await Comentarios.findAll(options)
  return datos 
};

const getOne = async (id) => {return await Comentarios.findByPk(id,{ 
  attributes:['id', 'comentario', 'calificacion'],
  include: [
    {model: Libros, attributes:['id', 'titulo','escritor','anio'], required: false},
    {model: Usuarios, attributes:['id', 'usuario','nombre','apellido'], required :false}
  ]
});}

const save = async (body) => { 
    const data = { ...body};
    const comentario = await Comentarios.create(data);
    let libro = await Libros.findByPk(body.libro.id);
    comentario.libroId = libro.id;
    let usuario = await Usuarios.findByPk(body.usuario.id);
    comentario.usuarioId = usuario.id;
    await comentario.save();
    return comentario;
}

const borrar = async (id) => {
  await Comentarios.destroy({
    where: {
      id
    }
  })
}

const update = async (id, body) => {
  const data = await getOne(id)
  data.resenia = body.resenia
  data.calificacion = body.calificacion
  data.libro_id = body.libro_id
  data.usuario_id = body.usuario_id
  await data.save()
  return data;
}

module.exports = { getAll, getOne, save, borrar, update};