const { Usuarios } = require('../models')

const getAll = async (query) => {
  let options = {
    attributes:{ exclude: ['Fecha_alta','fecha_actualizacion'] }
  }

  if (query.nombre)
    options = {
      ...options, where: {
        ...options.where,
        nombre: query.nombre
      }
    }
  
    if (query.apellido)
    options = {
      ...options, where: {
        ...options.where,
        apellido: query.apellido
      }
    }

  const datos = await Usuarios.findAll(options)
  return datos 
};
  
  const getOne = async (id) => { return await Usuarios.findByPk(id,{
    attributes:{ exclude: ['Fecha_alta','fecha_actualizacion'] }
  });}


  const save = async (body) => { 
    const data = { ...body }
    const usuario = await Usuarios.create(data);
    return usuario;
  }
  
  const borrar = async (id) => {
    await Usuarios.destroy({
      where: {
        id
      }
    })
  }
  
  const update = async (id, body) => {
    const data = await getOne(id)
    data.nombre = body.nombre
    data.apellido = body.apellido
    data.usuario = body.usuario
    data.email = body.email
    data.contrasenia = body.contrasenia
    await data.save()
    return data;
  }
  
  module.exports = { getAll, getOne, save, borrar, update};