const express = require('express');
const router = express.Router();
const SegmentModel = require('../models/segmentModel');
const mongoose = require('mongoose');
const imageSchema = require('../models/imageModel');
const fs = require('fs');
const path = require('path');
 require('dotenv').config();
 
const multer = require('multer');
 
// This is used to handle the multipart/form-data.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
const upload = multer({ storage: storage });

// Route to retreive all images stored on the server.
// It returns the images in JSON format.
// The routs is /images  (maybe we move this to a different file).)
router.get('/getAll', async (req, res) => {
    imageSchema.find({})
    .then((data, err)=>{
        if(err){
            console.log(err);
        }

        // We want to return this data as a JSON object to the caller.
        return res.status(200).json(data)

        // We don't want to do the render line.  This would
        // make our route return HTML instead of JSON.
        // This isn't how our API is supposed to work.
        // Also, the following line refers to "../../images" but that's
        // expaced to be a web page (like views/images.ejs) but we don't 
        // want that on the backend.
        //  res.render('../../images',{items: data})
    })
    
});

  
// Define a route to retrieve a specific image by its unique ID.
router.get('/:id', async (req, res) => {
  const imageId = req.params.id;

  try {
    // Use Mongoose to find the image by its ID
    const image = await imageSchema.findById(imageId);

    if (image) {
      // Image found, set the appropriate content type
      res.setHeader('Content-Type', image.img.contentType);
      // Send the image data as the response
      return res.send(image.img.data);
    } else {
      // Image not found, send a 404 error response
      return res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    // Internal server error, send a 500 error response
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const objectId = req.params.id; // objectId is the _id

  try {
    await imageSchema.findByIdAndRemove(objectId);
    return res.json({ message: 'Image removed successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

 

// This is the route that should save the given image.
router.post('/create', upload.single('image'), async (req, res, next) => {
  const directoryAbove = path.resolve(__dirname, '..');
  const pathToUploadedFile = path.resolve(directoryAbove, 'uploads', req.file.filename);
  const base64Data = fs.readFileSync(pathToUploadedFile, { encoding: 'base64' });

  const imageToStore = imageSchema({
    name: req.body.name,
    base64Data: base64Data,
    img: {
      data: fs.readFileSync(path.join(pathToUploadedFile)),
      contentType: 'image/png'
    }
  });

  try {
    const response = await imageSchema.create(imageToStore);
    
    if (response && response._id) {
      const imageId = response._id; // Getting the ID of the newly created image
      res.json({ msg: 'Image created successfully.', imageId });
    } else {
      // If there's an issue with the response, log an error or send a specific message
      console.error('Invalid response or _id not found in the response');
      res.status(500).json({ msg: 'Invalid response from image creation' });
    }
  } catch (err) {
    console.error('Error creating image:', err);
    res.status(500).json({ msg: 'Could not create image', error: err.message }); // Include the error message in the response
  }

  fs.unlink(pathToUploadedFile, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log('File deleted successfully.');
    }
  });

    // This site was used to help write this code:
    // https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
});
 
// Endpoint to get all images for a specific segment
router.get('/:segmentId', async (req, res) => {
  const { segmentId } = req.params;

  try {
    // Assuming you have a model named 'Segment' with a field 'Features'
    const segment = await SegmentModel.findById(segmentId).populate('Features');

    if (!segment) {
      return res.status(404).json({ error: 'Segment not found' });
    }

    // Extract relevant data for response
    const imageData = segment.Features.map((image) => ({
      _id: image._id,
      base64Data: image.base64Data, // Adjust field names accordingly
      // Add other relevant fields if needed
    }));

    res.json(imageData);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;