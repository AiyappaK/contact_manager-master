const express = require('express')
const uuid = require('uuid')        //npm install --save uuid
const port = 3000
const app = express()

app.use (express.json())
//localhost:3000
//route handlers
// app.httpMethod(PATH,FUNCTION)
app.get('/',function(request, response){
    response.send('Hello World')
})
app.get('/about',function(req,res){
    res.send('<h2>About Us Page</h2>')
})
app.get('/users',function(req,res){
    const users = [
        {id: 1, name: 'sumi'},
        {id: 2, name:'abc'},
        {id:3, name:'def'},
        {id :4, name: 'pqrs'}
    ]
    res.send(users)
})

// list all movies
const movies = [
    {id: uuid(), name: 'KGF', rating: 4, category: 'Action', description: 'Mafia movie'},
    {id: uuid(), name: 'bahubali', rating: 4, category: 'Action', description: 'Kingdom based movie'}
]
app.get('/movies',function(req,res){
    res.send(movies)
})
// to show one movie details
app.get('/movies/:id', function(req,res){
    // res.send(`you selected movie with id ${req.params.id}`)
    const movie = movies.find(function(movie){
        return movie.id == req.params.id
    })
    if(movie){
        res.send(movie)
    }else {
        res.send(`movie with id ${req.params.id} not found`)
    }
})
// create a movie
app.post('/movies/create', function(req,res){
    const movie = req.body
    movie.id = uuid()
    movies.push(movie)
    res.send({
        movie,
        notice: 'succesfully added a movie'             //app.use (express.json())
    })
} )
// update a movie
app.put('/movies/edit/:id', function(req,res){
    const id = req.params.id
    const body = req.body
    const movie = movies.find(function(movie){
        return movie.id == id
    })
    if(movie){
        Object.assign(movie,body)
        res.send({
            movie,
            notice: 'succesfully updated a movie'
        })
    }else {
        res.send(`movie with id ${id} not found`)
    }
})

//delete a movie
app.delete('/movies/delete/:id',function(req,res){
    const id = req.params.id
    const index = movies.findIndex(function(movie){
        return movie.id = id
    })
    if(index >= 0){
        movies.splice(index,1)
        res.send({
            notice: 'succesfully removed the movie'
        })
    } else {
        res.send({
            notice: 'movie with id not found'
        })
    }
})

app.listen(port,function(){
    console.log('listening on port',port)
})