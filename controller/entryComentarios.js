const middleware = require('../utils/middleware');

const router = require("express").Router();
let dao  = require("../dataccess/comentarios");

/* Obtener todo los comentarios */
router.get("/", async (req, res) => {
  res.status(200).json( await dao.getAll(req.query));
});

/* Obtener uno especifico */
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await dao.getOne(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.sendStatus(404);
  }
});


/* Agregar un elemento */

router.post("/", middleware.validarUserLogin, async (req, res) => {
  
  const body = {...req.body};
  const data = await dao.save(body);
  res.status(200).json(data);
});

/* Borrar un elemento */

router.delete("/:id",middleware.validarUserLogin, async (req, res) => {
  const id = req.params.id;  
  await dao.borrar(id)
  res.sendStatus(202);
});

/* Modificar un elemento */
router.put("/:id", middleware.validarUserLogin, async (req, res) => {
  const id = req.params.id;
 
  if ( await dao.update(id, req.body) ) { 
    res.sendStatus(202);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;