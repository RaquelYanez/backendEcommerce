//const jwt = require('jwt-simple')
const jwt = require('jsonwebtoken');

//Creamos una promesa, 
const createToken  = ( userId = '' ) => {

    return new Promise(( res, rej ) =>{
        //playload era el que mostramos con el JWT mostrariamos solo el idUser
        const payload = { userId };
        const secretOrPrivateKey = process.env.SECRET_TOKEN

        jwt.sign( payload, secretOrPrivateKey, { 
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

module.exports = {createToken}