const excel = require('read-excel-file/node');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',(req,res)=> {
    res.json({
        'name':'yogi'
    });
}) 
app.post('/ans',(req,res)=>{
        res.send('success').status(200);
console.log(req.body);
})

app.listen(4000,()=>{
    console.log('listening on port 3000');
})