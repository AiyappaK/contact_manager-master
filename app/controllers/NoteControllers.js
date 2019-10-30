const express = require('express')
const router = express.Router()
const { authenticateUser} = require('../middlewares/authentication')
const { Note } = require('../models/Note')
// note router
router.get('/',authenticateUser, function(req,res){
    Note.find({ user: req.user._id })
    .then(function(notes){
        res.send(notes)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.post('/',authenticateUser, function(req,res){
    const body = req.body
    const note = new Note(body)
    note.user = req.user._id
    note.save()
    .then(function(note){
        res.send(note)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.get('/:id',authenticateUser, function(req,res){
    const id = req.params.id
    Note.findOne({
        user: req.user._id,
        _id: id
    })
    .then(function(note){
        res.send(note)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.delete('/:id',authenticateUser,function(req,res){
    const id = req.params.id
    Note.findOneAndDelete({
        user: req.user._id,
        _id: id
    })
    .then(function(note){
        res.send(note)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.put('/:id',authenticateUser,function(req,res){
    const id = req.params.id
    const body = req.body
    Note.findOneAndUpdate({
        user: req.user._id,
        _id: id
    }, {$set: body}, {new: true, runValidators: true})
    .then(function(note){
        res.send(note)
    })
    .catch(function(err){
        res.send(err)
    })

})
module.exports = {
    noteRouter: router
}