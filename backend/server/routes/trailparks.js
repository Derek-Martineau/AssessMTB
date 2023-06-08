const express = require("express");
const router = express.Router();
const trailParks = require('../models/trailparks');

router.get('/trailparks', async (req, res) => {
    const park = await trailParks.find();
    return res.json(park)
  })

router.post('/trailparks', async (req, res) => {
    console.log(req.body);
    
    // creates a new trail park
    const createTrailPark = new trailParks({
        parkName: req.body.parkName,
        description: req.body.description,
        address: req.body.description,
        photo: req.body.photo,
        Segments: [{
            segmentID: req.body.segmentID,
            }]
    });
 
    try {
        const saveTrailpark = await createTrailPark.save();
        res.send(saveTrailpark);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new trail park", message: error.message });
    }

})

 async function checkIfParkExists(body)  {
    
  const { parkName } = req.body;

  const park = await trailparks.findOne({ parkname: parkName });

  //checks if the park exists
  if (park) {
    return res
      .status(401)
      .send({ message: "park does not exists, try again" });
  }
}
 {checkIfParkExists}

  module.exports = router;

  //get park description by id
  router.get('/trailparks/:id', async (req, res) => {
    const park = await trailParks.findById(req.params.id);
    return res.json(park)
  })