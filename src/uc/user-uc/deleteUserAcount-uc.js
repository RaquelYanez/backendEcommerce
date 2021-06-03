const User = require('../../entities/user');
const nodemailer = require('nodemailer');

async function execute(id){
    const user = await User.findById(id);
    if(user){
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
          from: 'BYE! - Ecommerce-rj" <jositoRaquelTfc@gmail.com>',
          to: user.email, 
          subject: "Deleted Profile x",
          text: `Hola, ${user.name}, te echaremos de menos!

      Att.JRSports`
      
      })
      await user.remove()
      return user  
  }

}
module.exports = execute