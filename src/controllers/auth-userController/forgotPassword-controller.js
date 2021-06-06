const User = require('../../entities/user');
const bcryptjs = require('bcryptjs');
const { createToken} = require('../../middlewares/jwt');
const nodemailer = require('nodemailer');

async function execute(req,res){
    
const {email} = req.body;
    if(!email){
        return res.status(400).json({message:'necesitamos el nombre'})
    }
    const user = await User.findOne({email})
    const token = await createToken(user.id);
    const verificationLink = `https://ecommerce-rj.herokuapp.com/new-pasword/${token}` 
    
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
            from: 'Forgot password" <jositoRaquelTfc@gmail.com>',
            to: user.email, 
            subject: "Updated Password ✔",
            text: `Hola, ${user.name},`,
            html:`
            <b>Haz click en el link para resetear el password: </b>
            <a href="${verificationLink}">${verificationLink}</a>

            Att.JRSports 
            `
        })
    res.status(200).json({ msg: 'todo ok conectar',verificationLink})  
}

module.exports = execute