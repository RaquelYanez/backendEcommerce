const { filterByName } = require('../../uc');
   
//@desc filtrar por categoria y palabra clave
//@route GET /:category/:keyword
//@acces public
async function execute(req,res){
    const {category} = req.params;
    const {keyword} = req.params; //seria la palabra clave
    //const regexCategory = new RegExp (category, 'i')
    //const regexKeyword = new RegExp (keyword, 'i')
    const pageSize = 5 
    const page = Number(req.query.pageNumber) || 1
    try { 
        const productObject = await filterByName(category,keyword,pageSize,page)
        const {product,total,pages} = productObject   
        res.status(200).json({total,page,pages,product})    
    }catch (error) {
       
        res.status(404).json({msg:`No hay productos de con ${keyword}`});
    }
}


module.exports = execute 