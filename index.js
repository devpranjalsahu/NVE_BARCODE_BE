
const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require("express-fileupload");

const cors = require('cors');
var morgan = require('morgan')

require('dotenv').config()
const path = require('path');


//Database Connection
const db = require('./config/db');
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

const app = express();
const routes = require('./routes/index');
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(
    fileUpload({
      tempFileDir: path.join(__dirname,'../'),
      useTempFiles: true,
    })
  );
app.use(cors());
app.use('/api/v1',routes);
app.use('/sync',async (req, res) => {
    await db.sync({ alter: true });
console.log("All models were synchronized successfully.");
return res.send('success')
});
app.use('/status',(req,res)=>{
    res.send("live")
})
// app.use("*",(req,res)=>{
//     console.log("No path found for")
//     res.status(404).send("404")
// })
const PORT = process.env.PORT || 5100;

db.sync({
    logging: true
    // force:true
}).then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));