const{Router} = require('express');
const { Brand } = require('../entities');

const addBrand = async (req,res) =>{
    
    const  brandName  =  req.body.brandName;
    console.log({brandName});
    const brandDB = await Brand.findOne(brandName);
    if(brandDB){
        return res.status(400).json({msg: `La categoria ${brandDB.brandName} ya existe.`})
    }
    const data = {brandName}
    const brand =  new Brand(data);
    await brand.save();
    res.status(201).json(brand);
}

module.exports = {addBrand}