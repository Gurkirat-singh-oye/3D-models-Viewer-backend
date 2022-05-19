const express = require("express");
const path = require('path');
const fileup = require('express-fileupload')
const cors = require('cors');
const fs = require('fs');

const app = express()
const storagepath =  "./storage"
const PORT = 4000

app.use(cors())
app.use(express.static(storagepath))
app.use(fileup())

//root
app.get('/', function(req,res) {
    res.json({message: "welcome to stored models"})
})


//list of all models
app.get('/listall', function(req,res) {
    fs.readdir(storagepath, function (err, files) {
        console.log(files)
        res.json({Models: files})
    });
})

app.post('/storeamodel', function(req,res) {
    let path = storagepath + req.files.model.name;
    (req.files.model).mv(path)
    res.send('file recieved')
})

// app.get('/models/:name', function(req,res) {
//     res.json({message: "welcome to stored models"})
// })

app.listen(process.env.PORT || PORT, () => {console.log(`up and running on http://localhost:${PORT}`)})
