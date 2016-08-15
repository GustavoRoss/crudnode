var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var validator = require('express-validator');

module.exports=function(){
    var app = express();
    
    app.use(express.static('./app/public'));
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json());
    app.use(validator());

    load('routes', {cwd: 'app'})
    .then('infra')
    .into(app);

    app.use(function(req, res, next){
        res.status(404).render("erros/404");
    });   
    app.use(function(err, req, resp){
        if(process.env.NODE_ENV == 'production'){
            resp.status(500).render('erros/500');
            return;
        }
        
        next(err);

    });
    return app;
};

