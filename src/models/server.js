const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
//const {notFound,errorHandler} =  require('../middlewares/error');

class Server{
    constructor(){
        // const app = express()
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.development = process.env.NODE_ENV;
        this.host = process.env.HOST || '0.0.0.0';
        /*
        this.userPath = '/api/user';
        this.authPath = '/api/auth';
        this.brandPath = '/api/'; */

        this.paths = {
            auth: '/api/auth',
            brand: '/api/brand',
            user: '/api/user',
            product: '/api/product'
        }
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
        //Serializamos la informacion a JSON nos permite usar JSON en dataBody
        this.app.use(express.json());
        //errors
       // this.app.use(notFound)
        //this.app.use(errorHandler)
     }
    routes(){ 
       //usamos un middleware para cargar las rutas orden alfab
       this.app.use(this.paths.auth, require('../routes/auth'));
       this.app.use(this.paths.brand, require('../routes/brand'));
       this.app.use(this.paths.user, require('../routes/user'));
       this.app.use(this.paths.product, require('../routes/product'));
    }

    listen(){
        this.app.listen(this.port,this.host, () => {
            console.log(`Servidor corriendo en puerto ${this.port} en modo ${this.development}, host ${this.host}`);
        })
    }
    
}

module.exports = Server;