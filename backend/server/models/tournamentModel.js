const mongoose = require ('mongoose');

const tournamentSchema = new mongoose.Schema({
    locationPark: { 
        type: String,
        required: true,
        label: "Bike Park Name"
    },
    locationSegment: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        label: "Segment Name",
        ref: "Segment"
    },
    startDate: {
        type: Date,
        required: true,
        label: "Starting Day"
    },
    endDate: {
        type: Date,
        required: true,
        label: "Ending Day"
    },
    gender: {
        type: String,
        required: true,
        label: "User's gender"
    },
    age: {
        type: String,
        required: true,
        label: "User's Age"
    }
}, { collection: "tournaments" });

module.exports = mongoose.model('Tournament', tournamentSchema);
