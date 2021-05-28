const {newUsersignIn} = require('../../uc');

//@desc REGISTRAR USUSARIOS
//@route POST /api/user
//@acces public
async function execute(req,res){
    const {name, lastName, email, password, rol} = req.body;
    try{
        const user = await newUsersignIn(name, lastName, email, password, rol)
        res.status(200).json({msg:'Se ha creado el usuario correctamente.',user})
    }catch(err) {
        console.log(err)
        res.status(400).send({msg:'No se ha podido crear al usuario.'})
    }
    } 

    module.exports = execute 