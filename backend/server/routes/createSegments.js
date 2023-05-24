const express = require('express');
const router = express.Router();
const segments = require('../models/segmentModel');

router.post('/segments', async (req, res) => {
    console.log(req.body);
    
    // creates a new segment
    const createSegment = new segments({
        segmentName: req.body.segmentName,
        description: req.body.description,
        difficulty: req.body.difficulty,
        park: req.body.park,     
    });
    createSegment.Features.push(req.body.Features[0]);
    try {
        const saveSegment = await createSegment.save();
        res.send(saveSegment);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new segment", message: error.message });
    }

});
module.exports = router;