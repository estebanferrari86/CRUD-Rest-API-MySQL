
const jwt = require('jsonwebtoken');
const router = require('express').Router();
require('dotenv').config()

router.post('/', (req,res)=>{
  const {body} = req
  if(body.username == 'admin' && body.password == '123456'){
    //usuario admin
    const tokenData = {
      username: body.username,
      id: 1,
      profile: 'admin'  
    }

    const token = jwt.sign(tokenData,process.env.JWTSECRET,{ expiresIn: '1h' })
    res.status(200).send({token, name: 'administrador'})
  }else if(body.username != 'admin' && body.password != '123456'){
    //usuario random correcto
    const tokenData = {
      username: body.username,
      profile: 'notadmin'  
    }

    const token = jwt.sign(tokenData,process.env.JWTSECRET,{ expiresIn: '1h' })
    res.status(200).send({token, name: 'usuario comun'})
  }else{
    //usuario incorrecto
    return res.status(401).json({error:'credenciales incorrecto'})
  }
})

module.exports = router