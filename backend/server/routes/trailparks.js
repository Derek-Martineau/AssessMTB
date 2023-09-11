const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const trailParks = require('../models/trailparks');

// Middleware to parse JSON request bodies
router.use(express.json());

router.get('/trailparks', async (req, res) => {
    const parks = await trailParks.find();
    return res.json(parks);
});

router.post('/trailparks', async (req, res) => {
    console.log(req.body);

    // Extract segmentIDs from the request payload
    const segmentIDs = req.body.segments.map(segment => segment.segmentID);

    // Creates a new trail park with the associated segmentIDs
    const createTrailPark = new trailParks({
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
        const park = await trailParks.findOne({ parkName: parkName });

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
router.get('/trailparks/:id', async (req, res) => {
    try {
        const park = await trailParks.findById(req.params.id);
        return res.json(park);
    } catch (error) {
        return res.status(500).json({ message: "Error getting trail park by ID", error: error.message });
    }
});

module.exports = router;
