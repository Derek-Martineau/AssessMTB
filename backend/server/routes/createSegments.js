const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const segments = require('../models/segmentModel');
const Image = require('../models/imageModel');

router.post('/segments', async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        // Check if req.body.features exists before trying to push data
        if (!req.body.features) {
            console.error("Error: 'features' array is missing in the request body.");
            return res.status(400).send({ message: "Error: 'features' array is missing in the request body." });
        }

        // Convert featureIDs to ObjectIds directly without using 'new' with ObjectId
        const featureIDs = req.body.features.map(feature => feature.featureID);

        // Creates a new segment using the correct featureIDs array
        const createSegment = new segments({
            segmentName: req.body.segmentName,
            description: req.body.description,
            difficulty: req.body.difficulty,
            park: req.body.park,
            features: featureIDs  // Use the featureIDs array here
        });

        const saveSegment = await createSegment.save();
        res.send(saveSegment);
    } catch (error) {
        console.error("Error trying to create a new segment:", error);
        res.status(400).send({ message: "Error trying to create a new segment", error: error.message });
    }
});

module.exports = router;
