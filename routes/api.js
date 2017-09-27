const express          = require('express');
const Article          = require('../models/article');
const multer           = require('multer');

const router           = express.Router();

var session;

const storage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, './images');
    },
    filename: function(request, file, callback) {
        callback(null, request.body.title);
    }
});

const upload = multer({storage: storage}).any();

router.get('/login', function(request, response) {
    if (session) {
        response.redirect('/article');
    } else {
        response.render('login');
    }
});

router.post('/login', function(request, response) {
    if (session) {
        response.redirect('/article');
    } else if (request.body.username == 'admin' && request.body.password == 'admin') {
        request.sessionID = request.body.username;
        session = request.sessionID;
        response.redirect('/article');
    }
});

router.get('/article', function(request, response, next) {
    if (session) {
        response.render('article');
        console.log(request);
    } else {
        response.redirect('/login');
    }
});

router.post('/article', function(request, response, next) {
    upload(request, response, function(error) {
        if (error) throw error;

        var uploadedFilesNames = [String];
        for (var i = 0; i < request.files.length; i++) {
            uploadedFilesNames[i] = request.files[i].filename + '_fig-' + (i + 1);
        }

        Article.create({
            title: request.body.title,
            brief: request.body.brief,
            article: request.body.article,
            images: uploadedFilesNames
        }).then(function(article) {
            response.send(article);
        }).catch(next);
    });
});

router.put('/article/:id', function(request, response, next) {
    
});

router.delete('/article/:id', function(request, response, next) {
    
});

module.exports = router;
