const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required']
    },
    brief: {
        type: String,
        required: [true, 'Brief field is required']
    },
    article: {
        type: String,
        required: [true, 'Article field is required']
    },
    images: {
        type: [String],
        default: ['empty']
    }
});

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;
