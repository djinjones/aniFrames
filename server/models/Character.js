const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    alternateNames: [{
        type: String,
    }],
    imageUrl: [{
        type: String,
    }],
    anime: {
        type: Schema.Types.ObjectId,
        ref: 'Anime',
        required: true,
    },
    
}, { timestamps: true });

module.exports = model('Character', characterSchema);