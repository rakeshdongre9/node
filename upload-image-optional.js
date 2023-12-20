const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Define your file filter logic here (e.g., check file types)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'));
    }
  },
});


// Handle the POST request with multiple images
app.post('/upload', upload.fields([{ name: 'images', maxCount: 5 }, { name: 'files', maxCount: 3 }]), (req, res) => {
  // Access the uploaded files in the request object
  const imagesArray = req.files;

  // Process or save the images as needed
  // For demonstration, log the number of uploaded images
  console.log('Number of uploaded images:', imagesArray.length);

  // Send a response
  res.status(200).json({ message: 'Images uploaded successfully.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// Handle the POST request with multiple images
app.post('/upload',  upload.array('images', 5), (req, res) => {
  // Access the uploaded files in the request object
  const imagesArray = req.files;

  // Process or save the images as needed
  // For demonstration, log the number of uploaded images
  console.log('Number of uploaded images:', imagesArray.length);

  // Send a response
  res.status(200).json({ message: 'Images uploaded successfully.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
