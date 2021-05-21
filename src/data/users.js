const bcrypt = require('bcryptjs');

const users = [

    {
        name: 'ADMIN',
        lastName: 'ADMIN',
        email: 'ADMIN@mail.com',
        password: bcrypt.hashSync('1234a_A',12),
        rol:'ADMIN_ROLE'
    },
    {
        name: 'Juan',
        lastName: 'Gonzalez',
        email: 'juanito@mail.com',
        password: bcrypt.hashSync('1234a_A',12),
        rol:'USER_ROLE'
        
    },
    {
        name: 'Maria',
        lastName: 'Barreiro',
        email: 'mery@mail.com',
        password: bcrypt.hashSync('1234a_A',12),
        rol:'USER_ROLE'
        
    },

]

module.exports = users;