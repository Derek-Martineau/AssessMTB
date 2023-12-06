const mongoose = require("mongoose");

const segmentSchema = new mongoose.Schema({
    segmentName: {
        type: String,
        required: true,
        label: "The name of the segment",
    },
    description: {
        type: String,
        required: true,
        label: "The description and facts about the segment",
    },
    difficulty: {
        type: String,
        required: true,
        label: "The difficulty of the segment",
    },
    park: {
        type: String,
        required: true,
        label: "park the segment lives in",
    },
    Features: [{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }]
}, { collection: "segments" });

module.exports = mongoose.model('Segment', segmentSchema);
    