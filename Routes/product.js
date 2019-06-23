const express=require("express");
const router=express.Router();
const products=require("../Model/products");
const mongoose=require("mongoose");
const Auth = require('../middleware/auth');
const multer=require("multer");



//check server respond..
router.get("/checkRespond",(req,res)=>{
    console.log("product route is kiking")
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

//add products
router.post("/addProducts",upload.single('mainImage'),(req,res)=>{

    const product = new products({
      productType:req.body.productType,
      productBrand:req.body.productBrand,
      productWarranty:req.body.productWarranty,
      productColor:req.body.productColor,
      productName:req.body.productName,
      productQuantity:req.body.productQuantity,
      productWeight:req.body.productWeight,
      productDescription:req.body.productDescription,
      productPrice:req.body.productPrice,
      productDiscount:req.body.productDiscount,
      mainImage :req.file.filename,
      auxiliaryImage:req.body.auxiliaryImage
     });
   
    product.save();
    res.json(product);
    console.log("product added")
    console.log(product)
})

module.exports = router;