const { Schema, model } = require('mongoose');

const submissionSchema = new Schema({
    anime: {
        type: String,
        required: true,
    },
    newAnime: {
        type: Boolean,
        required: true,
    },
    animeImages: [{
        type: String,
    }],
    characters: [{
        type: String,
    }],
    characterImages: [{
        type: String,
    }],
    date: {
        type: Date,
        default: Date.now,
    }

}, { timestamps: true });

module.exports = model('Submission', submissionSchema);