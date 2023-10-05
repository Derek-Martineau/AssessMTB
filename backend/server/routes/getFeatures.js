//get features
 router.get('/features', async (req, res) => {
        const feature = await features.find();
        return res.json(feature)
    });

    router.get("/segments/getphotos/:segment_id", async (req, res) => {
        try {
          const segment = await Segment.findById(req.params.segment_id).populate('photos');
          
          // Check if the segment with the given ID exists
          if (!segment) {
            return res.status(404).json({ message: "Segment not found for the specified ID" });
          }
          
          // Access the photos associated with the segment
          const photos = segment.photos;
          
          return res.json(photos);
        } catch (error) {
          return res.status(500).json({ message: "Error getting photos by segment ID", error: error.message });
        }
      });
    module.exports = router;