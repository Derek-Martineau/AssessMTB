const mongoose = require("mongoose");

const userLineChoiceSchema = new mongoose.Schema({
    users: {
        type: String,
        required: true,
        label: "The users associated with this line choice",
    },
    lineChoice: {
        type: String,
        required: true,
        label: "The line choice for the users",
    },
});

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
    userLineChoices: [userLineChoiceSchema], 
}, { collection: "features" });

module.exports = mongoose.model('features', featureSchema);
