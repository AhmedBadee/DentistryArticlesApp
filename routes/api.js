const express          = require('express');
const Article          = require('../models/article');
const multer           = require('multer');
const router           = express.Router();

const storage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, './images');
    },
    filename: function(request, file, callback) {
        callback(null, request.body.title + file.originalname);
    }
});

const upload = multer({storage: storage}).any();

router.get('/article', function(request, response, next) {
    response.render('article');
});

router.post('/article', function(request, response, next) {
    upload(request, response, function(error) {
        if (error) throw error;

        var uploadedFilesNames = [String];
        for (var i = 0; i < request.files.length; i++) {
            uploadedFilesNames[i] = request.files[i].filename;
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
