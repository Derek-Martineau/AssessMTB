const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
    featureName: {
        type: String,
        required: true,
        label: "The name of the feature",
    },
    description: {
        type: String,
        required: true,
        label: "The description and facts about the feature",
    },

    photoID: {
        type: String,
        required: false,
        label: "The feature photo",
    },

    photos: [{
        name: String,
        desc: String,
        base64Data: String,
        img: {
            data: Buffer,
            contentType: String
        }
    }]
}, { collection: "features" });

module.exports = mongoose.model('features', featureSchema);