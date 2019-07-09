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
    //fileFilter: imageFileFilter,
    limits: { fileSize: 1000000 }
});

router.post('/uploadUserImage', upload.single('imageFile'), (req, res) => {
    console.log("Image upload code responding");
    res.send(req.file);
    console.log(req.file);

})

//user registration//
router.post("/userRegistration", (req, res) => {
    console.log("User reigistration kicking...")
    console.log(req.body)
    var userName = req.body.userName;
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var userImage = req.body.userImage;
    var city = req.body.city;
    var postal = req.body.postal;
    var userAddress1 = req.body.userAddress1;
    var userAddress2 = req.body.userAddress2;
    var userPhone = req.body.userPhone;

    var newuser = new User(
        {
            "userName": userName,
            "userEmail": userEmail,
            "userPassword": userPassword,
            "userImage": userImage,
            "city": city,
            "postal": postal,
            "userAddress1": userAddress1,
            "userAddress2": userAddress2,
            "userPhone": userPhone
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

//user login
router.post("/userLogin", async function (req, res) {
    // var logindata = new User({
    //     userName :req.body.username,
    //     userPassword :req.body.password,
    // });
    var askeduserName = req.body.username;
    var askeduserPassword = req.body.password;
    console.log(askeduserName + " - username data")
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
    else if (askeduserName == "admin@login" && askeduserPassword == "admin") {
        res.status(201).json({
            message: "admin"
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

// display all user data
router.get('/displayUserData', (req, res) => {
    console.log("User data Responding.............");
    User.find().then(function (userdata) {
        res.send(userdata);
        console.log(userdata);
    }).catch(function (e) {
        res.send(e)
    });

})

router.get('/getUserById/:id', function (req, res) {
    console.log("Get user kicking ...............................")
    uid = req.params.id.toString();
    console.log(uid);
    User.findById(uid).then(function (user) {
        res.json(user);
        console.log(user);
    }).catch(function (e) {
        res.send(e)
    });
});


//user dashboard
router.get('/getSpecificUser', Auth, function (req, res) {
    res.json(req.user);
    console.log(req.user);
});

//update specific user
router.put('/updateUser/:id', function (req, res) {
    console.log("update specific user kiking...")
    uid = req.params.id.toString();
    console.log("user id...................................................................." + uid)
    console.log(req.body);
    User.findByIdAndUpdate({ _id: uid }, req.body).then(function () {
        console.log("Product updated successfully.")
        res.send();
    }).catch(function (e) {
        console.log("error is updating..")
    })
});

//updating from android
router.put('/updateUserMobile', function (req, res) {
    console.log("update specific user kiking...")
    console.log("user id...................................................................." + uid)
    console.log(req.body);

    var uid = req.body._id;
    console.log(uid)
    User.findByIdAndUpdate({ _id: uid }, req.body).then(function () {
        console.log("Product updated successfully.")
        res.send();
    }).catch(function (e) {
        console.log("error in updating..")
    })
});

//check route respond
router.get('/respond', function (req, res) {
    res.send("responding")
    console.log("responding")
})


//logout from one device
router.post('/logout', Auth, async (req, res) => {
    console.log("User Logout is responding..................with token " + tokens)
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
//logout code
router.get('/logout2', function (req, res) {
    res.status(200).send({ Auth: false, token: null });
});


//logout from all devices
router.post('/logoutAll', Auth, async (req, res) => {
    console.log(req.user)
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;