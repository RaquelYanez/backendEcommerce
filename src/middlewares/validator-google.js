const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

const googleValidator = async (idToken) => {

try {
   const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT,
  });
  const {name, family_name: lastName, email} = ticket.getPayload(); //aqui viene toda la informacion del usuario
   //desestructuro y renombro el payload para poder llamarlo como en el modelo
  
   return {
    name,
    lastName,
    email
  };
} catch (error) {
  console.log('token',error)
}
    
  
 
}

module.exports = {googleValidator}