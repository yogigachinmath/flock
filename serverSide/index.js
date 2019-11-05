const excel = require('read-excel-file/node');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./connection');
const multer = require('multer');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// connect();
const gc = new Storage({
  projectId: 'splitwise-ee7',
  keyFilename: path.join(__dirname, '../splitwise-f8589669d23c.json')
});
const bucket = gc.bucket('splitwise-ee7.appspot.com');

//api's
app.get('/', (req, res) => {
  res.json({
    name: 'yogi'
  });
});

app.post('/ans', upload.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  const blob = bucket.file(req.file.originalname.replace(/ /g, ''));
  const blobStream = blob.createWriteStream();
  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    let name = blob.name.split('.');
    let link = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    console.log(link, name);
    var sql = `insert into sampleproject(name,link) values('${
      name[0]
    }','${link}')`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log('uploaded');
    });
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
  console.log(req.file);
});

app.listen(4000, () => {
  console.log('listening on port 3000');
});
