const { Router } = require('express');
const {check } = require('express-validator');
const {addCategory} = require('../controllers/categoryController')


const router = Router();

//Add new brand (ADMIN_ROLE) private(TOKEN)
router.post('/',[ check('categoryName', 'El nombre es obligatorio').not().isEmpty(),],addCategory);

const Category  = require('../entities/category');
router.get('/categoryName/:keyword', getBrandByName = async function (req,res){
    const {keyword} = req.params;
    const categorySelected = await Category.findOne(
        {categoryName:{$regex:keyword, $options:'i'}})
        res.status(200).json(categorySelected)
})
module.exports = router;