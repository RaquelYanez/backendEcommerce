const Size = require('../../../entities/size');

async function execute(){
    const sizes = await Size.find({})
    return sizes
};

module.exports = execute 