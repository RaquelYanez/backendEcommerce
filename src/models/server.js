const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
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
            category: '/api/category',
            order:'/api/order',
            product: '/api/product',
            size: '/api/size',
            user: '/api/user',
            

            
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
        //CORS
        this.app.use(cors());
        //Serializamos la informacion a JSON nos permite usar JSON en dataBody
        this.app.use(express.json());
        if(process.env.NODE_ENV === 'desarollo'){
            this.app.use(morgan('dev'));   
        }
        
        //errors
       // this.app.use(notFound)
        //this.app.use(errorHandler)
        //direccion public para el log
        this.app.use(express.static('public'));
     }
    routes(){ 
       //usamos un middleware para cargar las rutas orden alfab
       this.app.use(this.paths.auth, require('../routes/auth'));
       this.app.use(this.paths.brand, require('../routes/brand'));
       this.app.use(this.paths.order, require('../routes/order'));
       this.app.use(this.paths.product, require('../routes/product'));
       this.app.use(this.paths.size, require('../routes/size'));
       this.app.use(this.paths.user, require('../routes/user'));
       this.app.use(this.paths.category, require('../routes/category'));


       //en el front necesitamos un script especifico
       // <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
       /** addPaypal = async() =>{ const {data: cientId}= await axios.get('api/config/paypal')
        * const script = document.createElement('script');
        * script.type = 'text/javascript';
        * script.src = `https://www.paypal.com/sdk/js?client-id=${cientId}`
        * script.async = true;
        * } 
        * EL boton de paypal en react es con : npm i react-paypal-button-v2
        * 
        *el usuario por defecto es 
        Email ID: sb-tgyj46289373@personal.example.com
        System Generated Password: O*5!E%Fw
        Cuando esto suceda, tenemos que cambiar el estado de pago, a isPaid:true, es el endPoint de put updateStatePaid
        * */
       this.app.get('api/config/paypal',(req,res) => res.send(process.env.PAYPAL_CLIENTID))
    }

    listen(){
        this.app.listen(this.port,this.host, () => {
            console.log(`Servidor corriendo en puerto ${this.port} en modo ${this.development}, host ${this.host}`);
        })
    }
    
}

module.exports = Server;