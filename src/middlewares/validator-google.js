const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

const googleValidator = async (idToken) => {

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT,
  });
  //desestructuro y renombro el payload para poder llamarlo como en el modelo
  const {name, family_name: lastName, email} = ticket.getPayload(); //aqui viene toda la informacion del usuario
  
  return {
    name,
    lastName,
    email
  };
}

module.exports = {googleValidator}
