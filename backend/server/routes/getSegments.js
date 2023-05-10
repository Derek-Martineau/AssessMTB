const express = require('express');
const router = express.Router();
const segments = require('../models/segments');

//get all segments
router.get('/segments', async (req, res) => {
    const segment = await segments.find();
    return res.json(segment)
  })
//get segment by id
router.get('/segments/:id', async (req, res) => {
    const segment = await segments.findById(req.params.id);
    return res.json(segment)
  })
//get segment by name   
router.get('/segments/:name', async (req, res) => {
    const segment = await segments.findOne({segmentName: req.params.name});
    return res.json(segment)
  })
//get segment by difficulty
router.get('/segments/:difficulty', async (req, res) => {
    const segment = await segments.findOne({difficulty: req.params.difficulty});
    return res.json(segment)
  })
//get segment by feature
router.get('/segments/:feature', async (req, res) => {
    const segment = await segments.findOne({feature: req.params.feature});
    return res.json(segment)
  })
//get segment by park
router.get('/segments/:park', async (req, res) => {
    const segment = await segments.findOne({park: req.params.park});
    return res.json(segment)
  })
