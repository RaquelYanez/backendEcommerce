const {newUsersignUp} = require('../../uc');
const nodemailer = require('nodemailer');

//@desc REGISTRAR USUSARIOS
//@route POST /api/user
//@acces public
async function execute(req,res){
    const {name, lastName, email, password, rol} = req.body;
    try{
        const user = await newUsersignUp(name, lastName, email, password, rol)
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, 
            auth: { 
              user: 'jositoRaquelTfc@gmail.com',
              pass:'mnpcrkceaakbutrm',
            }
          })
        await transporter.sendMail({
            from: 'Updated Profile - Ecommerce-rj" <jositoRaquelTfc@gmail.com>',
            to: user.email, 
            subject: "Updated Profile ✔",
            text: `Hola, ${user.name}, estos son tus datos actuales:

            Nombre: ${user.name},
            Apellido: ${user.lastName},
            Email: ${user.email}.
        Recuerda que tienes un rol de ${user.rol}
        Att.JRSports` ,

        
          }); //"manuelat120@gmail.com"
        res.status(200).json({msg:'Se ha creado el usuario correctamente.',user})
    }catch(err) {
        console.log(err)
        res.status(400).send({msg:'No se ha podido crear al usuario.'})
    }
    } 

    module.exports = execute 