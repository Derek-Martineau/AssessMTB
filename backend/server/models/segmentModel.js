import mongoose from 'mongoose';

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
        required: true,
        type: String,
        label: "The difficulty of the segment"
    },
    Features: [{
        name: String,
        desc: String,
        link: String
    }]
}, { collection: "segments" });
module.exports = mongoose.model('segments', segmentSchema)
