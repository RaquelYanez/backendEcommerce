const {newUsersignUp} = require('../../uc');
const nodemailer = require('nodemailer');

//@desc REGISTRAR USUSARIOS
//@route POST /api/user
//@acces public
async function execute(req,res){
    const {name, lastName, email, password, rol} = req.body;
    try{
        const user = await newUsersignUp(name, lastName, email, password, rol)
       //"manuelat120@gmail.com"
        res.status(200).json({msg:'Se ha creado el usuario correctamente.',user})
    }catch(err) {
        console.log(err)
        res.status(400).send({msg:'No se ha podido crear al usuario.'})
    }
    } 

    module.exports = execute 