require('dotenv').config()
const router = require('express').Router()
const {Post, User} = require('../models')
const {validateToken} = require('../JWT')

//Get all posts
router.get('/', async(req,res) => {
    try{
        const foundPosts = await Post.find()
        .populate({path:'author', select:['username', 'pic']})
        // const foundAuthors = await User.find() // This refers to the User schema

        res.status(200).json({posts: foundPosts})
    }
    catch(err){
        res.status(400).json({error: err})
    }
})

//Get a single post
router.get('/:id', async(req, res) => {
    try{
        const foundPost = await Post.findById(req.params.id)
        .populate('author')
        // .populate({path:'author', select:['username', 'pic']})
        res.status(200).json({post: foundPost})
    }
    catch(err){
        res.status(400).json({error: err})
    }
})

//Create a post
router.post('/', validateToken, async(req,res) => {
    try{
        const createdPost = await Post.create(req.body)
            res.status(200).json(createdPost)
        
    }
    catch(err){
        res.status(400).json({error: err})
    }
})

//Update post
router.put('/:id', validateToken, async(req,res) => {
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({message: "Updated Post"})
    }
    catch(err){
        res.status(400).json({error: err})
    }
})

//Delete post
router.delete('/:id',validateToken, async (req, res) => {
    try{
        const deletedPost = await Post.findOneAndDelete(req.params.id)
        res.status(200).json({message: "Post Deleted" })
    }
    catch (err){
        res.status(400).json({error: err})
    }
}
)

router.get('*', (req,res) => {
    res.status(404).json({error: 'Page not found.'})
})

module.exports = router