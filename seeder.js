const {Schema, model} = require('mongoose');
const { dbConnection } = require('./src/database/config');
//importo data
const users =  require('./src/data/users')
const brands =  require('./src/data/brands')
const products =  require('./src/data/products')
const roles =  require('./src/data/roles')

//importo model
const User = require('./src/entities/user')
const Role = require('./src/entities/role')
const Product = require('./src/entities/product')
const Order = require('./src/entities/order')
const Brand = require('./src/entities/brand')

require('dotenv').config();
dbConnection();

const importData = async () =>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Brand.deleteMany();
        await Role.deleteMany();

        await Role.insertMany(roles);
        //como tengo relacinado el usuario a un producto, el ADMIN de la posicion 0 es el que va a generar estos obejtos 
        const createdUsers = await User.insertMany(users);
        const admin = createdUsers[0]._id;

        //relaciona brand a producto
        const createdBrands = await Brand.insertMany(brands);
        const brand = createdBrands[0]._id;

        //para cada uno de los productos le anhado que el que los crea es el admin 
        const createdProducts = products.map(product=>{
            return{...product, user: admin, brand:brand}
        })
        await Product.insertMany(createdProducts);
        

        console.log('Data imported')
        process.exit()
    } catch (error) {
        console.error(`error ${error}`)
        process.exit(1)
    }
}

const destroyData = async () =>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Brand.deleteMany();
        await Role.deleteMany();
        console.log('Data destroyed')
        process.exit()
    } catch (error) {
        console.error(`error ${error}`)
        process.exit(1)
    }
}
if(process.argv[2] === '-d') {
    destroyData()
}else{
    importData()
}
