const express          = require('express');
const Article          = require('../models/article');
const bodyParser       = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const router           = express.Router();

router.get('/article', function(request, response, next) {
    response.render('article');
});

router.post('/article', urlEncodedParser,function(request, response, next) {
    Article.create({
        title: request.body.title,
        brief: request.body.brief,
        article: request.body.article
    }).then(function(article) {
        response.send(article);
    }).catch(next);
});

router.put('/article/:id', function(request, response, next) {
    
});

router.delete('/article/:id', function(request, response, next) {
    
});

module.exports = router;
