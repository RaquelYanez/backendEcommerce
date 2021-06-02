const User = require('../../entities/user');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');

async function execute(name, lastName, email, password, rol){
    const user =  new User({
        name,
        lastName,
        email,
        password,
        rol: rol || 'USER_ROLE',
        });
    const salt = bcryptjs.genSaltSync(12);
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
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
        from: 'Welcome to Ecommerce-rj" <jositoRaquelTfc@gmail.com>',
        to: user.email, 
        subject: "Your Profile",
        text: `Hola, ${user.name}, estos son tus datos actuales:

        Nombre: ${user.name},
        Apellido: ${user.lastName},
        Email: ${user.email}.
    Recuerda que tienes un rol de ${user.rol}
    Att.JRSports` ,

      });
    return user
}
module.exports = execute