const mongoose = require('mongoose')

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB,{
            useNewUrlParser:true, 
            useCreateIndex:true,
            useUnifiedTopology: true,
            useFindAndModify:false
        })
        console.log('Conectado a Mongo')

    } catch (error) {
        throw new Error('Error al iniciar la bd', error)
    }
}

module.exports ={dbConnection}