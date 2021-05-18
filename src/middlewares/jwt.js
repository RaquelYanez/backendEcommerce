//const jwt = require('jwt-simple')
const jwt = require('jsonwebtoken');

//Creamos una promesa, 
const createToken  = ( userId = '' ) => {

    return new Promise(( res, rej ) =>{
        //playload era el que mostramos con el JWT mostrariamos solo el idUser
        const payload = { userId };
        const secretOrPrivateKey = process.env.SECRET_TOKEN

        jwt.sign( payload, secretOrPrivateKey, { 
            //tiempo de caducidad
            expiresIn: '1h'
        }, (err, token) =>{ //callback
            if(err){
                console.log(err)
                rej({msg:'No se pudo generar el token'})
            }else{
             res(token);  
              
            }
            
        })
        
    })

}
   /*Manera antigua con jwt-simple
       const payload = { 
            sub: user._id, 
            //fecha de creacion y fecha de caducidad
            iat: moment().unix(),
            //con esto marco que quiero que caduque en 14 dias
            exp:moment().add(14, 'days').unix(),
        };
        */
module.exports = {createToken}