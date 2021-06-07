const Size = require('../../../entities/size');

async function execute(id){
    const size = await Size.findById(id)
    return size
};

module.exports = execute 