const server = require('express').Router()
const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator')
server.get('/acount_setting', (req, res) => {
    let oldInputs = req.flash('oldInputs')[0];
    if (oldInputs == undefined) {
        oldInputs = { oldPassword:'', newPassword:'', rePassword:''}
    }
    if (req.session.userID)
    {
        res.render('acount_setting.ejs',{fname:req.session.fname,errors:req.flash('errors'),oldInputs});

    }
    else
    {
        res.redirect('/');
    }
    
    


})
server.post("/handelRepassword",
    check('newPassword').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    check('rePassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
        return false
    }
    
    return true
  }),
    async (req, res) => {
        let user = await userModel.findOne(_id = req.session.userID);
        const { oldPassword,newPassword,rePassword } = req.body;

        const errors = validationResult(req)

        console.log(errors.array());
        let isEmpty = errors.isEmpty();
        let match = await bcrypt.compare(oldPassword, user.password);
        console.log(match);
        if (match)
        {
            if(isEmpty)
            {
                bcrypt.hash(newPassword, 14, async (err, hash)=> {
                    await userModel.updateOne({_id:req.session.userID},{password:hash });
                    res.redirect('/home')
                });
            }
            else
            {
                req.flash('errors', errors.array())
                req.flash('oldInputs', req.body)
            res.redirect('/acount_setting')
            }   
        }
    
    
    
})
module.exports = server;