const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const TrailPark = require('../models/trailparks'); // Import the TrailPark model
const Segment = require('../models/segmentModel'); // Import the Segment model

// Middleware to parse JSON request bodies
router.use(express.json());

router.get('/trailparks', async (req, res) => {
    const parks = await TrailPark.find();
    return res.json(parks);
});

router.post('/trailparks', async (req, res) => {
    console.log(req.body);

    // Extract segmentIDs from the request payload
    const segmentIDs = req.body.segments.map(segment => segment.segmentID);

    // Creates a new trail park with the associated segmentIDs
    const createTrailPark = new TrailPark({
        parkName: req.body.parkName,
        description: req.body.description,
        address: req.body.address,
        photo: req.body.photo,
        segments: segmentIDs
    });

    try {
        const saveTrailpark = await createTrailPark.save();
        res.send(saveTrailpark);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create a new trail park", error: error.message });
    }
});

// Middleware function to check if a park with the same name already exists
async function checkIfParkExists(req, res, next) {
    const { parkName } = req.body;

    try {
        const park = await TrailPark.findOne({ parkName: parkName });

        // Checks if the park exists
        if (park) {
            return res.status(401).send({ message: "Park already exists, please try a different name" });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Error checking for park existence", error: error.message });
    }
}

// Use the middleware in the post route
router.post('/trailparks', checkIfParkExists);

// Get park description by id
router.get('/segments/:id', async (req, res) => {
    try {
        const park = await Segment.findById(req.params.id);
        return res.json(park);
    } catch (error) {
        return res.status(500).json({ message: "Error getting trail park by ID", error: error.message });
    }
});

// Route to fetch segments by trail park _id
router.get("/trailparks/getsegments/:trail_id", async (req, res) => {
    try {
      const trail = await TrailPark.findById(req.params.trail_id).populate('segments');
  
      // Check if the trail park with the given ID exists
      if (!trail) {
        return res.status(404).json({ message: "Trail park not found for the specified ID" });
      }
  
      // Access the segments associated with the trail park
      const Segments = trail.segments;
  
      return res.json( Segments );
    } catch (error) {
      return res.status(500).json({ message: "Error getting segments by trail park ID", error: error.message });
    }
  });
  

module.exports = router;
