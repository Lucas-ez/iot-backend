var express = require('express');
var router = express.Router();
var novedadesModel = require('./../models/novedadesModel');
var dispositivosModel = require('./../models/dispositivosModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

router.get('/novedades', async (req, res, next) => {
    let novedades = await novedadesModel.getNovedades();
    res.json(novedades);
});

router.get('/dispositivos', async (req, res, next) => {
    let dispositivos = await dispositivosModel.getDispositivos();

    dispositivos.forEach(async (dispositivo) => {
        console.log(cloudinary.url(dispositivo.img_id));
    })

    dispositivos = dispositivos.map(dispositivo => {
        if (dispositivo.img_id) {
            const imagen = cloudinary.url(dispositivo.img_id);
            return {
                ...dispositivo,
                imagen
            };
        } else {
            return {
                ...dispositivo,
                imagen: ""
            }
        }
    });


    res.json(dispositivos);
})

router.post('/contacto', async (req, res) => {

    const mail = {
        to: 'test@gmail.com',
        subject: 'Contacto Web',
        html: `Nombre: ${req.body.nombre}.<br>Correo: ${req.body.mail}.<br>Asunto: ${req.body.asunto}.<br>Mensaje: ${req.body.mensaje}`
    }
    
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })
    
    await transport.sendMail(mail)
    
    res.status(201).json({
        error: false,
        message: 'Mensaje enviado'
    })

})

module.exports = router;