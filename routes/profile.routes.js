const server = require('express').Router()
const postModel = require('../model/posts.model');

server.get('/profile', async (req, res) => {
    if (req.session.userID)
    {
        let posts =  await postModel.find({userID:req.session.userID}).populate('userID','-password -email')
    
        res.render('profile.ejs', {posts ,fname:req.session.fname,lname:req.session.lname});
    
    }
    else
    {
        res.redirect('/');
    }
    

})
module.exports = server;