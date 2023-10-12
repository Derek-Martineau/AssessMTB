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
    photo: {
        name: String,
        desc: String,
        link: String,
    }, 
}, { collection: "features" });

module.exports = mongoose.model('features', featureSchema);
