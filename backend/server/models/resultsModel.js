const mongoose = require('mongoose');

const resultsModel = new mongoose.Schema({
    Date:{
        type: Date,
        required: true,
        lable: "Date of when assessment was saved",
    },
    User:{
        type: String,
        required: true,
        ID
    }

    }
)
