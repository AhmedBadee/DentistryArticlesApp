const bcrypt   = require('bcryptjs');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username field is required']
    },
    password: {
        type: String,
        required: [true, 'password field is required']
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;

module.exports.createUser = function(user, callback) {
    bcrypt.genSalt(10, function(error, salt) {
        bcrypt.hash(user.password, salt, function(error, hash) {
            user.password = hash;
            user.save(callback); 
        });
    });
}

module.exports.getUserByUsername = function(username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.comparePassword = function(enteredPassword, hash, callback) {
    bcrypt.compare(enteredPassword, hash, function(error, isMatch) {
        if (error) throw error;
        callback(null, isMatch);
    });
}