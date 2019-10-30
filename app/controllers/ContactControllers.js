const express = require('express')
const router = express.Router()
const { authenticateUser} = require('../middlewares/authentication')
const { Contact } = require('../models/Contact')

router.get('/',authenticateUser, function(req,res){
    // will return all the document in the collection
    Contact.find({ user: req.user._id })
    .then(function(contacts){
        res.send(contacts)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.post('/',authenticateUser, function(req,res){
    const body = req.body
    const contact = new Contact(body)
    contact.user = req.user._id
    // creating an object of contact type
   // contact.name = body.name ..... 
    contact.save()
        .then(function(contact){
            res.send(contact)
        })
        .catch(function(err){
            res.send(err)
        })
})

router.get('/:id',authenticateUser, function(req,res){
    const id = req.params.id
    Contact.findOne({
        user: req.user._id,
        _id: id
    })
        .then(function(contact){
            if(contact){   // if the contact is found in db
            res.send(contact)
            } else {   // else the contact not found in db, returns empty array
                res.send({})
            }
        })
        .catch(function(err){
            res.send(err)
        })
})

router.delete('/:id',authenticateUser, function(req,res){
    const id = req.params.id
    Contact.findOneAndDelete({
        user: req.user._id,
        _id: id
    })
        .then(function(contact){
            res.send(contact)
        })
        .catch(function(err){
            res.send(err)
        })

})

router.put('/:id',authenticateUser, function(req,res){
    const id = req.params.id
    const body = req.body
    Contact.findOneAndUpdate({
        user: req.user._id,
        _id: id
    }, { $set: body }, { new: true, runValidators: true})
        .then(function(contact){
            res.send(contact)
        })
        .catch(function(err){
            res.send(err) 
        })
})

module.exports = {
    contactRouter: router
}