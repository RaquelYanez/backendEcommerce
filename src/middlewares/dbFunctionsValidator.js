const {Role} = require('../entities/role');
const User = require('../entities/user');


const isValidRole = async(rol = ' ' ) => {

    const isRol = await Role.findOne({rol})
    if(!isRol){
        throw new Error(`El rol ${rol} no existe`)
    }
}

const ifEmailExists = async(email)=>{
    const emailExists = await User.findOne({email});
    if (emailExists){ 
        throw new Error(`El email ${email} ya esta en uso`);
    }
}

const userExistsById = async(id)=>{
    const userExists = await User.findById({_id:id});
    if (!userExists){ 
        throw new Error(`El id ${id} no existe`);
    }
}

//la edad del user es 18
//Comprobar el registro por email nodemailer como funciona y demas
module.exports= {isValidRole, ifEmailExists,userExistsById} 