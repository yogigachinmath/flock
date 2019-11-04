const excel = require('read-excel-file/node');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./connection');
var multer  = require('multer')
var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});
// var upload = multer({ //multer settings
//   storage: storage
// }).single('file');
const db = require('./db.config.js');
const File = db.files;
const fire = require('./fire');
const path = require('path');
const {Storage} = require('@google-cloud/storage');

const app = express();

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// connect();
const gc = new Storage({
    projectId: 'splitwise-ee7',
    keyFilename:  path.join(__dirname,'../splitwise-f8589669d23c.json')
  });
  const bucket = gc.bucket('splitwise-ee7.appspot.com');
app.get('/',(req,res)=> {
    res.json({
        'name':'yogi'
    });
}) 
app.post('/ans',upload.single('file'),(req,res,next)=>{
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname.replace(/ /g,''));
  const blobStream = blob.createWriteStream();
  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // console.log(blob.name,typeof(blob.name));
    // const values = [];
    // values.push(blob.name.split('.'));
    let name = blob.name.split('.');
    let link = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    console.log(link,name);
    var sql = `insert into sampleproject(name,link) values('${name[0]}','${link}')`;
     connection.query(sql,(error, result) => {
      if(error)
        throw error;
      console.log("uploaded");
    })
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
    // File.create({
	// 	type: req.file.mimetype,
	// 	name: req.file.originalname,
	// 	data: req.file.buffer
	// }).then(() => {
	// 	res.send('File uploaded successfully! -> filename = ' + req.file.originalname).status(200);
	// })
console.log(req.file);
})

app.listen(4000,()=>{
    console.log('listening on port 3000');
})
function connect() {
    connection.connect(() => {
      console.log('Connected to DB.');
    });
}

function promisify(query, value) {
  console.log(query,value);
  return new Promise((resolve, reject) => {
    connection.query(query,(error, result) => {
      console.log(result);
      if (error) {
        reject(error);
        return;
      }
      resolve(JSON.parse(JSON.stringify(result)));
    });
  });
}