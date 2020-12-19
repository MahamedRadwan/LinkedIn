const server = require('express').Router()
const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator')

server.get('/registration', (req, res) => {
    let oldInputs = req.flash('oldInputs')[0];
    if (oldInputs == undefined)
    {
        oldInputs = { fName:'',lName:'',userName:'' ,email:'', password:'' }
    }
    res.render('registration.ejs', { errors: req.flash('errors'), isLoggedIn: req.session.isLoggedIn,oldInputs})
})

server.post('/handelRegister',
    check('fName').matches(/[A-Z][a-z]*/),
    check('lName').matches(/[A-Z][a-z]*/),
    check('userName').matches(/[A-Z][a-z]*/),
    check('email').isEmail(),
    check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    
    async (req, res) => {
       
        const errors = validationResult(req)
        
        console.log(errors.array());
        let isEmpty = errors.isEmpty();
        let { fName, lName, userName, email, password } = req.body
        if(isEmpty)
        {
            bcrypt.hash(password, 14,async (err, hash)=> {
                await userModel.insertMany({ fName, lName, userName, email, password: hash });
                res.redirect('/')
            });
        }
        else
        {   req.flash('errors', errors.array())
            req.flash('oldInputs', req.body)
        res.redirect('/registration')
        }
            
})
module.exports = server;