// const cors = require('cors');
// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const app = express();
// app.use(cors());

// const storage = multer.diskStorage({
//   destination: './uploads',
//   filename: (req, file, callback) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const fileExtension = path.extname(file.originalname);
//     callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
//   }
// });

// const upload = multer({ storage: storage });

// // app.post('/test',(req,res)=>{}))

// app.post('/files', upload.single('file'), (req, res) => {
//   console.log('Folder Name:', req.body.folderName);
  
//   if (!req.file) {
//     console.log('No file uploaded');
//   } else {
//     console.log('File uploaded:', req.file.originalname);
//   }
  
//   return res.status(200).json({ message: 'Request received' });
// });

// app.listen(1403, () => {
//   console.log('Server is running on port 1403');
// });


const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express(cors());
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

  res.status(200).send('File exists');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
