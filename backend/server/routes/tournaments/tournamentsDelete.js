const express = require("express");
const router = express.Router();
const Tournament = require('../../models/tournamentModel');

// Delete all tournaments
router.delete('/deleteAll', async (req, res) => {
    try {
        await Tournament.deleteMany({});
        res.status(200).json({ message: "All tournaments deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error trying to delete all tournaments", error });
    }
});

// Delete tournament by ID
router.delete('/deleteById/:id', async (req, res) => {
    const tournamentId = req.params.id;

    try {
        const deletedTournament = await Tournament.findByIdAndDelete(tournamentId);
        
        if (!deletedTournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        res.status(200).json({ message: "Tournament deleted successfully", deletedTournament });
    } catch (error) {
        res.status(500).json({ message: "Error trying to delete tournament by ID", error });
    }
});

module.exports = router;
