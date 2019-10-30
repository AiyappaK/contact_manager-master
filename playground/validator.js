const validator = require('validator')
const email = 'sumi@gmail.com'
console.log(validator.isEmail(email))

//const validator = require('validator')
const url = 'https://www.google.com/'
console.log(validator.isURL(url))