const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    fName: String,
    lName: String,
    userName: String,
    email: String,
    password:String



})
module.exports= mongoose.model('user',userSchema)