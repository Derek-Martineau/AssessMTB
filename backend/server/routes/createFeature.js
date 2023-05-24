const express = require('express');
const router = express.Router();
const features = require('../models/featureModel');

router.post('/features', async (req, res) => {
    console.log(req.body);
    
    // creates a new feature
    const createFeature = new features({
        featureName: req.body.featureName,
        description: req.body.description,
        photo: [{
            name: req.body.name,
            desc: req.body.desc,
            link: req.body.link
            }]
    });
 
    try {
        const saveFeature = await createFeature.save();
        res.send(saveFeature);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new feature", message: error.message });
    }

});
module.exports = router;