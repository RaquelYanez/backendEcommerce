

const collectionValidator = async (res, next) => { 
    const collectionBD = [
        'brands',
        'categories',
        'products',
        'sizes',
    ]
    if(!collectionBD.includes(collection)){
        return res.status(400).json({ msg:`No se puede encontrar nada en ${collection}`});
    }
    next();
}

module.exports = {collectionValidator}