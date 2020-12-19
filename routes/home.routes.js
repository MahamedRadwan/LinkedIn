const server = require('express').Router()
const session = require('express-session');
const postModel = require('../model/posts.model');

server.get('/home', async (req, res) => {
 let posts = await postModel.find({}).populate('userID','-password -email')
    if (req.session.userID)
    {
        res.render('home.ejs', { posts,fname:req.session.fname});

    }
    else
    {
        res.redirect('/');
    }


})
server.post('/handelposts', async (req, res) => {
    
    console.log(req.body);
    let { postTitle, postBody } = req.body;


    await postModel.insertMany({ title: postTitle, body:postBody,userID: req.session.userID})

    res.redirect('/home');

})
server.get('/handellogout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    })

    
})

module.exports = server;