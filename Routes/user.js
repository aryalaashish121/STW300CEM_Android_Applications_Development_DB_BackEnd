const express = require("express");
const router = express.Router();
const User = require("../Model/users");
const mongoose = require("mongoose");
const Auth = require('../middleware/auth');
const multer = require("multer");
const path = require('path');


// router.post("/userRegistration",(req,res)=>
// {
//     console.log(req.body);
//     var user= new User(req.body);
//     user.save();
//     res.json("success");
// })

//FOr uploading images
//image upload
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

router.post('/uploadUserImage', upload.single('imageFile'), (req, res) => {
    res.send(req.file);
    console.log(req.file);

})

router.post("/userRegistration", (req, res) => {
    console.log(req.body)
    var userName = req.body.userName;
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var userImage = req.body.userImage;
    var city = req.body.city;
    var postal = req.body.postal;
    var userAddress1 = req.body.userAddress1;
    var userAddress2 = req.body.userAddress2;

    var newuser = new User(
        {
            "userName": userName,
            "userEmail": userEmail,
            "userPassword": userPassword,
            "userImage": userImage,
            "city": city,
            "postal": postal,
            "userAddress1": userAddress1,
            "userAddress2": userAddress2
        }
    )
    console.log("Request------>" + newuser);
    newuser.save().then(function () {
        response = "User Registred sucessfully !!!";
        console.log(response);
        res.send(response);
    }).catch(function (e) {
        response = "Error in Registration";
        console.log(response);
        res.send(response);
    })
});

router.post("/userLogin", async function (req, res) {
    // var logindata = new User({
    //     userName :req.body.username,
    //     userPassword :req.body.password,
    // });
    var askeduserName = req.body.username;
    var askeduserPassword = req.body.password;
    const users = await User.checkCredentialsDb(askeduserName, askeduserPassword);

    if (users != null) {
        const token = await users.generateAuthToken();
        console.log(token);
        res.status(201).json({
            token: token,
            users: users,
            message: "Sucess"
        });
    }
    else {
        res.json({
            message: "Invalid! Login Denied!!"
        })
    }
})

router.get('/this', Auth, function (req, res) {
    console.log("responding")
    res.send(req.users);
})

router.get('/respond', function (req, res) {
    res.send("responding")
    console.log("responding")
})


module.exports = router;