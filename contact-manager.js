const express = require('express')
const cors = require('cors')
//const port = process.env.PORT ||  3000
const app = express()
app.use(express.json())
const port = 3005

//database connection
const {mongoose} = require('./config/database')


//  models
const {Contact} = require('./app/models/Contact')
const{Note} = require('./app/models/Note')
const{User} = require('./app/models/User')


//controllers
const {contactRouter} = require('./app/controllers/ContactControllers')
const { noteRouter } = require('./app/controllers/NoteControllers')
const { userRouter } = require('./app/controllers/UserControllers')


// urlrouting
app.use(cors())
app.use('/contacts',contactRouter)
app.use('/notes', noteRouter)
app.use('/users', userRouter)


app.listen(port,function(){
    console.log('listening on port',port)
})