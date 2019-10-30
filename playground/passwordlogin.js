const bcryptjs = require('bcryptjs')
const encryptPassword = '$2a$10$FaOjRKMgXLsA0e6BNc18F.Tx6nEtvlDVBUUJ05InxZ3AuAnvs14wO'

const password = 'secret123'
bcryptjs.compare(password,encryptPassword)
    .then(function(result){
        console.log(result)
    })