const User = require('../../entities/user');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');

async function execute( id,name, lastName,password,email){
    const user = await User.findById(id)
    if(user){
        user.name = name || user.name,
        user.lastName = lastName || user.lastName
        if(user.googleEmail === false){
            user.email = email || user.email
        }
        if(password){
            user.password = password
            const salt = bcryptjs.genSaltSync(12);
            user.password = bcryptjs.hashSync(password, salt);
        }
    }
    const userUpdated = await user.save();
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
    Att.JRSports` 
    })
    return userUpdated
}
module.exports = execute