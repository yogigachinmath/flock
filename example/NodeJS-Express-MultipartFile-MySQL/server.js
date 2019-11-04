var express = require('express');
var app = express();
var router = express.Router();
var upload = require('./app/config/multer.config.js');
 
global.__basedir = __dirname;
 
const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
}); 

app.use(express.static('resources'));	

require('./app/routers/file.router.js')(app, router, upload);
 
// Create a Server
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})