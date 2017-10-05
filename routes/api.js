const express       = require('express');
const Article       = require('../models/article');
const User          = require('../models/user');
const multer        = require('multer');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();

// Configuring multer options
const storage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, './public/images');
    },
    filename: function(request, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({storage: storage}).any();

// Configuring passport options
passport.use(new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(error, user) {
        if (error) throw error;

        if (!user) {
            return done(null, false, {message: 'Unknown user'});
        }

        User.comparePassword(password, user.password, function(error, isMatch) {
            if (error) throw error;

            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid Password'});
            }
        });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
   
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function (error, user) {
      done(error, user);
    });
});

function ensureAuth(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.redirect('/login');
    }
}

// Home route
router.get('/', function(request, response, next) {
    Article.find({}).then(function(articles) {
        response.send(articles);
    });
});

// Register routes
router.get('/register', function(request, response, next) {
    response.render('register');
});

router.post('/register', function(request, response, next) {
    var username = request.body.username;
    var password = request.body.password;

    var newUser = new User({
        username: username,
        password: password
    });

    User.createUser(newUser, function(error, user) {
        if (error) throw error;
        response.redirect('/login');
    });
});

// Login routes
router.get('/login', function(request, response) {
    response.render('login');
});

router.post('/login', passport.authenticate('local'), function(request, response) {
    response.redirect('/article');
});

// Article routes
router.get('/article', ensureAuth,function(request, response, next) {
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
