//get features
 router.get('/features', async (req, res) => {
        const feature = await features.find();
        return res.json(feature)
    });
    module.exports = router;