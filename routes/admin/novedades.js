var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

/* GET home page. */
router.get('/', async function(req, res, next) {

  var novedades = await novedadesModel.getNovedades();

  res.render('admin/novedades', {
    nombre: req.session.nombre,
    novedades,
  });
});

router.get('/add', (req, res, next) => {
  res.render('admin/add')
})

router.post('/add', async (req, res, next) => {
  try{
    if(req.body.titulo != "" && req.body.cuerpo != "" && req.body.fuente != "") {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/add', {
        error: 'Todos los campos son obligatorios',
      });
    }
  } catch(error) {
    console.log(error);
    res.render('admin/add', {
      error: 'Error al insertar la novedad',
    });
  }
})

router.get('/delete/:id', async (req, res, next) => {
  let id = req.params.id;
  await novedadesModel.deleteNovedadById(id);
  res.redirect('/admin/novedades');
})

router.get('/edit/:id', async (req, res, next) => {
  let id = req.params.id;
  let novedad = await novedadesModel.getNovedadById(id);
  res.render('admin/edit', {
    novedad,
  });
})

router.post('/edit', async (req, res, next) => {
  try{

    let novedad = {
      titulo: req.body.titulo,
      cuerpo: req.body.cuerpo,
      fuente: req.body.fuente,
    }

    if(novedad.titulo != "" && novedad.cuerpo != "" && novedad.fuente != "") {
      await novedadesModel.updateNovedadById(req.body.id, novedad);
      res.redirect('/admin/novedades');
    } else {
      let novedad = await novedadesModel.getNovedadById(req.body.id);
      res.render('admin/edit', {
        novedad,
        error: 'Todos los campos son obligatorios',
      });
    }
  } catch(error) {
    console.log(error);
    res.render('admin/edit', {
      error: 'Error al actualizar la novedad',
    });
  }
})

module.exports = router;