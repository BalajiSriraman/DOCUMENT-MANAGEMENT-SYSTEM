const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 1403;

// Multer configuration for file upload
const upload = multer();

// POST route for file upload
app.post('/files', upload.single('file'), (req, res) => {
  const file = req.file;
  const folder = req.body.folderName;

  if (!file) {
    console.log('No file selected');
    return res.status(400).send('No file selected');
  }

  console.log('File exists');
  console.log('Folder:', folder);

  // Create the folder if it doesn't exist
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  // Save the file inside the folder
  fs.writeFile(`${folder}/${file.originalname}`, file.buffer, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving the file');
    }
    console.log('File saved successfully');
    res.status(200).send('File saved successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
