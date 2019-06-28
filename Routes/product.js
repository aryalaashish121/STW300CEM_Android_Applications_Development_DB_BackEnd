const express = require("express");
const router = express.Router();
const products = require("../Model/products");
const mongoose = require("mongoose");
const Auth = require('../middleware/auth');
const multer = require("multer");
const path = require('path');


//image upload
var storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, "product" + "-" + Date.now() + ext);
    }
});

var storage1 = multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, "product" + "-" + Date.now() + ext);
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
    limits: { fileSize: 1000000 }
});
var upload1 = multer({
    storage: storage1,
    limits: { fileSize: 1000000 }
});

router.post('/uploadmainImage', upload.single('imageFile'), (req, res) => {
    res.send(req.file);
    console.log(req.file);

})

router.post('/uploadauxImage', upload1.single('imageFile2'), (req, res) => {
    res.send(req.file);
    console.log(req.file);

})

//add products
router.post("/addProducts", (req, res) => {
    console.log("product type---->" + req.body.productType);
    const product = new products({
        productType: req.body.productType,
        productBrand: req.body.productBrand,
        productWarranty: req.body.productWarranty,
        productColor: req.body.productColor,
        productName: req.body.productName,
        productQuantity: req.body.productQuantity,
        productWeight: req.body.productWeight,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productDiscount: req.body.productDiscount,
        mainImage: req.body.mainImage,
        auxiliaryImage: req.body.auxiliaryImage
    });
    console.log("Requesstte --------->>>>>>>>>>>>>>>>>>" + product);
    product.save();
    // res.json(product);
    console.log("product added");
    console.log(product);
    res.send("product added sucessfully")
})

router.get('/displayProduct', (req, res) => {
    console.log("Responding.............");
    products.find().then(function (arrivalsdata) {
        res.send(arrivalsdata);
        console.log(arrivalsdata);
    }).catch(function (e) {
        res.send(e)
    });

})

router.get('/dispalDell', (req, res) => {
    console.log("dell data clicked..")
    var productbrand = "dell";
    products.find({ productBrand: productbrand }).then(function (dellproduct) {
        res.send(dellproduct);
        console.log("dellproduct" + dellproduct);
    }).catch(function (e) {
        res.send(e)
    });
})

router.get('/displayhp', (req, res) => {
    console.log("hp data clicked..")
    var productbrand = "hp";
    products.find({ productBrand: productbrand }).then(function (hpproduct) {
        res.send(hpproduct);
        console.log("hp" + hpproduct);
    }).catch(function (e) {
        res.send(e)
    });
})




//check server respond..
router.get("/checkRespond", (req, res) => {
    console.log("product route is kiking")
    res.send("Responding")
})


module.exports = router;