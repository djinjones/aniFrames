const { Schema, model } = require('mongoose');

const animeSchema = new Schema({
    titles: [{
        type: String,
        required: true,
    }],
    coverImage: {
        type: String,
    },
    imageUrl: [{
        type: String,
    }],
    characters: [{
        type: Schema.Types.ObjectId,
        ref: 'Character',
    }],



}, { timestamps: true });

module.exports = model('Anime', animeSchema);