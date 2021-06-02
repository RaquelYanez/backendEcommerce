const Size = require('../../../entities/size');

async function execute(sizeName){
    const sizeDB = await Size.findOne({sizeName});
    if(!sizeDB){  
        const newSize =  new Size({sizeName});
        await newSize.save();
        return newSize   
    }
};

module.exports = execute 