const { Libros } = require('../models')
const { Op } = require("sequelize");

const getAll = async (query) => {
  let options = {
    //attributes:['id', 'titulo', 'anio', 'calificacion', 'genero']
    attributes:{ exclude: ['Fecha_alta','fecha_actualizacion'] }
  }
  
  if (query.titulo)
    options = {
      ...options, where: {
        ...options.where,
        titulo: query.titulo
      }
    }

  if (query.generos)
    options = {
      ...options, where: {
        ...options.where,
        generos: {
          [Op.substring]:query.generos
        } 
      }
    }
  
    if (query.calificaciones)
    options = {
      ...options, where: {
        ...options.where,
        calificacion: {
          [Op.gte]:query.calificaciones
        } 
      }
    }
  
  const datos = await Libros.findAll(options)
  return datos 
};

const getOne = async (id) => { return await Libros.findByPk(id, {
  attributes: {exclude:['Fecha_alta','fecha_actualizacion']}
});}

const save = async (body) => { 
  const data = {...body};
  const libro = await Libros.create(data);
  return libro;
}

const borrar = async (id) => {
  await Libros.destroy({
    where: {
      id
    }
  })
}

const update = async (id, body) => {
  const data = await getOne(id)
  data.titulo = body.titulo
  data.escritor = body.escritor
  data.anio = body.anio
  data.calificacion = body.calificacion
  data.generos = body.generos
  await data.save()
  return data;
}

module.exports = { getAll, getOne, save, borrar, update};
