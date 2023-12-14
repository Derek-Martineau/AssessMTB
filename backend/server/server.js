const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')
const getTrailParks = require('./routes/trailparks')
const createSegments = require('./routes/createSegments')
const createFeature = require('./routes/createFeature')
const getSegments = require('./routes/getSegments')
const updateFeature = require('./routes/updateFeature');
const resultsCreate = require('./routes/resultsCreate');
const imagesRoute = require('./routes/images');
const followerRoutes = require('./routes/following');

require('dotenv').config();
const SERVER_PORT = 8081

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)
app.use('/parks', getTrailParks)
app.use('/api', getSegments)
app.use('/api', createSegments)
app.use('/api', createFeature)
app.use('/api', updateFeature)
app.use('/api', resultsCreate)
app.use('/images', imagesRoute)
app.use('/following', followerRoutes);


app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
