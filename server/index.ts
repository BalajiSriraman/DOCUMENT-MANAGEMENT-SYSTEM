import express, { Request, Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';

const app = express();
const port = 1403;

// Multer configuration for file upload
const upload = multer();

// Enable CORS
app.use(cors());

// Function to save the file
function saveFile(folder: string, file: Express.Multer.File, res: Response) {
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
}

// POST route for file upload
app.post('/files', upload.single('file'), (req: Request, res: Response) => {
  const file = req.file;
  const folder = req.body.folderName;

  if (!file) {
    console.log('No file selected');
    return res.status(400).send('No file selected');
  }

  console.log('File exists');
  console.log('Folder:', folder);

  saveFile(folder, file, res);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
