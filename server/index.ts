import cors from 'cors';
import express, { Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import path from 'path';

const app = express();
app.use(cors());

const storage = diskStorage({
  destination: 'uploads/',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

const upload = multer({ storage: storage });

app.post('/files', upload.single('file'), (req: Request, res: Response) => {
  console.log('req init');
  const file = req.file;
  if (!file) {
    return res.status(430).json({ error: 'No file uploaded', data: req.body });
  }

  // Process the file or save it to the database

  return res.status(200).json({ message: 'File uploaded successfully', data: req.body });
});

app.listen(1403, () => {
  console.log('Server is running on port 1403');
});
