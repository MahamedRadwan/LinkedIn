const express = require('express');
const path = require('path');
const server = express();
const mongoose = require('mongoose');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const port = "3000";

const indexRoute = require('./routes/index.routes');
const homeRoute = require('./routes/home.routes')
const registerRoute = require('./routes/registeration.routes')
const account_settingRoute = require('./routes/account_setting.routes')
const ProfileRoute = require('./routes/profile.routes')

let store = new MongoDBStore({
    uri: 'mongodb+srv://Mohamed:Mohamed@cluster0.qkkyn.mongodb.net/test',
    collection: 'mySessions'
});
server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
}))
server.use(flash());
server.set('view engine', 'ejs');
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.urlencoded({ extended: false }));

server.use(indexRoute,homeRoute, registerRoute, account_settingRoute, ProfileRoute);

mongoose.connect('mongodb+srv://Mohamed:Mohamed@cluster0.qkkyn.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
server.listen(port, () => {
    console.log("the server is running....");
})