//const {response} = require('express');
const bcryptjs = require('bcryptjs');
//importamos el modelo para crear instancias
const User = require('../entities/user');
//nodemailer

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { getMaxListeners } = require('../entities/user');

const mailer = async (req,res ) =>{
const {name, lastName, email, password, rol} = req.body;
    //creo la instancia
    const user =  new User({
        name,
        lastName,
        email,
        password,
        rol: rol || 'USER_ROLE',
        googleEmail: true
        });
    //Encriptar la contrasena "numero de veces que encripta entre 1-100 10 por defecto hash encriptar en una sola via"
    const salt = bcryptjs.genSaltSync(12);
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'jositoRaquelTfc@gmail.com',
    pass: 'ilovetuenti1'
  }
}));

const mailOptions = {
  from: 'jositoRaquelTfc@gmail.com',
  to: email,
  subject: 'Sending Email using Node.js[nodemailer]',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
} 
//@desc LISTAR USUSARIOS para despues de actualiar el estado del pedido
//@route GET /api/user
//@acces private admin
//para mostrar todos los usuarios paginados... seria como para la parte de ADMIN
const usersGet = async (req,res ) =>{
    //marco el tamano de la paginacion
    const {limit = 5, offset = 0} = req.query;
    //el .select('-password') hacemos que no nos muestre x campo, en un sitio en concreto
    const [totalUsers, users] = await Promise.all([
        User.countDocuments({rol:'USER_ROLE'}),
        User.find({rol:'USER_ROLE'}).select('-password')
        .skip(Number(offset)) //desde xnumber hasta el limitnumber localhost:8080/api/user?offset=5 -> del 5 al 10
        .limit(Number(limit))
    ])
    res.status(200).json({totalUsers,users})
}

const transporter = async (req,res ) =>{
  const transport = nodemailer.createTransport({
  host: "smtp.gmail.email",
  port: 465,
  secure: true,
  auth: { 
    user: 'jositoRaquelTfc@gmail.com',
    pass:'mnpcrkceaakbutrm',
  }
})
}
  

module.exports = {
    mailer,
    usersGet,
    transporter,

}