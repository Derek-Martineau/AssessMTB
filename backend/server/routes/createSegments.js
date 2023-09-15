const express = require('express');
const router = express.Router();
const segments = require('../models/segmentModel');

router.post('/segments', async (req, res) => {
    console.log(req.body);

    // Check if req.body.Features exists before trying to push data
    if (!req.body.Features) {
        return res.status(400).send({ message: "Error: 'Features' array is missing in the request body." });
    }
    
    // Creates a new segment
    const createSegment = new segments({
        segmentName: req.body.segmentName,
        description: req.body.description,
        difficulty: req.body.difficulty,
        park: req.body.park,
        Features: req.body.Features // Assign Features array directly
    });

    try {
        const saveSegment = await createSegment.save();
        res.send(saveSegment);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new segment", error: error.message });
    }

});

module.exports = router;
