const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

module.exports = () => {
    const databaseParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try{
        mongoose.connect("mongodb+srv://AssessMTB:Admin1@cluster0.gdipouo.mongodb.net/?retryWrites=true&w=majority")
        console.log("The backend has connected to the MongoDB database.")

        // TODO: add a class/method that initializes configuration data in mongo database
        
    } catch(error){
        console.log(`${error} could not connect`)
    }
}

