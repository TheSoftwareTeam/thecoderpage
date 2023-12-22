const express = require('express');
const cors = require('cors'); 
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./data/data.json'); // <== Will be created later
const middlewares = jsonServer.defaults();
const port1 = process.env.PORT || 3005; // <== You can change the port

server.use(middlewares);
server.use(router);

server.listen(port1);

const app = express();
const port = 3001;

app.use(cors()); 
app.use(express.json());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploaduserimages'));
  },
  filename: (req, file, cb) => {
    const userName = req.body.userName;
    cb(null, `${userName}${path.extname(file.originalname)}`); 
  },
});

const upload = multer({ storage: storage });

app.post('/upload',express.json(), upload.single('file'), (req, res) => {
  try {
    const imagePath = `uploaduserimages/${req.file.originalname}`;
    const destinationPath = path.join(__dirname, 'uploaduserimages', req.file.originalname);
   
    fs.rename(req.file.path, destinationPath, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
    
      res.json({ imagePath });
      
      if (!req.body.userId) {
        return res.status(400).json({ error: 'userId is required' });
      }
      if (!req.body.userName) {
        return res.status(400).json({ error: 'userName is required' });
      }
      
    

     
    });
  } catch (error) {
    console.error("File upload error:", error);
  }
});
app.use('/uploaduserimages', express.static(path.join(__dirname, 'uploaduserimages')));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

