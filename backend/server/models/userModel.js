const mongoose = require("mongoose");

//user schema/model
const newUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    email: {
      type: String,
      required: true,
      label: "email",
    },
    password: {
      required: true,
      type: String,
      min : 8
    },
    date: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
    }
  
    /*friends: [{type: mongoose.Schema.Types.ObjectsId, ref: 'Friends'}]
  }, //{timestamps: true}*/
  }
);

module.exports = mongoose.model('users', newUserSchema)