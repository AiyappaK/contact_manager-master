const mongoose = require('mongoose')
//const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/contact-manager'
//DB configuration
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/contact-manager',{ useNewUrlParser: true })
    .then(function(){
        console.log('connected to db')
    })
    .catch(function(){
        console.log('OOPS!! , something went wrong')
    })
module.export = {
    mongoose
}