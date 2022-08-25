var express = require('express');
var router = express.Router();

var usuariosModel = require('../../models/usuariosModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login');
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/admin/login');
});

router.post('/', async (req, res, next) =>{
  try {
    var user = req.body.user;
    var password = req.body.password;
    
    var userData = await usuariosModel.getUserByUserAndPassword(user, password);
    
    if (userData != undefined) {
      
      req.session.id_usuario = userData.id
      req.session.nombre = userData.user

      
      res.render('admin/login', { error: '' + res.json(userData)});
      // res.redirect('/admin/novedades');
    } else {
      res.render('admin/login', { error: 'Usuario o contraseña incorrectos'});
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;