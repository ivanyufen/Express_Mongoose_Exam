const router = require("express").Router();
const os = require("os");
const mongoose = require("mongoose");
const dataCPU = require("../models/dataCPU");

// CREATE CONNECTION
var url = 'mongodb://tatat:datacpu@localhost:27017/dataCPU';

mongoose.connect(url, { useNewUrlParser: true }, () => {
    console.log("MongoDB connected!");
});

// POST DATA WITHOUT BODY REQUEST, USING "OS" NODE PACKAGE FROM NODE JS. 
// JUST POST AN EMPTY BODY WITH POSTMAN AND THE DATA WILL AUTOMATICALLY POSTED TO MongoDB. 
// IF YOU WANT THE DATA DIRECTLY POSTED AFTER THE SERVER RUN, JUST COMMENT THE "router.post..." LINE.
router.post("/data", (req, res) => {
    new dataCPU({
        namacpu: os.hostname(),
        tipe: os.type(),
        platform: os.platform(),
        rilis: os.release(),
        ramSisa: os.freemem(),
        ramTotal: os.totalmem()
    }).save().then((x) => {
        console.log(x);
        console.log("DataCPU successfully posted to MongoDB!");
        res.send("Successfully posted!");
    });
});


// GET TO /data WILL SHOWING data CPU FROM DATABASE, IF THE DATA HAS BEEN POSTED. OTHERWISE, IT WILL JUST SHOW EMPTY RESULT.
router.get("/data", (req, res) => {
    dataCPU.find((err, data) => {
        if (err) {
            throw err;
        }
        else {
            console.log(data);
            res.send(data);
        }
    })
});


module.exports = router;