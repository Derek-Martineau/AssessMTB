const express = require("express");
const router = express.Router();
const Tournament = require('../../models/tournamentModel');
const { tournamentValidation } = require('../../models/tournamentValidator');

router.post('/create', async (req, res) => {
    console.log('Incoming request body:', req.body);

    // Parse startDate and endDate into Date objects
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    // Check if the parsed dates are valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format for startDate or endDate" });
    }

    // Create a new object with parsed dates
    const requestData = {
        ...req.body,
        startDate,
        endDate
    };

    // Perform validation
    const validationResult = tournamentValidation(requestData);

    if (!validationResult.success) {
        return res.status(400).json({ errors: validationResult.error });
    }

    const {
        locationPark,
        locationSegment,
        gender,
        age,
    } = requestData;

    const createTournament = new Tournament({
        locationPark,
        locationSegment,
        startDate,
        endDate,
        gender,
        age,
    });

    try {
        const savedTournament = await createTournament.save();
        res.status(201).json(savedTournament);
    } catch (error) {
        res.status(500).json({ message: "Error trying to create tournament", error });
    }
});

module.exports = router;
