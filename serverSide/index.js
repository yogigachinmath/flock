const excel = require('read-excel-file/node');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./connection');
var multer  = require('multer')
var upload = multer({ storage: multer.memoryStorage() })
const db = require('./db.config.js');
const File = db.files;
const fire = require('./fire');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// connect();
app.get('/',(req,res)=> {
    res.json({
        'name':'yogi'
    });
}) 
// ,upload.single('file')
app.post('/ans',(req,res)=>{
    // firebase.storage().ref(`files/${req.file.originalname}`)


    File.create({
		type: req.file.mimetype,
		name: req.file.originalname,
		data: req.file.buffer
	}).then(() => {
		res.send('File uploaded successfully! -> filename = ' + req.file.originalname).status(200);
	})
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