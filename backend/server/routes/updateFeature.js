const express = require("express");
const router = express.Router();
const Feature = require("../models/featureModel.js"); //fix

// Update a feature by ID
router.put('/features/:feature_id', async (req, res) => {
    try {
        const featureId = req.params.feature_id;
        const updatedFeatureData = req.body; // Assuming you send the updated data in the request body

        // Find the feature by ID and update it
        const updatedFeature = await Feature.findByIdAndUpdate(featureId, updatedFeatureData, { new: true });

        // Check if the feature with the given ID exists
        if (!updatedFeature) {
            return res.status(404).json({ message: "Feature not found for the specified ID" });
        }

        return res.json(updatedFeature);
    } catch (error) {
        return res.status(500).json({ message: "Error updating feature", error: error.message });
    }
});

module.exports = router;
