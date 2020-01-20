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
//make comments
router.post("/:id/comments", (req, res) => {
    const userComment = req.body;
    userComment.post_id = req.params.id
    if(userComment.post_id) {
        if(userComment.text) {
            Data.insertComment(userComment)
            .then(comment => {
                res.status(201).json(comment)

            })
            .catch(err => {
                res.status(500).json({error: "There was an error while saving the comment to the database."})
            })
        }
        else {
            res.status(400).json({errorMessage: "Please provide text for the comment."})
        }
    }
    else {
        res.status(404).json({message: "The post with the specified ID does not exist."})
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

//get post comments by id
router.get('/:id/comments', (req, res) => {
    const {id} = req.params;
    Data.findPostComments(id)
        .then(post => {
            if(post) {
                res.status(200).json(post)
            }
            else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The comments section could not be retrieved."})
        })
})


router.delete("/:id", (req, res) => {
    const {id} = req.params;

    Data.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(204).end()
            }
            else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({eror: "The post could not be removed."})
        })
})

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Data.update(id, changes)
        .then(updated => {
            if(updated) {
                if(changes.title && changes.contents) {
                    res.status(200).json(updated)
                }
                else{
                    res.status(400).json({errorMessage: "Please provide title and contents."})
                }
            }
            else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post information could not be modified."})
        })
})