const express = require('express');
const router = express.Router();
const segments = require('../models/assessmentResults');

router.post('/Results', async (req, res) => {
    console.log(req.body);
    
    // creates a new feature
    const createResults = new results({
        featureName: req.body.featureName,
        description: req.body.description,
        photo: [{
            name: req.body.name,
            desc: req.body.desc,
            link: req.body.link
            }]
    });
 
    try {
        const saveResults = await createResults.save();
        res.send(saveResults);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new assessment results", message: error.message });
    }

});
module.exports = router;