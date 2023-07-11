import cors from 'cors';
import express, { Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import path from 'path';

const app = express();
app.use(cors());

const storage = diskStorage({
  destination: `./uploads`,
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

const upload = multer({ storage: storage });

app.post('/files', upload.single('file'), (req: Request, res: Response) => {
  console.log(req.body.folderName);
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


// import cors from 'cors';
// import express, { Request, Response } from 'express';
// import fs from 'fs';
// import path from 'path';

// const app = express();
// app.use(cors());

// const uploadDirectory = './uploads'; // Specify the directory where you want to save the files

// app.post('/files', (req:any, res:any) => {
//   const file = req.body.file; // Update this line to use the correct property based on how the file is sent in the request

//   if (!file) {
//     console.log('file not exists');
//     return res.status(430).json({ error: 'No file uploaded', data: req.body });
//   }else{
//     console.log('file exists');
//   }

//   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//   const fileExtension = path.extname(file.originalname);
//   const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension;
//   const filePath = path.join(uploadDirectory, fileName);

//   // Write the file to the specified directory using fs.writeFile
//   fs.writeFile(filePath, file.data, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Failed to save the file', data: req.body });
//     }

//     // Process the file or save it to the database

//     return res.status(200).json({ message: 'File uploaded successfully', data: req.body });
//   });
// });

// app.listen(1403, () => {
//   console.log('Server is running on port 1403');
// });
