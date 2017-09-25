const express    = require('express');
const bodyParser = require('body-parser');
const routes     = require('./routes/api');
const mongoose   = require('mongoose');

const app  = express();
const port = 3000;
const statusUnprocessibleEntity = 422;

// connect to db
mongoose.connect('mongodb://localhost/dentistry', {useMongoClient: true});
mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');

// app.use(bodyParser.json());

app.use(routes);

app.use(function(error, request, reponse, next) {
    reponse.status(statusUnprocessibleEntity).send({error: error.message});
});

app.listen(process.env.port || port, function() {
    console.log('Listening to port ' + port);
});
