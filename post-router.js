const express = require('express');
const Data = require('./data/db.js');

const router = express.Router();

module.exports = router;

//get posts
router.get('/', (req, res) => {
    Data.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
})

//make posts
router.post('/', (req, res) => {
    const newPost = req.body
    if(newPost.title && newPost.contents) {
        Data.insert(newPost)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({error: 'There was an error while saving the post to the database.'})
        })
    }
    else {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
})

//get posts by id
router.get('/:id', (req,res) => {
    const {id} = req.params;
    Data.findById(id)
        .then(post => {
            if(post) {
                res.status(200).json(post)
            }
            else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post information could not be retrieved."})
        })
})

