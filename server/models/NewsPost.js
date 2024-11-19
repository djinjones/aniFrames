const { Schema, model } = require('mongoose');

const newsPostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },

}, { timestamps: true });

module.exports = model('NewsPost', newsPostSchema);