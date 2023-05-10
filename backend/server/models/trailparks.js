const mongoose = require("mongoose");

//trailparks schema/model
const trailparks = new mongoose.Schema(
  {
    parkName: {
      type: String,
      required: true,
      label: "The name of the trail park",
    },
    description: {
      type: String,
      required: true,
      label: "The description and facts about the trail park",
    },
    address: {
      required: true,
      type: String,
      label: "The location of the trail park"
    },
    photo: {
      name: String,
      desc: String,
      
    Segments: [{
      segmentID: String,
      }],
      link: String

    }},
  { collection: "trailparks" }
);

module.exports = mongoose.model('trailparks', trailparks)