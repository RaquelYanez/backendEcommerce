const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        // const app = express()
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.authPath = '/api/auth';
        //Connect to bd
        this.conectarMongoDB();
        //Middelware funcion qe se inciia siempre en rutas de mi aplicacion
        this.middlewares();
        //Rutas de mi app las tendria que mover a routes
        this.routes();
    }
    
    async conectarMongoDB(){
        await dbConnection()
    }
    middlewares(){ //funcion que se ejecuta antes de llamar a un controlador o seguir con la ejecucion de mis peticiones
        //1 hacemos todas las validaciones necesarias y despues llamamos la peticion 
    //     this.app.use( express.)
        //CORS
        this.app.use(cors());
        //Serializamos la informacion a JSON
        this.app.use(express.json());
        
     }
    routes(){ 
       //usamos un middleware para cargar las rutas orden alfab
       this.app.use(this.authPath, require('../routes/auth'));
       this.app.use(this.userPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
    
}

module.exports = Server;