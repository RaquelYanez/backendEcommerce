//const {response} = require('express');
const bcryptjs = require('bcryptjs');
//importamos el modelo para crear instancias
const User = require('../entities/user');
//nodemailer
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

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
//@desc LISTAR USUSARIOS
//@route GET /api/user
//@acces public
//primerEjemplo de paginacion para repsar en productos
//para mostrar todos los usuarios paginados... seria como para la parte de ADMIN
const usuariosGet = async (req,res ) =>{
    //marco el tamano de la paginacion
    const {limit = 5, offset = 0} = req.query;
    //el .select('-password') hacemos que no nos muestre x campo, en un sitio en concreto
    const [totalUsers, users] = await Promise.all([
        User.countDocuments(),
        User.find().select('-password')
        .skip(Number(offset)) //desde xnumber hasta el limitnumber localhost:8080/api/user?offset=5 -> del 5 al 10
        .limit(Number(limit))
    ])
    res.status(200).json({totalUsers,users})
}

//@desc OBTENER EL PERFIL DE USUARIO
//@route GET /api/user
//@acces private
const userProfile = async (req,res ) =>{

    const { id } = req.params
    const user =  await User.findById(id)
    res.status(200).json(user)
}

//@desc ACTUALIZAR EL PERFIL DE UN USUARIO
//@route PUT /api/user
//@acces public
const userPut =  async (req, res) =>{
    
    const { id } = req.params
    const { _id, password,googleEmail, email, ...newUserbody} = req.body;
   // const { _id, password,googleEmail, email, ...newUserbody} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync(12);
        newUserbody.password = bcryptjs.hashSync(password, salt);  
    }
    const userUpdated = await User.findByIdAndUpdate( id, newUserbody);

    res.json(userUpdated)
}
//@desc REGISTRAR USUSARIOS
//@route POST /api/user
//@acces public
const signUp = async (req, res) =>{
   try{
    const {name, lastName, email, password, rol} = req.body;
    //creo la instancia
    const user =  new User({
        name,
        lastName,
        email,
        password,
        rol: rol || 'USER_ROLE',
        });
    //Encriptar la contrasena "numero de veces que encripta entre 1-100 10 por defecto hash encriptar en una sola via"
    const salt = bcryptjs.genSaltSync(12);
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    res.status(201).json({msg:'Se ha creado el usuario correctamente.',user})
}catch(err) {
    console.log(err)
    res.status(400).send({msg:'No se ha podido crear al usuario.'})
}
}

//@desc ACTUALIZAR EL PERFIL DE UN USUARIO
//@route DELETE /api/user
//@acces private
const usuariosDelete = async (req, res) =>{
    //buscamos por id al usuario con otro usuario, si eese usuario tiene un token activo, nos deja eliminar al usuaio que bbuscamos por id
    const { id } = req.params
    const user = await User.findByIdAndDelete(id); //usuario que vamos a borrar
    res.status(200).json({msg:`el user ${user} ha sido eliminado`})
}

module.exports = {
    mailer,
    usuariosGet,
    userPut,
    signUp,
    usuariosDelete,
    userProfile

}