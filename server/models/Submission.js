const { required } = require('joi');
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
        name: { type: String, required: true }, // Character name
        url: { type: String, required: true },  // Image URL
    }],
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

}, { timestamps: true });

module.exports = model('Submission', submissionSchema);