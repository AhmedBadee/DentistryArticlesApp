const express       = require('express');
const bodyParser    = require('body-parser');
const routes        = require('./routes/api');
const mongoose      = require('mongoose');
const session       = require('express-session');
const cookieParser  = require('cookie-parser');
const passport      = require('passport');

const app  = express();
const statusUnprocessibleEntity = 422;

// connect to db
mongoose.connect('mongodb://ahmed:ahmedbadee@ds149954.mlab.com:49954/dentistry', {useMongoClient: true});
mongoose.Promise = global.Promise;

app.set('port', (process.env.PORT || 3000));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// handle static files
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: '#@%%*&^(&^REDfgY)($@%23@!@#%%$%#^&',
    resave: false,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.use(function(error, request, reponse, next) {
    reponse.status(statusUnprocessibleEntity).send({error: error.message});
});

app.use(function(request, response, next) {
    response.locals.user = request.user || null;
    next();
});

app.get('/', function(request, response) {
    response.send({message: 'You made it!'});
});

app.listen(app.get('port'));
