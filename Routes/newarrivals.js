const express=require("express");
const router=express.Router();
const newarrivals=require("../Model/newarrivals");
const mongoose=require("mongoose");
const Auth = require('../middleware/auth');
const multer=require("multer");
const path = require('path');

router.get("/checkRespond",(req,res)=>{
    console.log("New arrivals route is kiking")
    res.send("Responding")
})
//image upload
var storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, "aashish" + "-" + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb("Only image files accepted!!"), false;
    }
    cb(null, true);
};

var upload = multer({ 
    storage: storage, 
    fileFilter: imageFileFilter,
     limits: { fileSize: 1000000 } 
    });

router.post("/addnewarrivals",upload.single('mainImage'),(req,res)=>{
    const arrivals = new newarrivals({
        productName:req.body.productName,
        productPrice: req.body.productPrice,
        Image:req.file.filename,
        productDescription:req.body.productDescription
        
    });
    arrivals.save();
    console.log(arrivals);
})
module.exports = router;