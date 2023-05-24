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
        required: true,
        type: String,
        label: "The difficulty of the segment"
    },
    //friends: [{ type : ObjectId, ref: 'User' }],
    Features: [{
        required: true,
        type : mongoose.Schema.Types.ObjectId, ref: 'features'
    }]
}, { collection: "segments" });
module.exports = mongoose.model('segments', segmentSchema)
