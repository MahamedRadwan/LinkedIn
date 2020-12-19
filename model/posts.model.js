const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:String,
    body: String,
    userID:{ type: mongoose.Schema.Types.ObjectId,ref:'user' }
   


})
module.exports= mongoose.model('post',postSchema)