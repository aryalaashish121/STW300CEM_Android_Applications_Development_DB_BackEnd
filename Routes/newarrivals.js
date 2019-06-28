const express = require("express");
const router = express.Router();
const newarrivals = require("../Model/newarrivals");
const mongoose = require("mongoose");
const Auth = require('../middleware/auth');
const multer = require("multer");
const path = require('path');

router.get("/checkRespond", (req, res) => {
    console.log("New arrivals route is kiking")
    res.send("Responding")
})
// for image upload
var storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, "userProfile" + "-" + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb("Only image files accepted!!"), false;
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 1000000 }
});

router.post('/uploadNewArrivalsImage', upload.single('imageFile'), (req, res) => {
    res.send(req.file);
    console.log(req.file);

})


router.post("/addnewarrivals", (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const arrivals = new newarrivals({
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        Image: req.body.mainImage,
        productDescription: req.body.productDescription,
        productType: req.body.productType

    });
    arrivals.save();
    console.log(arrivals);
});

router.get('/displayNewArrivals', (req, res) => {
    console.log("Responding.............");
    newarrivals.find().then(function (arrivalsdata) {
        res.send(arrivalsdata);
        console.log(arrivalsdata);
    }).catch(function (e) {
        res.send(e)
    });

})
module.exports = router;