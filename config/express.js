var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var validator = require('express-validator');

module.exports=function(){
    var app = express();

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json());
    app.use(validator());


    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app);

    return app;
};

