const server = require('express').Router()
const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
server.get('/', (req, res) => {
    let errors = req.flash('errors')[0]
    let isPassword = req.flash('isPassword','true')[0];
    // let oldInputs = req.flash('oldInputs')[0];
    // console.log(errors);
     if (errors == undefined )
     {
        errors =false
    }
    if (isPassword == undefined )
     {
        isPassword =false
     }
     let oldInputs = req.flash('oldInputs')[0]
     if (oldInputs == undefined) {
         oldInputs = {email: '', password: ''}
     }

    res.render('index.ejs', {errors,isPassword,oldInputs,fname:req.session.fname})
})



server.post('/handelLogin', async (req, res) => {

    
    const { email, password } = req.body
   
    
    const user = await userModel.findOne({ email })
    // console.log(user);
    if (user == null) {
        req.flash('errors', 'true')
        req.flash('oldInputs', req.body)
        res.redirect('/')
    } else {
        let match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.userID = user._id
            req.session.fname = user.fName
            req.session.lname = user.lName
            req.session.userName = user.userName
            req.session.isLoggedIn = true
            req.flash('oldInputs', req.body)
            res.redirect('/home')
        } else {
            req.flash('isPassword', 'true')
            req.flash('oldInputs', req.body)
            res.redirect('/')
        }
    }
    // res.redirect('/home')

})
module.exports = server;
